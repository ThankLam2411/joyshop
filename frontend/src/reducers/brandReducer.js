import { BRAND_LIST_FAIL, BRAND_LIST_PRODUCT_FAIL, BRAND_LIST_PRODUCT_REQUEST, BRAND_LIST_PRODUCT_SUCCESS, BRAND_LIST_REQUEST, BRAND_LIST_SUCCESS } from "../constants/brandConstant";

export const brandListReducer=(state={loading: true, brands:[]},action) => {
    switch (action.type) {
        case BRAND_LIST_REQUEST:
            return {loading: true}
        case BRAND_LIST_SUCCESS:
            return {loading: false, brands: action.payload}
        case BRAND_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}
export const brandListProductReducer =(state={loading: true, products:{}},action) =>{
    switch (action.type) {
        case BRAND_LIST_PRODUCT_REQUEST:
            return {loading: true}
        case BRAND_LIST_PRODUCT_SUCCESS:
            return {loading: false, products: action.payload}
        case BRAND_LIST_PRODUCT_FAIL:
            return {loading: false, error: action.payload}
        default: 
            return state;
    }
}