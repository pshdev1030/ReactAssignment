import React, { useEffect, useRef,useState } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import useInfinteScroll from '../common/useIInfinteScroll';
import CountryContainer from '../Container/CountryContainer';
import {getData} from '../State/commonstate';
import styled from 'styled-components';
import { toast,ToastContainer } from 'react-toastify';


export default function CountryComponent(){
  const {loading,error,countries}=useSelector(state=>({
    loading:state.loading,
    countries:state.countries,
    error:state.error,
  }));
  const dispatch=useDispatch();
  
  const [data,setData]=useState({
    countrydata:[],
    num:50,
  });
  const {countrydata,num}=data;
  
  const dataRef=useRef(null);
  const infiniteCallback=()=>{
    if(num+50>=countries.length){
      console.log(data)
      setData(prev=>({
        countrydata:countries,
        num:prev.num+countries.length,
      }))
    }
    else{
      setData(prev=>({
        countrydata:countries.slice(0,num),
        num:prev.num+50,
      }))

    }
  }

  const onClick=(e)=>{
    console.log(e);
    toast.info("국가를 삭제하였습니다.");
  };

  /*getData from api setinfinityscroll */
  useEffect(()=>{
    console.log(dataRef.current);
    dispatch(getData());
  },[]);

  useInfinteScroll({
    target:dataRef.current,
    threshold:1.0,
    onIntersect:([{isIntersecting}])=>{
      if(isIntersecting&&!loading){
        infiniteCallback();
      }
    }
  })
/*rendering*/
  if(loading) return<div>Loading...</div>
  if(error) return<div>Error</div>
  if(!loading) return(
      <CountryBox>
        <button onClick={infiniteCallback}>asdf</button>
        <CountryContainer data={countrydata} onClick={onClick} dataRef={dataRef}/>
      <ToastContainer autoClose="3000"/>
      </CountryBox>
  );
}



const CountryBox=styled.div`
display:flex;
flex-wrap:wrap;
align-items:flex-start;
justify-content:flex-start;
overflow:scroll;
`;
//Thunk 할거면 dispatch로 함수를 보내야 thunk미들웨어에서 함수면 실행 액션이면 dispatch를 한다.
//얕은복사 잘 피하기