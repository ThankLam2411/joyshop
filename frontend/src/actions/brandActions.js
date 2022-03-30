import Axios from 'axios';
import {BRAND_LIST_FAIL, BRAND_LIST_PRODUCT_FAIL, BRAND_LIST_PRODUCT_REQUEST, BRAND_LIST_PRODUCT_SUCCESS, BRAND_LIST_REQUEST, BRAND_LIST_SUCCESS} from '../constants/brandConstant.js'

export const listBrand=()=>async(dispatch)=>{
    dispatch({
        type:BRAND_LIST_REQUEST
    });
    try{
        const {data} = await Axios.get('/api/brands')
        dispatch({
            type: BRAND_LIST_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type:BRAND_LIST_FAIL,
            payload:error.message
        })
    }
}
export const listProductsByBrand=(brandId)=> async (dispatch)=>{
    dispatch({
        type:BRAND_LIST_PRODUCT_REQUEST
    });
    try {
        const {data}= await Axios.get(`/api/brands/${brandId}`);
        dispatch({
            type: BRAND_LIST_PRODUCT_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type: BRAND_LIST_PRODUCT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message :error.message,

        })

    }
}