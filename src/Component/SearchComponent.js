import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch} from 'react-redux';
import styled from 'styled-components';
import { searchCountriesAction } from '../State/commonstate';

export default function SearchComponent(){
    const dispatch=useDispatch();
    const {register,handleSubmit}=useForm();

    const onSubmit=(e)=>{
        console.log(e.input);
        dispatch(searchCountriesAction(e.input));
    }

    return(
        <SearchForm onSubmit={handleSubmit(onSubmit)}>
            <SearchInput name="input" ref={register()}/>
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