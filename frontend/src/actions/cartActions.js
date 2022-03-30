import Axios from 'axios';
import {CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD} from '../constants/cartConstants';
export const addToCart = ( productId, qty) => async(dispatch, getState)=>{
    const {data}= await Axios.get(`/api/products/${productId}`);
    dispatch({
        type: CART_ADD_ITEM,
        payload:{
            product_name: data.product_name,
            image: data.image,
            countInStock: data.countInStock,
            price: data.price,
            product: data.id,
            qty,
        }

    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    // dispatch({type: ORDER_ITEM_CREATE_REQUEST, 
    //     payload:{  
    //         product_name: data.product_name,
    //         image: data.image,
    //         countInStock: data.countInStock,
    //         price: data.price,
    //         product: data.id,
    //         qty,
    // }})
    // try{
    //     const {orderItems}= await Axios.post('/api/order-detail',{name: data.product_name,qty, image: data.image,price: data.price, product: data.id, })
    //     dispatch({
    //         type: ORDER_ITEM_CREATE_SUCCESS,
    //         payload: orderItems,
            
            
    //     })
    //     localStorage.setItem('orderItems', JSON.stringify(orderItems));



    // }catch(error) {
    //     dispatch({
    //         type: ORDER_ITEM_CREATE_FAIL,
    //         payload:
    //         error.response && error.response.data.message
    //           ? error.response.data.message
    //           : error.message,
    //     })
    // }


}

export const removeFromCart =(productId)=>(dispatch,getState)=>{
    dispatch({type: CART_REMOVE_ITEM, payload: productId});
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const savePaymentMethod=(data)=> (dispatch)=>{
    dispatch({type: CART_SAVE_PAYMENT_METHOD, payload:data});
    
}