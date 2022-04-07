import  Axios  from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteBlog, listBlog } from "../actions/blogAction";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { BLOG_DELETE_RESET } from "../constants/blogConstants";

const ListBlogScreen=()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const blogList = useSelector((state) => state.blogList);
    const {loading, error, blogs}= blogList;
    const blogDelete = useSelector((state) => state.blogDelete);
    const {loading: loadingDelete, error: errorDelete, success: successDelete}= blogDelete
    console.log(blogs);
 
    useEffect(()=>{
      if (successDelete) {
        dispatch({ type: BLOG_DELETE_RESET });
      }
      
      dispatch(listBlog())
    },[dispatch, successDelete])

    const deleteHandler=(blog)=>{
        // e.preventDefault();
        if (window.confirm('Are you sure to delete?')) {
            dispatch(deleteBlog(blog.id));
          }
        };
    
    return(
        <>
            <h1>Blogs</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
            <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>BLOG TITLE</th>
              <th>BLOG CONTENT</th>
              <th>PRODUCT</th>
              <th>CREATED AT</th>
              <th>UPDATED AT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id}>
                <td>{blog.id}</td>
                <td>{blog.blog_title}</td>
                <td>{blog.blog_content}</td>
                <td>{blog.product.product_name}</td>
                <td>{blog?.createdAt}</td>
                <td>{blog?.updatedAt}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => {
                      navigate(`/blog/${blog.id}`);
                    }}
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(blog)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
            </table>
      )}
        </>
    )
}
export default ListBlogScreen;