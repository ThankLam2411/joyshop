import Axios  from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { detailsBlog } from "../actions/blogAction";
import { detailsProduct, listProducts, updateProduct } from "../actions/productActions";

const BlogDetailScreen=()=>{
  const dispatch = useDispatch();
  const {id: blogId}=useParams();
  const navigate = useNavigate();

  const [blog_title, setBlogTitle] = useState('');
  const [blog_content, setBlogContent] = useState('');
  const [product_id, setProductId] = useState('');
  
  // const [blog, setBlog] = useState([]);
  const [products, setProducts]= useState([]);
  const blogDetails = useSelector((state) => state.blogDetails);
  const {loading, error, blog}= blogDetails;
  
  // const productList = useSelector((state) => state.productList);
  // const {loading:loadingProducts, error:errorProducts, products}= productList;


  console.log('blog', blog);
  // useEffect(() => {
  //   async function getBlogDetails(){
  //     let data = await Axios.get(`/api/blogs/${blogId}`);
  //     let blog = data.data;
  //     setBlog(blog);
  //     setBlogTitle(blog.blog_title);
  //     setBlogContent(blog.blog_content);
  //     setProductId(blog.product_id)

  //   }
  //   getBlogDetails()
  // },[blogId])
  // useEffect(() => {
  //   dispatch(listProducts())
  // },[dispatch])

  useEffect(()=>{
    async function getProducts(){
      let result = await Axios.get('/api/products/');
      let products = result.data;
      setProducts(products)
    } 
    getProducts()
  },[])
  console.log(products.products)
  useEffect(() => {
      if(!blog) {
        dispatch(detailsBlog(blogId))
      }else{
         setBlogTitle(blog.blog_title);
         setBlogContent(blog.blog_content);
         setProductId(blog.product_id)
    }
  
  },[dispatch, blog, blogId])
  // useEffect(() => {
  //   console.log(blog)
  //   setBlogTitle(blog.blog_title);
  //   setBlogContent(blog.blog_content);
  //   setProductId(blog.product_id)
  // },[])

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
        <label htmlFor="product_id">Products</label>

        <select id="product_id" type="text" onChange={(e) => setProductId(e.target.value)}>
              {/* <option value=""></option>
                  {
                    products.products.map((item,key) => (
                      <option key={key} value={item.id}>{item.product_name}</option>
                    ))
                  } */}
            </select>
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