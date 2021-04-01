import React, { useEffect, useRef } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import CountryContainer from '../Container/CountryContainer';
import {getData} from '../State/commonstate';


export default function CountryComponent(){
  const {loading,error,countries}=useSelector(state=>({
    loading:state.loading,
    countries:state.countries,
    error:state.error,
  }));
  const dispatch=useDispatch();

  const num=useRef(70);
  const dataRef=useRef();
  const data=countries.slice(0,parseInt(50));

  const infiniteCallback=(data,countries,num)=>{
    if(num+50>=countries){
      data=countries.slice(0,countries.length);
    }
    else{
      data=countries.slice(0,num);
      num=num+50;
    }
  }

  const option={
    root:null,
    treshold:0.3,
    rootMargin:'0px',
  };

  const onClick=()=>{};

  /*getData from api setinfinityscroll */
  useEffect(()=>{
    if(loading){
    dispatch(getData());
    }
    if(dataRef.current){
      const observer=new IntersectionObserver(({isIntersecting})=>{
        if(isIntersecting){
          infiniteCallback(data,countries,num);
        }
      },option)
      observer.observe(dataRef.current);
      return()=>{
        observer.unobserve();
      }
    }
  },[dataRef.current]);

/*rendering*/
  if(loading) return<div>Loading...</div>
  if(error) return<div>Error</div>
  if(!loading) return(
    <CountryContainer data={data} onClick={onClick} num={num} dataRef={dataRef}/>
)
}

//Thunk 할거면 dispatch로 함수를 보내야 thunk미들웨어에서 함수면 실행 액션이면 dispatch를 한다.
//얕은복사 잘 피하기