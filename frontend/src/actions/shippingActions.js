import  Axios from "axios";
import { CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";
import { SHIPPING_CREATE_FAIL, SHIPPING_CREATE_REQUEST, SHIPPING_CREATE_SUCCESS } from "../constants/shippingConstants";

export const saveShippingAddress=({fullName, phone, address, city, postalCode, country})=> async(dispatch)=>{
    // dispatch({type: CART_SAVE_SHIPPING_ADDRESS, payload:{fullName, address, phone, city, postalCode, country}});
    dispatch({type: SHIPPING_CREATE_REQUEST,payload:{fullName, address, phone, city, postalCode, country} })
    try{
        const{data}= await Axios.post('/api/shipping',{fullName, phone, address, city, postalCode, country}) ;
        dispatch({type: SHIPPING_CREATE_SUCCESS, payload:data})
        localStorage.setItem('shippingAddress', JSON.stringify(data));


    }catch(error){
        dispatch({
            type: SHIPPING_CREATE_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }

}