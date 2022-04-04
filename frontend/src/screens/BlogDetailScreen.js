import Axios  from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { detailsBlog, updateBlog } from "../actions/blogAction";
import { detailsProduct, listProducts, updateProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { BLOG_UPDATE_RESET } from "../constants/blogConstants";

const BlogDetailScreen=()=>{
  const dispatch = useDispatch();
  const {id: blogId}=useParams();
  const navigate = useNavigate();

  const [blog_title, setBlogTitle] = useState('');
  const [blog_content, setBlogContent] = useState('');
  const [product_id, setProductId] = useState('');
  
  // const [blog, setBlog] = useState([]);
  // const [products, setProducts]= useState([]);
  // const blogDetails = useSelector((state) => state.blogDetails);
  // const {loading, error, blog}= blogDetails;
  
  const productList = useSelector((state) => state.productList);
  const {loading, error, products, totalPages, page}= productList;
  const blogUpdate = useSelector(state => state.blogUpdate);
  const {loading: loadingUpdate, error: errorUpdate, success}= blogUpdate;

  const [blog, setBlog]= useState({})
  useEffect(() => {
    async function getBlogDetails(){
      let data = await Axios.get(`/api/blogs/${blogId}`);
      let blog = data.data;
      setBlog(blog);
      // setBlogTitle(blog.blog_title);
      // setBlogContent(blog.blog_content);
      // setProductId(blog.product_id)
      return blog;

    }
    getBlogDetails()
  },[blogId])
  console.log('blog', blog);
  useEffect(() => {
    dispatch(listProducts(page));
  },[])

  // useEffect(()=>{
  //   async function getProducts(){
  //     let result = await Axios.get('/api/products/');
  //     let products = result.data;
  //     setProducts(products)
  //     return products
  //   } 
  //   getProducts()
  // },[])
  console.log(typeof blog)
  useEffect(() => {
    if(success) {
      navigate('/blogs')
    }
      
      if(Object.keys(blog).length===0|| 
        !blog || !!blog) {
        dispatch(detailsBlog(blogId))
      }else{
         setBlogTitle(blog.blog_title);
         setBlogContent(blog.blog_content);
         setProductId(blog.product_id)
    }
    dispatch({type:BLOG_UPDATE_RESET})
  },[dispatch,blog, blogId, success, navigate])
  // useEffect(() => {
  //   console.log(blog)
  //   setBlogTitle(blog.blog_title);
  //   setBlogContent(blog.blog_content);
  //   setProduct, Id(blog.product_id)
  // },[])

const submitHandler = (e) => {
  e.preventDefault();
  dispatch(updateBlog(blogId,blog_title, blog_content,product_id));
}
// console.log(products.products)
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
        <label htmlFor="product_id">Products</label>
        {loading?<LoadingBox></LoadingBox>:
          error?<MessageBox variant="danger">{error}</MessageBox>:
          (
            <div>
              <select id="product_id" type="text" onChange={(e) => setProductId(e.target.value)}>
              <option value=""></option>
                  {
                    products.products.map((product,index) =>(
                    <option 
                        key={index} 
                        value={product.id}
                      >{product.product_name}</option>
                    ))
                  }
              </select>
            </div>
          )}
              
            
      

       
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