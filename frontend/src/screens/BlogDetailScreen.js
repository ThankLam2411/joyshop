import { Editor } from "@tinymce/tinymce-react";
import Axios  from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { detailsBlog, updateBlog } from "../actions/blogAction";
import { detailsProduct, listFeaturedProducts, listProducts, updateProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { BLOG_UPDATE_RESET } from "../constants/blogConstants";

const BlogDetailScreen=()=>{
  const dispatch = useDispatch();
  const {id: blogId}=useParams();
  const navigate = useNavigate();

  const [blog_title, setBlogTitle] = useState('');
  const [blog_content, setBlogContent] = useState('');
  const [blog_image, setBlogImage] = useState('')
  const [product_id, setProductId] = useState('');
  
  // const [blog, setBlog] = useState([]);
  // // const [products, setProducts]= useState([]);
  // const blogDetails = useSelector((state) => state.blogDetails);
  // const {loading: loadingBlog, error: errorBlog, blog}= blogDetails;
  
  const productFeaturedList = useSelector((state) => state.productFeaturedList);
  const {loading, error, products, totalPages, page}= productFeaturedList;
  const blogUpdate = useSelector(state => state.blogUpdate);
  const {loading: loadingUpdate, error: errorUpdate, success}= blogUpdate;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo}= userSignin;

  const [blog, setBlog]= useState([])
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
    dispatch(listFeaturedProducts(page));
  },[dispatch]);
  const [loadingUpload, setLoadingUpload] = useState(false);
const [errorUpload, setErrorUpload] = useState('');
const [uploadStatus, setUploadStatus] = useState('')

const uploadFileHandler = async (e) => {
  const file = e.target.files[0];
  const bodyFormData = new FormData();
  bodyFormData.append('image', file);
  setLoadingUpload(true);
  try {
    const { data } = await Axios.post('/api/uploads/', bodyFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    console.log(data)
    setBlogImage(data);
    setLoadingUpload(false);
  } catch (error) {
    setErrorUpload(error.message);
    setLoadingUpload(false);
  }
};

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
      navigate('/bloglist')
    }
      
      if(//Object.keys(blog).length===0||
       
        !blog ) {
        dispatch(detailsBlog(blogId))
      }else{
         setBlogTitle(blog.blog_title);
         setBlogContent(blog.blog_content);
         setBlogImage(blog.blog_image);
         setProductId(blog.product_id)
    }
    // dispatch({type:BLOG_UPDATE_RESET})
  },[, dispatch, navigate, success, blog, blogId])
  // useEffect(() => {
  //   console.log(blog)
  //   setBlogTitle(blog.blog_title);
  //   setBlogContent(blog.blog_content);
  //   setProduct, Id(blog.product_id)
  // },[])

const submitHandler = (e) => {
  e.preventDefault();
  dispatch(updateBlog(blogId,blog_title, blog_content,blog_image, product_id));
}
const handleEditorChange=(e)=>{
  setBlogContent(e)
}
// console.log(products.products)
  return(
    
    <form className="form" onSubmit={submitHandler}>
      <div>
        <h1> Edit Blog {blogId}</h1>
      </div>
      {/* {loading?<LoadingBox></LoadingBox>:
          error?<MessageBox variant="danger">{error}</MessageBox>:
      ( */}
      <>
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
                <Editor
                  value={blog_content}
                  init={{
                    height: 500,
                    menubar: false
                  }}
                  onEditorChange={handleEditorChange}

                />
                {/* <input
                  id="blog_content"
                  type="text"
                  // placeholder="Enter blog_content"
                  value={blog_content}
                  onChange={(e) => setBlogContent(e.target.value)}
                ></input> */}
          </div>
          <div>
              <label htmlFor="image">Image</label>
                <input
                  id="image"
                  type="text"
                  placeholder="Enter image"
                  value={blog_image}
                  onChange={(e) => setBlogImage(e.target.value)}
                ></input>
                <img src={blog_image} class="medium"/>
            </div>
          <div>
              <label htmlFor="imageFile">Image File</label>
              <input
                type="file"
                name="image"
                id="imageFile"
                label="Choose Image"
                onChange={uploadFileHandler}
              ></input>
            </div>
          <div>
          <label htmlFor="product_id">Products</label>
          {loading?<LoadingBox></LoadingBox>:
            error?<MessageBox variant="danger">{error}</MessageBox>:
            (
              <div>
                <select id="product_id" type="text" onChange={(e) => setProductId(e.target.value)}>
                <option value={product_id}></option>
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
              </>
            {/* )} */}
      </form>
  )
}
export default BlogDetailScreen;