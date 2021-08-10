import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInfinteScroll from "../common/useIInfinteScroll";
import CountryContainer from "../Container/CountryContainer";
import { deleteCountryAction, getData } from "../State/commonstate";
import styled from "styled-components";
import { searchCountriesAction } from "../State/commonstate";
import { toast, ToastContainer } from "react-toastify";

export default function CountryComponent() {
  const loading = useSelector((state) => state.loading);
  const countries = useSelector((state) => state.countries);
  const error = useSelector((state) => state.error);
  const searchCountries = useSelector((state) => state.searchCountries);
  const search = useSelector((state) => state.search);

  const dispatch = useDispatch();
  const [data, setData] = useState({
    countrydata: [],
    num: 0,
  });
  const { countrydata, num } = data;

  const dataRef = useRef(null);

  const setInitialData = async () => {
    await dispatch(getData());
    infiniteCallback();
  };

  const infiniteCallback = () => {
    if (num + 30 >= countries.length) {
      setData((prev) => ({
        countrydata: countries,
        num: countries.length,
      }));
    } else {
      setData((prev) => ({
        countrydata: countries.slice(0, prev.num + 30),
        num: prev.num + 30,
      }));
    }
  };

  const onClick = (e) => {
    dispatch(deleteCountryAction(e.target.dataset.key));
    setData((prev) => ({
      countrydata: countrydata.filter(
        (ele) => ele.alpha2Code + ele.capital !== e.target.dataset.key
      ),
      num: prev.num - 1,
    }));
    toast.info("국가를 삭제하였습니다.");
  };

  /*getData from api setinfinityscroll */
  useEffect(() => {
    setInitialData();
  }, []);

  useEffect(() => {
    dispatch(searchCountriesAction(search));
  }, [countries]);

  useInfinteScroll({
    target: dataRef.current,
    threshold: 1.0,
    onIntersect: ([{ isIntersecting }]) => {
      if (isIntersecting && !loading && num !== countries.length) {
        infiniteCallback();
      }
    },
  });

  /*rendering*/
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!loading)
    return (
      <CountryBox>
        {search ? (
          <CountryContainer
            data={searchCountries}
            onClick={onClick}
            dataRef={dataRef}
          />
        ) : (
          <CountryContainer
            data={countrydata}
            onClick={onClick}
            dataRef={dataRef}
          />
        )}

        <ToastContainer autoClose="3000" />
      </CountryBox>
    );
}

const CountryBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  height: 60vh;
`;
//Thunk 할거면 dispatch로 함수를 보내야 thunk미들웨어에서 함수면 실행 액션이면 dispatch를 한다.
//얕은복사 잘 피하기
//useSelcetor 리랜더링 https://velog.io/@lllen/react-Redux%EC%9D%98-useSelector-%EC%B5%9C%EC%A0%81%ED%99%94
