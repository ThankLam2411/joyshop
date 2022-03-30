import { SHIPPING_CREATE_FAIL, SHIPPING_CREATE_REQUEST, SHIPPING_CREATE_SUCCESS } from "../constants/shippingConstants"

export const shippingReducer = (state= {}, action) =>{
    switch (action.type) {
        case SHIPPING_CREATE_REQUEST:
            return {loading: true}
        case SHIPPING_CREATE_SUCCESS:
            return {loading: false, shippingAddress: action.payload}
        case SHIPPING_CREATE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}