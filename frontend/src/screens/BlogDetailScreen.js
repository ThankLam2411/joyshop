import Axios  from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { detailsProduct, listProducts, updateProduct } from "../actions/productActions";

const BlogDetailScreen=()=>{
  const dispatch = useDispatch();
  const {id: blogId}=useParams();
  const navigate = useNavigate();

  const [blog_title, setBlogTitle] = useState('');
  const [blog_content, setBlogContent] = useState('');
  const [product_id, setProductId] = useState('');
  const [blog, setBlog] = useState([]);
  const [products, setProducts]= useState([]);
  console.log(blog)
  useEffect(() => {
    //   if(!blog){
        async function getBlogDetail(){
            let res = await Axios.get(`/api/blogs/${blogId}`);
            let blog=res.data;
            setBlog(blog);
            return blog;
          
          }
        getBlogDetail();
    //   }else{
          setBlogTitle(blog.blog_title);
          setBlogContent(blog.blog_content);
          setProductId(blog.product_id)
    //   }
  
  },[])

const submitHandler = (e) => {
  e.preventDefault();
}
  return(
    
    <form className="form" onSubmit={submitHandler}>
      <div>
        <h1> Edit Blog {blogId}</h1>
      </div>
      
      <div>
        <label htmlFor="blog_title">Blog Title</label>
          <input
            id="blog_title"
            type="text"
            value={blog_title}
            onChange={(e) => setBlogTitle(e.target.value)}
          ></input>
      </div>
        <div>
              <label htmlFor="blog_content">Blog Content</label>
              <input
                id="blog_content"
                type="text"
                // placeholder="Enter blog_content"
                value={blog_content}
                onChange={(e) => setBlogContent(e.target.value)}
              ></input>
        </div>
            <div>
              <label></label>
              <button className="primary" type="submit">
                Update
              </button>
            </div>
      </form>
  )
}
export default BlogDetailScreen;