import  Axios  from "axios"
import { COMMENT_CREATE_FAIL, COMMENT_CREATE_REQUEST, COMMENT_CREATE_SUCCESS, COMMENT_DELETE_FAIL, COMMENT_DELETE_REQUEST, COMMENT_DELETE_SUCCESS, COMMENT_LIST_ALL_FAIL, COMMENT_LIST_ALL_REQUEST, COMMENT_LIST_ALL_SUCCESS, COMMENT_LIST_FAIL, COMMENT_LIST_REQUEST, COMMENT_LIST_SUCCESS } from "../constants/commentConstants"

export const commentsByProductId=(productId)=>async (dispatch) => {
    dispatch({
        type: COMMENT_LIST_REQUEST
    })
    try{
        const {data}= await Axios.get(`/api/comments/${productId}`)
        dispatch({
            type: COMMENT_LIST_SUCCESS,
            payload: data
        })
        // console.log(data);
    }catch(error){
        dispatch({
            type: COMMENT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message :error.message,

        })
    }
}
export const postComment=(comment_content, rating,  product_id)=>async(dispatch, getState)=>{
    dispatch({type: COMMENT_CREATE_REQUEST});
    const {
        userSignin: { userInfo },
      } = getState();
    try{
        console.log(rating);
       const {data} = await Axios.post('/api/comments/', {comment_content, rating,  user_id:userInfo.id, product_id},{
        
        headers: { Authorization: `Bearer ${userInfo.token}` },
       });
       dispatch({type: COMMENT_CREATE_SUCCESS, payload:data});
       console.log(data)
    }catch(error){
        dispatch({
            type: COMMENT_CREATE_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
    
}

export const getComments=()=>async(dispatch,getState)=>{
    dispatch({type: COMMENT_LIST_ALL_REQUEST})
    const {
        userSignin: { userInfo },
      } = getState();
      try{
          const {data}= await Axios.get('/api/comments/',{
            headers: { Authorization: `Bearer ${userInfo.token}` },
            })
            dispatch({
                type: COMMENT_LIST_ALL_SUCCESS,
                payload: data
            })

      }catch(error){
        dispatch({
            type: COMMENT_LIST_ALL_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
      }
}
export const deleteComment = (commentId) => async (dispatch, getState) => {
    dispatch({ type: COMMENT_DELETE_REQUEST, payload: commentId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      await Axios.delete(`/api/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: COMMENT_DELETE_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: COMMENT_DELETE_FAIL, payload: message });
    }
  };