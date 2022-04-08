import  Axios  from "axios";
import { BLOG_CREATE_FAIL, BLOG_CREATE_REQUEST, BLOG_CREATE_SUCCESS, BLOG_DELETE_FAIL, BLOG_DELETE_REQUEST, BLOG_DELETE_SUCCESS, BLOG_DETAILS_FAIL, BLOG_DETAILS_REQUEST, BLOG_DETAILS_SUCCESS, BLOG_LIST_FAIL, BLOG_LIST_REQUEST, BLOG_LIST_SUCCESS, BLOG_UPDATE_FAIL, BLOG_UPDATE_REQUEST, BLOG_UPDATE_SUCCESS } from "../constants/blogConstants";

export const listBlog=()=>async(dispatch)=>{
    dispatch({
        type:BLOG_LIST_REQUEST
    });
    try{
        const {data} = await Axios.get('/api/blogs')
        dispatch({
            type: BLOG_LIST_SUCCESS,
            payload: data
        })
        console.log(data)
    }catch(error){
        dispatch({
            type:BLOG_LIST_FAIL,
            payload:error.message
        })
    }
}
export const detailsBlog=(blogId) => async(dispatch)=>{
    dispatch({
        type: BLOG_DETAILS_REQUEST,
        payload: blogId
    });
    try{
        const {data}= await Axios.get(`/api/blogs/${blogId}`);
        dispatch({
            type: BLOG_DETAILS_SUCCESS,
            payload: data
        });
        console.log(data)
    }catch(error){
        dispatch({
            type: BLOG_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message :error.message,
        })
    }
}
export const updateBlog = (blogId,blog_title, blog_content,blog_image, product_id)=> async(dispatch)=>{
    dispatch({
        type: BLOG_UPDATE_REQUEST,
        payload:{blog_title, blog_content,blog_image, product_id}
    })
    try {
        const {data}= await Axios.patch(`/api/blogs/${blogId}`, {blog_title, blog_content,blog_image, product_id})
        dispatch({
            type: BLOG_UPDATE_SUCCESS,
            payload: data,
        })

    }catch(error){
        const message =
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: BLOG_UPDATE_FAIL, error: message });
    }
};

export const deleteBlog = (blogId) => async (dispatch, getState) => {
    dispatch({ type: BLOG_DELETE_REQUEST, payload: blogId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      await Axios.delete(`/api/blogs/${blogId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: BLOG_DELETE_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: BLOG_DELETE_FAIL, payload: message });
    }
  };
  export const createdBlog = (blog_title, blog_content,blog_image, product_id) => async (dispatch, getState) => {
    dispatch({ type: BLOG_CREATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        '/api/blogs', {blog_title, blog_content,blog_image, product_id},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: BLOG_CREATE_SUCCESS,
        payload: data.product,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: BLOG_CREATE_FAIL, payload: message });
    }
  };