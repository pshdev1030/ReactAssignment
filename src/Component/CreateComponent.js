import React from 'react';
import {useForm} from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { AddCountry } from '../State/commonstate';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateComponent(){
    const {register,handleSubmit}=useForm();
    const dispatch=useDispatch();

    const onSubmit=(input)=>{
        console.log(input);
        let count=0;
        for(const key in input){
            const value=input[key];
            if(value===""){
                count++;
            }
        }
        if(count!==0){
            toast.info("모든 값을 입력해야 합니다.")
            return;
        }
        else{
        dispatch(AddCountry(input));
        }
    }
    return(
    <form onSubmit={handleSubmit(onSubmit)}>
   {/* register your input into the hook by invoking the "register" function */}
      <input name="Name" placeholder="이름(Name)"ref={register()} />
      {/* include validation with required or other standard HTML validation rules */}
      <input name="Alpha2Code" placeholder="국가코드(Alpha2Code)" ref={register()}/>
      <input name="Capital" placeholder="수도(Capital)" ref={register()}/>
      <input name="Region" placeholder="지역(Region)"ref={register()}/>
      <input name="CallingCodes" placeholder="지역코드(CallingCodes)" ref={register()}/>
      <input type="Submit" defaultValue="제출하기"/>
      <ToastContainer autoClose="3000"/>
    </form>
    );
}

export default CreateComponent;

//handleSubmit(onSubmit) onSubmit을 submit이벤트로 다룬다.