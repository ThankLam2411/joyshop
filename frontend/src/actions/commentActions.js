import  Axios  from "axios"
import { COMMENT_CREATE_FAIL, COMMENT_CREATE_REQUEST, COMMENT_CREATE_SUCCESS, COMMENT_LIST_FAIL, COMMENT_LIST_REQUEST, COMMENT_LIST_SUCCESS } from "../constants/commentConstants"

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
export const postComment=(comment_content,  product_id)=>async(dispatch, getState)=>{
    dispatch({type: COMMENT_CREATE_REQUEST});
    const {
        userSignin: { userInfo },
      } = getState();
    try{
       const {data} = await Axios.post('/api/comments/', {comment_content,  user_id:userInfo.id, product_id},{
        
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