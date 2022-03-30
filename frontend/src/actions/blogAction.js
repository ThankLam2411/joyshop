import  Axios  from "axios";
import { BLOG_LIST_FAIL, BLOG_LIST_REQUEST, BLOG_LIST_SUCCESS } from "../constants/blogConstants";

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