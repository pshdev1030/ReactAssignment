import React from 'react';
import {useForm} from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addCountryAction, isOverlap} from '../State/commonstate';
import styled from 'styled-components';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateComponent(){
    const {register,handleSubmit}=useForm();
    const dispatch=useDispatch();

    const onSubmit=(input)=>{
        let count=0;
        for(const key in input){
            const value=input[key];
            if(value===""){
                count++;
            }
        }
        if(count!==0){
            toast.error("모든 값을 입력해야 합니다.");
            return;
        }
        const overlapTest=[
            {err:dispatch(isOverlap(input,"name")),type:'이름'},
            {err:dispatch(isOverlap(input,"alpha2Code")),type:'국가 코드'},
        ]

        const overlapCheck=overlapTest.filter(({err})=>err===true)

        if(overlapCheck.length===overlapTest.length){
            toast.error('이름과 국가코드이(가) 중복인 나라가 존재합니다.');
            return;
        }
        if(overlapCheck.length>0){
            console.log(overlapCheck);
            toast.error(`${overlapCheck[0].type}이(가) 중복인 나라가 존재합니다.`);
            return;
        }
            dispatch(addCountryAction(input));
        }
        
    return(
    <CountryInfoForm onSubmit={handleSubmit(onSubmit)}>
   {/* register your input into the hook by invoking the "register" function */}
      <CountryInfoInput name="name" placeholder="이름(Name)"ref={register()} />
      {/* include validation with required or other standard HTML validation rules */}
      <CountryInfoInput name="alpha2Code" placeholder="국가코드(Alpha2Code)" ref={register()}/>
      <CountryInfoInput name="capital" placeholder="수도(Capital)" ref={register()}/>
      <CountryInfoInput name="region" placeholder="지역(Region)"ref={register()}/>
      <CountryInfoInput name="callingCodes" placeholder="지역코드(CallingCodes)" ref={register()}/>
      <CountrySubmitInput type="submit" value="제출하기"/>
    </CountryInfoForm>
    );
}

const CountryInfoInput=styled.input`
padding:8px;
margin:8px;
border:2px solid grey;
border-radius:10px;
`;

const CountryInfoForm=styled.form`
margin-bottom:3vh;
`;

const CountrySubmitInput=styled.input`
padding:8px;
margin:8px;
border:none;
`;

export default CreateComponent;

//handleSubmit(onSubmit) onSubmit을 submit이벤트로 다룬다.