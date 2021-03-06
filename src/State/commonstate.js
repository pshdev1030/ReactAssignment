import axios from "axios";

const initialState = {
  loading: true,
  countries: [],
  error: false,
  isShow: false,
  search: "",
  searchCountries: [],
};
const LOADING_SUCCESS = "COUNTRY/LOADING_SUCCESS";
const LOADING_FAIL = "COUNTRY/LOADING_FAIL";
const ADD_COUNTRY = "COUNTRY/ADD";
const DELETE_COUNTRY = "COUNTRY/DELETE";
const SEARCH_COUNTRY = "COUNTRY/SEARCH";
/*
const SORT_BY_COUNTRYNAME="COUNTRY/SORT_BY_COUNTRYNAME";
const SORT_BY_CODE="COUNTRY/SORT_BY_CODE";
const SORT_BY_CAPITAL="COUNTRY/SORT_BY_CAPITAL";
const SORT_BY_NAME="COUNTRY/SORT_BY_NAME";
const SORT_BY_TEL="COUNTRY/SORT_BY_TEL";
*/

export const getData = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://restcountries.eu/rest/v2/all?fields=alpha2Code;capital;name;region;callingCodes"
    );
    dispatch(loadingSuccessAction(response.data));
  } catch (error) {
    dispatch(loadingFailAction(error));
  }
};

export const isOverlap = (input, name) => (dispatch, getState) => {
  return getState().countries.some((ele) => ele[name] === input[name]);
};

export const loadingSuccessAction = (data) => ({
  type: LOADING_SUCCESS,
  data,
});

export const loadingFailAction = (error) => ({
  type: LOADING_FAIL,
  error,
});

export const addCountryAction = (Country) => ({
  type: ADD_COUNTRY,
  Country,
});

export const deleteCountryAction = (key) => ({
  type: DELETE_COUNTRY,
  key,
});

export const searchCountriesAction = (input) => (dispatch, getState) => {
  if (input === "") {
    dispatch({
      type: SEARCH_COUNTRY,
      input,
      countries: [],
    });
  } else {
    const countries = getState().countries;
    const upperInput = input.toUpperCase();
    const data = countries.reduce((acc, ele) => {
      if (
        ele.alpha2Code.toUpperCase().includes(upperInput) ||
        ele.callingCodes.join("").includes(upperInput) ||
        ele.capital.toUpperCase().includes(upperInput) ||
        ele.name.toUpperCase().includes(upperInput) ||
        ele.region.toUpperCase().includes(upperInput)
      ) {
        acc.push(ele);
      }
      return acc;
    }, []);
    console.log(data);
    dispatch({
      type: SEARCH_COUNTRY,
      input,
      countries: data,
    });
  }
};

const commonreducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_SUCCESS: {
      return {
        ...state,
        loading: false,
        countries: action.data,
        error: false,
      };
    }
    case LOADING_FAIL:
      return {
        ...state,
        loading: false,
        countries: null,
        error: action.error,
      };
    case ADD_COUNTRY:
      return {
        ...state,
        countries: state.countries.concat(action.Country),
      };
    case DELETE_COUNTRY:
      return {
        ...state,
        countries: state.countries.filter(
          (ele) => ele.alpha2Code + ele.capital !== action.key
        ),
      };
    case SEARCH_COUNTRY:
      return {
        ...state,
        searchCountries: action.countries,
        search: action.input,
      };
    default:
      return state;
  }
};

export default commonreducer;

/*?????? ?????? for... in ??????===?????? ????????? ???????????? ????????? ??????(???????????? ?????????)
https://velog.io/@lilyoh/js-object-%EC%9A%94%EC%86%8C%EC%97%90-%EC%A0%91%EA%B7%BC%ED%95%98%EA%B3%A0-%EC%88%9C%ED%9A%8C%ED%95%98%EA%B8%B0
????????? ?????????
https://hianna.tistory.com/381
concat??????+??????
???????????? ?????? ??????(????????? ??????..)
http://yoonbumtae.com/?p=1237
?????????????????????
Array.some =???????????? ????????? ??????????????? ?????????????????? ??????
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/some
for in??? ???????????? ?????? propertyname??? ??????
https://webclub.tistory.com/568
????????? ?????? ?????? 
https://codechacha.com/ko/java-string-matches/*/
