import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { brandListProductReducer, brandListReducer } from './reducers/brandReducer';
import { cartReducer } from './reducers/cartReducers';
import { categoryListReducer } from './reducers/categoryReducers';
import { commentsCreateReducer, commentsListReducer } from './reducers/commentReducers';
import { orderCreateReducer, orderDeleteReducer, orderDetailsReducer, orderListReducer, orderMineListReducer, orderPayReducer, orderSummaryReducer } from './reducers/orderReducers';
import { productCreateReducer, productDeleteReducer, productDetailsReducer, productListByCategoryIdReducer, productListByQueryReducer, productListReducer, productUpdateReducer } from './reducers/productReducers';
import { shippingReducer } from './reducers/shippingReducers';
import { userDeleteReducer, userDetailsReducer, userRegisterReducer, userSigninReducer, userUpdateProfileReducer, userUpdateReducer } from './reducers/userReducers';
import {blogDetailsReducer, blogListReducer} from './reducers/blogReducer';
const initialState = {
    userSignin:{
        userInfo: localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')) : null,
    },
    shippingAddress:{
        shippingAddress: localStorage.getItem('shippingAddress')
        ? JSON.parse(localStorage.getItem('shippingAddress'))
        : {},
    },
    // orderItems:{
    //     orderItems: localStorage.getItem('orderItems')
    //     ? JSON.parse(localStorage.getItem('orderItems'))
    //     : {},
    // },
    cart: {
        cartItems: localStorage.getItem('cartItems')
          ? JSON.parse(localStorage.getItem('cartItems'))
          : [],
          orderItems: localStorage.getItem('orderItems')
          ? JSON.parse(localStorage.getItem('orderItems'))
          : {},
      
      },    
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productCreate: productCreateReducer,
    productDelete: productDeleteReducer,
    productUpdate: productUpdateReducer,
    productListByQuery: productListByQueryReducer,
    productListByCategory: productListByCategoryIdReducer,
    cart: cartReducer,
    brandList: brandListReducer,
    brandListProduct: brandListProductReducer,
    categoryList: categoryListReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userUpdate: userUpdateReducer,
    userDelete: userDeleteReducer,
    shippingAddress: shippingReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderMineList: orderMineListReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    orderSummary: orderSummaryReducer,
    orderPay: orderPayReducer,
    commentsList: commentsListReducer,
    commentsCreate: commentsCreateReducer,
    blogList: blogListReducer,
    blogDetails: blogDetailsReducer,

})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer, 
    initialState, 
    composeEnhancer(applyMiddleware(thunk))
);

export default store;