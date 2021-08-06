import React from 'react';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import CountryComponent from './Component/CountryComponent';
import CreateComponent from './Component/CreateComponent';
import SearchComponent from './Component/SearchComponent';

function App() {
return(
  <GlobalStyle>
    <SearchComponent/>
    <CreateComponent/>
    <CountryComponent/>
  <ToastContainer autoClose="3000"/>
  </GlobalStyle>
);
}

const GlobalStyle=styled.div`
display:flex;
flex-flow:column;
align-items:center;
justify-content:center;
width:85vw;
`;
const GlobalStyle2=styled.div`

`

export default App;


/*함수를 의존배열에 넣으면 랜더링될떄마다 새함수 생성해서 무한루프
React.memo사용법
https://react.vlpt.us/basic/19-React.memo.html
React.useCallback
https://react.vlpt.us/basic/18-useCallback.html
fetch

react-hook-form
react-toastify
axios*/

