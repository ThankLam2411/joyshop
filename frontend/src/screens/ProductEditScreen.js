import Axios  from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { detailsProduct, updateProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const ProductEditScreen=()=>{
  const dispatch = useDispatch();
  const {id: productId}=useParams();
  const navigate = useNavigate();
  console.log(productId);
  const [product,setProduct]= useState([]);
  const [product_name, setProductName] = useState('');
  const [old_price, setOldPrice] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category_id, setCategoryId] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [featured, setFeatured]= useState('');
  const [brand_id, setBrandId] = useState('');
  const [product_description, setDescription] = useState('');
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([])

  // const productDetails = useSelector((state) => state.productDetails);
  // const {loading, error, product}= productDetails;
  const productUpdate=useSelector((state) => state.productUpdate);
  const{loading: loadingUpdate, error: errorUpdate, success}= productUpdate;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo}= userSignin;
  console.log(product)

  useEffect(()=>{
    async function getProduct(){
      let res = await Axios.get(`/api/products/${productId}`);
      let product=res.data;
      setProduct(product);
      return product;
    
    }
    getProduct()
    async function getBrands(){
      let res = await Axios.get('/api/brands');
      let brands=res.data;
      setBrands(brands);
      return brands;
    
    }
    getBrands();
    async function getCategories(){
      let res = await Axios.get('/api/categories');
      let categories = res.data;
      setCategories(categories);
      return categories;
    
    }
    getCategories();
  },[])

  useEffect(()=>{
    if(success) {
      navigate('/')
    }
    if(!product){
      dispatch(detailsProduct(productId))
    }else{
      setProductName(product.product_name)
      setOldPrice(product.old_price)
      setPrice(product.price)
      setImage(product.image)
      setCategoryId(product.category_id)
      setCountInStock(product.countInStock)
      setFeatured(product.featured)
      setBrandId(product.brand_id)
      setDescription(product.product_description)
    }

},[dispatch, product, productId, success, navigate]);
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
    setImage(data);
    setLoadingUpload(false);
  } catch (error) {
    setErrorUpload(error.message);
    setLoadingUpload(false);
  }
};
const submitHandler = (e) => {
  e.preventDefault();
  dispatch(updateProduct({id:productId, product_name, old_price, price, image, countInStock,featured, category_id, brand_id, product_description}))
}
  return(
    
    <form className="form" onSubmit={submitHandler}>
      <div>
        <h1> Edit Product {productId}</h1>
      </div>
      {/* {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : ( */}
        <>
      <div>
        <label htmlFor="product_name">Name</label>
          <input
            id="product_name"
            type="text"
            value={product_name}
            onChange={(e) => setProductName(e.target.value)}
          ></input>
      </div>
      <div>
        <label htmlFor="price">Old Price</label>
          <input
            id="price"
            type="text"
            placeholder="Enter price"
            value={old_price}
            onChange={(e) => setOldPrice(e.target.value)}
          ></input>
        </div>
        <div>
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="text"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></input>
        </div>
        <div>
              <label htmlFor="image">Image</label>
                <input
                  id="image"
                  type="text"
                  placeholder="Enter image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></input>
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
              <label htmlFor="countInStock">Count In Stock</label>
              <input
                id="countInStock"
                type="text"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></input>
            </div>
            <div>
                <label htmlFor="featured">Is Featured</label>
                <input
                  id="featured"
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                ></input>
              </div>
           
            
         
              <div>
              <label htmlFor="category">Category</label>
              <select id="brand_id" type="text" onChange={(e) => setCategoryId(e.target.value)}>
              <option value=""></option>
                  {
                    categories.map((item,key) => (
                      <option key={key} value={item.id}>{item.category_name}</option>
                    ))
                  }
            </select>
            </div>
            <div>
              <label htmlFor="brand">Brand</label>
                <select id="brand_id" type="text"
                  onChange={(e) => setBrandId(e.target.value)}
                >
             <option value=""></option>
                {
                  brands.map((item,key) => (
                    <option key={key} value={item.id}>{item.brand_name}</option>
                  ))
                }

            </select>
            </div>
           
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                rows="3"
                type="text"
                placeholder="Enter description"
                value={product_description}
                // onChange={(e) => setDescription(e.target.value)}
              ></textarea>
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
export default ProductEditScreen;