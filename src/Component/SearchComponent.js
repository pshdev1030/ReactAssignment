import React,{useRef} from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch} from 'react-redux';
import styled from 'styled-components';
import { searchCountriesAction } from '../State/commonstate';

export default function SearchComponent(){
    const dispatch=useDispatch();
    const {register,handleSubmit}=useForm();
    const timer=useRef(null);

    const onSubmit=(e)=>{
        dispatch(searchCountriesAction(e.input));
    }


    const onChange=(e)=>{
        if(timer.current){
            clearTimeout(timer.current);
        }
        timer.current=setTimeout(()=>{
            dispatch(searchCountriesAction(e.target.value));
        },1000)
    }

    return(
        <SearchForm onSubmit={handleSubmit(onSubmit)}>
            <SearchInput name="input" ref={register()} onChange={onChange}/>
            <SearchSubmit type="submit"/>
        </SearchForm>
    );
}


const SearchInput=styled.input`
`;

const SearchForm=styled.form`
display:flex;
`;

const SearchSubmit=styled.input`
`