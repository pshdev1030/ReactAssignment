import axios from 'axios';

const initialState={
    loading:true,
    countries:[],
    error:false,
    isShow:false,
    search:''
}
const LOADING_SUCCESS="COUNTRY/LOADING_SUCCESS";
const LOADING_FAIL="COUNTRY/LOADING_FAIL";
const ADD_COUNTRY="COUNTRY/ADD";
const DELETE_COUNTRY="COUNTRY/DELETE";
/*
const SORT_BY_COUNTRYNAME="COUNTRY/SORT_BY_COUNTRYNAME";
const SORT_BY_CODE="COUNTRY/SORT_BY_CODE";
const SORT_BY_CAPITAL="COUNTRY/SORT_BY_CAPITAL";
const SORT_BY_NAME="COUNTRY/SORT_BY_NAME";
const SORT_BY_TEL="COUNTRY/SORT_BY_TEL";
*/

export const AddCountry=(input)=>(dispatch)=>{
    const {callingCodes,alpha2Code,capital,name,region}=input;
    const Country={
        name,
        alpha2Code,
        capital,
        region,
        callingCodes,
    }
    dispatch(addCountry(Country));
};

export const getData=()=>async dispatch=>{
    try{
    const response = await axios.get("https://restcountries.eu/rest/v2/all?fields=alpha2Code;capital;name;region;callingCodes");
    dispatch(loadingSuccess(response.data));
    }
    catch(error){
    dispatch(loadingFail(error));
    }
};
export const loadingSuccess=(data)=>({
    type:LOADING_SUCCESS,
    data
})

export const loadingFail=(error)=>({
    type:LOADING_FAIL,
    error,
})

export const addCountry=(Country)=>({
    type:ADD_COUNTRY,
    Country,
});

export const deleteCountry=(key)=>({
    type:DELETE_COUNTRY,
    key,
})
export const sortByName=()=>{
}

const commonreducer=(state=initialState,action)=>{
    switch(action.type){
        case LOADING_SUCCESS:
            return{
                ...state,
                loading:false,
                countries:action.data,
                error:false,
            }
        case LOADING_FAIL:
            return{
                ...state,
                loading:false,
                countries:null,
                error:action.error,
            };
        case DELETE_COUNTRY:
            return{
                ...state,
                country:state.country.filter(ele=>ele.alpha2Code!==action.key),
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
이터레이터공부*/