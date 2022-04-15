import  Axios  from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createdBlog } from "../actions/blogAction";
import { listFeaturedProducts } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const BlogCreateScreen =()=>{
    const dispatch = useDispatch();
    const {id: blogId}=useParams();
    const navigate = useNavigate();

    const productFeaturedList = useSelector((state) => state.productFeaturedList);
    const {loading, error, products, totalPages, page}= productFeaturedList;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo}= userSignin;
    const blogCreate = useSelector((state) => state.blogCreate);
    const {loading:loadingCreate, error: errorCreate, success, }= blogCreate;

    const [blog_title, setBlogTitle] = useState('');
    const [blog_content, setBlogContent] = useState('');
    const [blog_image, setBlogImage] = useState('');

    const [product_id, setProductId] = useState('');

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
    useEffect(() => {
      if(success){
        navigate('/bloglist')
      }
        dispatch(listFeaturedProducts(page));
      },[dispatch,success]);

    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(createdBlog(blog_title, blog_content,blog_image, product_id))
    }
    return (
        <>
    <form className="form" onSubmit={submitHandler}>
      <div>
        <h1> Create Blog</h1>
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
                <input
                  id="blog_content"
                  type="text"
                  // placeholder="Enter blog_content"
                  value={blog_content}
                  onChange={(e) => setBlogContent(e.target.value)}
                ></input>
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
                // value={blog_image}
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
                  Create Blog
                </button>
              </div>
              </>
            {/* )} */}
      </form>
    </>
    )
}
export default BlogCreateScreen;