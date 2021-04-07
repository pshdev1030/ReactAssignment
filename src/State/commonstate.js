import axios from 'axios';

const initialState={
    loading:true,
    countries:[],
    error:false,
    isShow:false,
    search:'',
    searchCountries:[],
}
const LOADING_SUCCESS="COUNTRY/LOADING_SUCCESS";
const LOADING_FAIL="COUNTRY/LOADING_FAIL";
const ADD_COUNTRY="COUNTRY/ADD";
const DELETE_COUNTRY="COUNTRY/DELETE";
const SEARCH_COUNTRY="COUNTRY/SEARCH";
/*
const SORT_BY_COUNTRYNAME="COUNTRY/SORT_BY_COUNTRYNAME";
const SORT_BY_CODE="COUNTRY/SORT_BY_CODE";
const SORT_BY_CAPITAL="COUNTRY/SORT_BY_CAPITAL";
const SORT_BY_NAME="COUNTRY/SORT_BY_NAME";
const SORT_BY_TEL="COUNTRY/SORT_BY_TEL";
*/

export const getData=()=>async dispatch=>{
    try{
    const response = await axios.get("https://restcountries.eu/rest/v2/all?fields=alpha2Code;capital;name;region;callingCodes");
    dispatch(loadingSuccessAction(response.data));
    }
    catch(error){
    dispatch(loadingFailAction(error));
    }
};

export const isOverlap=(input,name)=>(dispatch,getState)=>{
    return getState().countries.some(ele=>ele[name]===input[name]);
}

export const loadingSuccessAction=(data)=>({
    type:LOADING_SUCCESS,
    data,
})

export const loadingFailAction=(error)=>({
    type:LOADING_FAIL,
    error,
})

export const addCountryAction=(Country)=>({
    type:ADD_COUNTRY,
    Country,
});

export const deleteCountryAction=(key)=>({
    type:DELETE_COUNTRY,
    key,
})

export const searchCountriesAction=(input)=>({
    type:SEARCH_COUNTRY,
    input,
})
export const sortByName=()=>{
}

const commonreducer=(state=initialState,action)=>{
    switch(action.type){
        case LOADING_SUCCESS:{
            return{
                ...state,
                loading:false,
                countries:action.data,
                error:false,
            }
        }
        case LOADING_FAIL:
            return{
                ...state,
                loading:false,
                countries:null,
                error:action.error,
            };
        case ADD_COUNTRY:
            return{
                ...state,
                countries:state.countries.concat(action.Country),
            };
        case DELETE_COUNTRY:
            return{
                ...state,
                countries:state.countries.filter(ele=>(ele.alpha2Code+ele.capital)!==action.key),
            }
        case SEARCH_COUNTRY:
            return {
                ...state,
                search:action.input,
            }
        default:
            return state;
    }
};

export default commonreducer;

/*객체 순회 for... in 배열===객체 배열은 객체중에 특이한 객체(고차함수 정의한)
https://velog.io/@lilyoh/js-object-%EC%9A%94%EC%86%8C%EC%97%90-%EC%A0%91%EA%B7%BC%ED%95%98%EA%B3%A0-%EC%88%9C%ED%9A%8C%ED%95%98%EA%B8%B0
문자열 합치기
https://hianna.tistory.com/381
concat보다+사용
객체배열 내부 정렬(다를게 없다..)
http://yoonbumtae.com/?p=1237
이터레이터공부
Array.some =배열안의 요소가 판별함수를 통과하는지를 반환
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/some
for in을 객체에서 쓰면 propertyname을 반한
https://webclub.tistory.com/568
문자열 패턴 확인 
https://codechacha.com/ko/java-string-matches/*/