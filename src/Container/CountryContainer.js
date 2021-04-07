import React from 'react';
import styled from 'styled-components';

const CountryEle=styled.div`
display:flex;
flex-basis:300px;
flex-flow:column wrap; 
margin: 20px 20px;
align-items:center;
justify-content:center;
border:2px solid grey;
border-radius:10px;
`;

const CountryBtn=styled.button`
padding:10px;
width: 80%;
margin-top:10px;
color:white;
background-color:skyblue;
border:none;
`;
const CountryText=styled.div`
text-align:center
`;


export default function CountryContainer({data,onClick,dataRef}){
    return(
        <>
        {data.map(ele=>
            <CountryEle key={ele.alpha2Code+ele.capital}>
                <CountryText><strong>국가 이름 :</strong>{ele.name}</CountryText>
                <CountryText><strong>국가 코드 :</strong>{ele.alpha2Code}</CountryText>
                <CountryText><strong>수도 :</strong>{ele.capital}</CountryText>
                <CountryText><strong>지역 :</strong>{ele.region}</CountryText>
                <CountryText><strong>지역코드 :</strong>{ele.callingCodes}</CountryText>
                <CountryBtn onClick={onClick} data-key={ele.alpha2Code+ele.capital}>삭제</CountryBtn>
            </CountryEle>
        )}
        <div ref={dataRef}></div>
        </>
    );
}