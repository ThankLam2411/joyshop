import  Axios  from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteBlog, listBlog } from "../actions/blogAction";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { BLOG_CREATE_RESET, BLOG_DELETE_RESET } from "../constants/blogConstants";

const ListBlogScreen=()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const blogList = useSelector((state) => state.blogList);
    const {loading, error, blogs}= blogList;
    const blogDelete = useSelector((state) => state.blogDelete);
    const {loading: loadingDelete, error: errorDelete, success: successDelete}= blogDelete
    console.log(blogs);
    const blogCreate = useSelector((state) => state.blogCreate);
    const {
      loading: loadingCreate,
      error: errorCreate,
      success: successCreate,
    } = blogCreate;
 
    useEffect(()=>{
      if (successDelete) {
        dispatch({ type: BLOG_DELETE_RESET });
      }
      if(successCreate){
        dispatch({ type: BLOG_CREATE_RESET})
      }
      
      dispatch(listBlog())
    },[dispatch, successDelete, successCreate])

    const deleteHandler=(blog)=>{
        // e.preventDefault();
        if (window.confirm('Are you sure to delete?')) {
            dispatch(deleteBlog(blog.id));
          }
    };
    const createHandler=()=>{
      navigate(`/blog/create`)
    }
    
    return(
        <>
        <h1>Danh sách bài viết</h1>
        <button type="button" className=" primary" style={{padding: '15px', borderRadius:'.5rem', margin:'15px', position:'absolute', right:'0px', top:'100px'}} onClick={createHandler}>
          Tạo bài viết
        </button>
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
              <th>Mã bài viết</th>
              <th>Tiêu đề bài viết</th>
              <th>Nội dung bài viết</th>
              <th>Sản phẩm</th>
              <th>Thời gian tạo</th>
              <th>Thời gian cập nhật</th>
              <th>Thao tác</th>
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
                    Sửa
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(blog)}
                  >
                    Xóa
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