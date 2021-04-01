import axios from 'axios';

const initialState={
    loading:true,
    countries:[],
    error:false,
    toast:'',
    isShow:false,
    search:''
}
const SET_COUNTRY="COUNTRY/SET_COUNTRY";
const LOADING_SUCCESS="COUNTRY/LOADING_SUCCESS";
const LOADING_FAIL="COUNTRY/LOADING_FAIL";
const ADD_COUNTRY="COUNTRY/ADD";
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
    dispatch(loadingSuccess(response.data));
    }
    catch(error){
    dispatch(loadingFail(error));
    }
};

export const createCountry=(countryName,code,tel,cap,name)=>{
    return{
        countryName,
        code,
        tel,
        cap,
        name,
    }
}
export const loadingSuccess=(data)=>({
    type:LOADING_SUCCESS,
    data
})

export const loadingFail=(error)=>({
    type:LOADING_FAIL,
    error,
})

export const setCountry=(data)=>({
    type:SET_COUNTRY,
    data
})

export const addCountry=(Country)=>({
    type:ADD_COUNTRY,
    Country,
});

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
        case SET_COUNTRY:
            return{
                
            }
        default:
            return state;
    }
};

export default commonreducer;