import  Axios  from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { listProductsByBrand } from "../actions/brandActions";
import { listProductByCategory } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import ProductItem from "../components/Product-item";

const ListProductScreen =()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate;
    const {id: brandId}= useParams();
    const brandListProduct=useSelector(state => state.brandListProduct);
    const {loading,error, products:productsListBrand}= brandListProduct;
    const [priceMin, setPriceMin]= useState();
    const [priceMax, setPriceMax]= useState();
    const [products, setProducts]= useState([])
    const [categories,setCategories]= useState([]);
    const [categoryId, setCategoryId]= useState();
    const [featured,setFeatured]= useState();
    const [inStock,setInStock]= useState();
    console.log(featured);

    // const handlePrice=(e)=>{
    //   e.preventDefault();
    // }
    let filterbyPrice=(item)=>{
      if (item.price>=priceMin && item.price<=priceMax){
        return true
      }else return false;
    }

    useEffect(() => {
      async function listProducts(){
        if(categoryId === undefined && !featured || categoryId ===''){
            const res= await Axios.get(`/api/brands/${brandId}`);
            let products= res.data;
            console.log('1',res.data);
            setProducts(products)
            // dispatch(listProductsByBrand())
            // setProducts(productsListBrand);
        }
        else if(categoryId === undefined && featured){
          let res = await Axios.get(`/api/brands/checked/${brandId}`,{
            params:{
              q:`${Number(featured)}`
            }
          })
          let products = res.data;
          setProducts(products)
        }
        else{
          const res= await Axios.get(`/api/brands/find/${brandId}`,{
                params:{
                  q:`${categoryId}`
                }
              });
              console.log('cate',categoryId)
              let products= res.data;
              console.log(products)
              setProducts(products);

        }
      }
      listProducts();

      
    },[categoryId, featured, brandId]);
    useEffect(() => {
      async function getCategories(){
        let res = await Axios.get('/api/categories/');
        let categories = res.data;
        setCategories(categories);
        //return categories;
      }
      getCategories();
    },[]);
    useEffect(() => {
     async function arrangeProductByPrice(){
       if(!priceMin || !priceMax){
        const res= await Axios.get(`/api/brands/${brandId}`);
        let products= res.data;
        console.log('1',res.data);
        setProducts(products)
       }else{
        let res= await Axios.get(`/api/products/find/${brandId}`,{
          params: {
            min:`${priceMin}`,
            max:`${priceMax}`
          }
        })
        let products = res.data;
        setProducts(products);
       }
        
      }
      arrangeProductByPrice()
    },[priceMin,priceMax]);
    console.log(products)
    
    const resetCategoryId=()=>{
      setCategoryId('')
    }
    return(
        <>
<div className="bg-main">
</div>
      <div className="container">
  <div className="box">
    <div className="breadcumb">
      <Link to="/">home</Link>
      <span><i className="bx bxs-chevrons-right" /></span>
      <span onClick={resetCategoryId}>All products</span>
    </div>
  </div>
  <div className="box">
    <div className="row">
      <div className="col-3 filter-col" id="filter-col">
        <div className="box filter-toggle-box">
          <button className="btn-flat btn-hover" id="filter-close">close</button>
        </div>
        <div className="box">
          <span className="filter-header">
            Categories
          </span>
          <ul className="filter-list">
            {
              categories.map((item, index)=>(
                <li key={index} value={item.id} onClick={(e)=>setCategoryId(e.target.value)}  style={{cursor:'pointer'}}>{item.category_name}</li>
              ))
            }
          
          </ul>
        </div>
        <div className="box">
          <span className="filter-header">
            Price
          </span>
          <div className="price-range">
            <input type="text" value ={priceMin} onChange={(e) => setPriceMin(e.target.value)} />
            <span>-</span>
            <input type="text" value ={priceMax} onChange={(e) => setPriceMax(e.target.value)} />
          </div>
        </div>
        <div className="box">
          <ul className="filter-list">
           
            <li>
              <div className="group-checkbox">
                <input type="checkbox" id="status1" value={inStock} onChange={(e) =>setInStock(e.target.defaultChecked)}/>
                <label htmlFor="status1">
                  In stock
                  <i className="bx bx-check" />
                </label>
              </div>
            </li>
            <li>
              <div className="group-checkbox">
                <input type="checkbox" id="status2" value={featured} onChange={(e) =>setFeatured(e.target.checked)} />
                <label htmlFor="status2">
                  Featured
                  <i className="bx bx-check" />
                </label>
              </div>
            </li>
          </ul>
        </div>
      
        <div className="box">
          <span className="filter-header">
            rating
          </span>
          <ul className="filter-list">
            <li>
              <div className="group-checkbox">
                <input type="checkbox" id="remember1" />
                <label htmlFor="remember1">
                  <span className="rating">
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                  </span>
                  <i className="bx bx-check" />
                </label>
              </div>
            </li>
            <li>
              <div className="group-checkbox">
                <input type="checkbox" id="remember1" />
                <label htmlFor="remember1">
                  <span className="rating">
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                    <i className="bx bx-star" />
                  </span>
                  <i className="bx bx-check" />
                </label>
              </div>
            </li>
            <li>
              <div className="group-checkbox">
                <input type="checkbox" id="remember1" />
                <label htmlFor="remember1">
                  <span className="rating">
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                    <i className="bx bx-star" />
                    <i className="bx bx-star" />
                  </span>
                  <i className="bx bx-check" />
                </label>
              </div>
            </li>
            <li>
              <div className="group-checkbox">
                <input type="checkbox" id="remember1" />
                <label htmlFor="remember1">
                  <span className="rating">
                    <i className="bx bxs-star" />
                    <i className="bx bxs-star" />
                    <i className="bx bx-star" />
                    <i className="bx bx-star" />
                    <i className="bx bx-star" />
                  </span>
                  <i className="bx bx-check" />
                </label>
              </div>
            </li>
            <li>
              <div className="group-checkbox">
                <input type="checkbox" id="remember1" />
                <label htmlFor="remember1">
                  <span className="rating">
                    <i className="bx bxs-star" />
                    <i className="bx bx-star" />
                    <i className="bx bx-star" />
                    <i className="bx bx-star" />
                    <i className="bx bx-star" />
                  </span>
                  <i className="bx bx-check" />
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="col-9 col-md-12">
        <div className="box filter-toggle-box">
          <button className="btn-flat btn-hover" id="filter-toggle">filter</button>
        </div>
        {/* {loading?<LoadingBox></LoadingBox>:
          error?<MessageBox variant="danger">{error}</MessageBox>:( */}
        <div className="box">

          <div className="row" id="products" >
              {/* Products list here */}
            {
              products.map((product)=>(
                <ProductItem key={product.id} product={product}></ProductItem>
              )
              )}
                 
            </div>        
        </div>
          {/* )} */}

        <div className="box">
          <ul className="pagination">
            <li><a href="#"><i className="bx bxs-chevron-left" /></a></li>
            <li><a href="#" className="active">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">4</a></li>
            <li><a href="#">5</a></li>
            <li><a href="#"><i className="bx bxs-chevron-right" /></a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>

        </>
    )
}
export default ListProductScreen;