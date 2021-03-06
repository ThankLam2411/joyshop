import  Axios  from "axios"
import { CART_EMPTY } from "../constants/cartConstants"
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DELETE_FAIL, ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_ITEM_CREATE_REQUEST, ORDER_ITEM_CREATE_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_MINE_LIST_FAIL, ORDER_MINE_LIST_REQUEST, ORDER_MINE_LIST_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_SUMMARY_FAIL, ORDER_SUMMARY_REQUEST, ORDER_SUMMARY_SUCCESS } from "../constants/orderConstants"


export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    console.log(order);
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await Axios.post('/api/orders', order, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      console.log('123',data.order);
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
      dispatch({ type: CART_EMPTY });
      localStorage.removeItem('cartItems');
    } catch (error) {
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
 
  export const detailsOrder = (orderId) => async(dispatch,getState) => { //getState: get Token, current user
    dispatch({type:ORDER_DETAILS_REQUEST, payload:orderId});

    try{
        const {userSignin:{userInfo}}=getState();//redux store
        const {data} = await Axios.get(`/api/orders/${orderId}`,{
            headers: {Authorization:`Bearer ${userInfo.token}`}
        });
        console.log(data);
        dispatch({type:ORDER_DETAILS_SUCCESS, payload:data})

    }catch(error){
        const message= error.response && error.response.data.message
                        ?error.response.data.message
                        :error.message;
        dispatch({type:ORDER_DETAILS_FAIL,payload:message})
    }
}

export const listOrderMine =(userId)=> async (dispatch, getState) => {
  dispatch({ type: ORDER_MINE_LIST_REQUEST})
  const {userSignin: { userInfo }}= getState();
  try {
    const {data}= await Axios.get(`/api/orders/mine/${userId}`,{
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });
    console.log(userInfo);
    dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload:data})

  }catch(error) {
    const message= error.response && error.response.data.message
    ?error.response.data.message
    :error.message;
    dispatch({type: ORDER_MINE_LIST_FAIL, payload: message})
  }
}
export const listOrderAll=() => async(dispatch)=>{
  dispatch({type:ORDER_LIST_REQUEST});
  try{
    const {data} = await Axios.get('/api/orders/');
    dispatch({type:ORDER_LIST_SUCCESS, payload:data})
    console.log(data)
  }catch(error){
    dispatch({
      type:ORDER_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message :error.message,
    })
  }
}
export const deleteOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.delete(`/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ORDER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DELETE_FAIL, payload: message });
  }
};

export const summaryOrder = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_SUMMARY_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get('/api/orders/summary', {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ORDER_SUMMARY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_SUMMARY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const PayOrder =(order, paymentResult)=>async(dispatch, getState)=>{
  dispatch({type: ORDER_PAY_REQUEST, payload:{order,paymentResult}})
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const {data}= Axios.put(`/api/orders/${order.id}/pay`,paymentResult,{
      headers: { Authorization: `Bearer ${userInfo.token}` },

    })
    dispatch({type:ORDER_PAY_SUCCESS, payload:data});
  }catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}