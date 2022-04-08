import { useEffect, useState } from "react";
import Select from 'react-select';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createProduct } from "../actions/productActions";
import  Axios  from "axios";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const ProductCreateScreen=()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const productCreate = useSelector((state) => state.productCreate);
    const {loading, error, success, product}= productCreate;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo}= userSignin;

    // const brandList = useSelector((state) => state.brandList);
    // const {brands}= brandList;
    // console.log(brands)

    // const categoryList= useSelector((state) => state.categoryList);
    // const {categories}=categoryList;
    // console.log(categories)
    // const options = ()=>{
      
    // }
    // console.log(options)
    // const brands= Axios.get('/api/brands')
    //                     .then((res)=>{
    //                       console.log(res)
    //                     })
    // console.log(brands)
   
    const [product_name, setName] = useState('');
    const [old_price, setOldPrice] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [featured, setFeatured] = useState(false);
    const [countInStock, setCountInStock] = useState('');
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brand_id, setBrandId] = useState('');
    const [category_id, setCategoryId] = useState('');
    const [product_description, setDescription] = useState('');
    // console.log(image)
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createProduct(product_name, image, countInStock, old_price, price,featured, product_description, category_id, brand_id))
    }

    useEffect(() => {
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
        if(success){
            navigate(`/productlist`)
        }
    },[dispatch,navigate,success])
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
    
    return(
        <form class="form" onSubmit={submitHandler}>
          <div>
            <h1>Create Product </h1>
          </div>
        {loading && <LoadingBox></LoadingBox>}
        {error&& <MessageBox variant="danger">{error}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Product name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter product name"
                value={product_name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="old_price">Old Price</label>
              <input
                id="old_price"
                type="text"
                placeholder="Enter old price"
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
                <img src={image} class="medium"/>
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
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}
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
              <label htmlFor="product_description">Description</label>
              <textarea
                id="product_description"
                rows="3"
                type="text"
                placeholder="Enter product_description"
                value={product_description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            {/* <Select options={options} /> */}
          

            <div>
              <label></label>
              <button className="primary" type="submit">
                Create
              </button>
            </div>
          </>
        )}
        </form>
    )
}
export default ProductCreateScreen;