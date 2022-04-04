import { CONTACT_CREATE_FAIL, CONTACT_CREATE_REQUEST, CONTACT_CREATE_SUCCESS } from "../constants/contactConstant";
import  Axios  from "axios";


export const createContact=(name,email,message)=> async(dispatch)=>{
    console.log(1)
    dispatch({type: CONTACT_CREATE_REQUEST})
    try{
        const {data}= await Axios.post('/api/contacts', {name,email,message})
        dispatch({
            type: CONTACT_CREATE_SUCCESS,
            payload: data
        })
        console.log(data)
    }catch(error){
        const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: CONTACT_CREATE_FAIL, payload: message });
    }

}