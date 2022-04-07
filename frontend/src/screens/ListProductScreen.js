import  Axios  from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { listProductsByBrand } from "../actions/brandActions";
import { listProductByCategory } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import ProductItem from "../components/Product-item";

const ListProductScreen =()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate;
    const location = useLocation();
    const {id: brandId}= useParams();
    const brandListProduct=useSelector(state => state.brandListProduct);
    const {loading,error, products, totalPages, page}= brandListProduct;
    const pages =[...Array(totalPages).keys()];
    const pageNumber = location.search.split('?page=')[1];



    const [priceMin, setPriceMin]= useState(0);
    const [priceMax, setPriceMax]= useState(1000);
    // const [products, setProducts]= useState([])
    const [categories,setCategories]= useState([]);
    const [categoryId, setCategoryId]= useState(0);
    const [featured,setFeatured]= useState(false);
    const [inStock,setInStock]= useState(false);
    console.log(products);

    // useEffect(()=>{
    //   async function listProducts(){
        
    //     const res= await Axios.get(`/api/brands/${brandId}`,{
    //       params:{
    //         category:`${categoryId}`,
    //         min:`${priceMin}`,
    //         max:`${priceMax}`,
    //         featured:`${featured}`,
    //         inStock: `${inStock}`,
    //       }
    //     });
    //     let products= res.data;
    //     setProducts(products)
    //   }
    //   listProducts()
    // },[brandId, priceMax, priceMin, categoryId, featured, inStock])

    // useEffect(() => {
    //   async function listProducts(){
    //     if(categoryId === undefined && !featured || categoryId ===''){
    //         const res= await Axios.get(`/api/brands/${brandId}`);
    //         let products= res.data;
    //         console.log('1',res.data);
    //         setProducts(products)
    //         // dispatch(listProductsByBrand())
    //         // setProducts(productsListBrand);
    //     }
    //     else if(categoryId === undefined && featured){
    //       let res = await Axios.get(`/api/brands/checked/${brandId}`,{
    //         params:{
    //           q:`${Number(featured)}`
    //         }
    //       })
    //       let products = res.data;
    //       setProducts(products)
    //     }
    //     else{
    //       const res= await Axios.get(`/api/brands/find/${brandId}`,{
    //             params:{
    //               q:`${categoryId}`
    //             }
    //           });
    //           console.log('cate',categoryId)
    //           let products= res.data;
    //           console.log(products)
    //           setProducts(products);

    //     }
    //   }
    //   listProducts();

      
    // },[categoryId, featured, brandId]);
    useEffect(()=>{
      dispatch(listProductsByBrand(brandId, priceMax, priceMin, categoryId, featured, inStock))
    },[dispatch,brandId, priceMax, priceMin, categoryId, featured, inStock, ])


    useEffect(() => {
      async function getCategories(){
        let res = await Axios.get('/api/categories/');
        let categories = res.data;
        setCategories(categories);
        //return categories;
      }
      getCategories();
    },[]);
    
    
    const resetCategoryId=()=>{
      setCategoryId([])
    }
    console.log(featured)
    return(
        <>
<div className="bg-main">
</div>
      <div className="container">
  <div className="box">
    <div className="breadcumb">
      <Link to="/">home</Link>
      <span><i className="bx bxs-chevrons-right" /></span>
      <span onClick={resetCategoryId} style={{cursor:'pointer'}}>All products</span>
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
                <li key={index} value={item.id} onClick={(e)=>setCategoryId(e.target.value)}  style={{cursor:'pointer'}} className={categoryId === item.id ? 'active_category':' '}>{item.category_name}</li>
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
                <input type="checkbox" id="status1" value={inStock} onChange={(e) =>setInStock(e.target.checked)}/>
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
      
        {/* <div className="box">
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
        </div> */}
      </div>
      <div className="col-9 col-md-12">
        <div className="box filter-toggle-box">
          <button className="btn-flat btn-hover" id="filter-toggle">filter</button>
        </div>
        {loading?<LoadingBox></LoadingBox>:
          error?<MessageBox variant="danger">{error}</MessageBox>:(
        <div className="box">

          <div className="row" id="products" >
              {/* Products list here */}
            {
              products.products.map((product)=>(
                <ProductItem key={product.id} product={product}></ProductItem>
              )
              )}
                 
            </div>        
        </div>
          )}

<div className="box">
                  <ul className="pagination">
                  {/* {pages.map((x) => (
                  <Link
                    className={x + 1 === products.page ? 'active' : ''}
                    // key={x + 1}
                    // to={getFilterUrl({ page: x + 1 })}
                  >
                    {x + 1}
                  </Link>
               ))}  */}
                  <li><Link to="#"><i className="bx bxs-chevron-left" /></Link></li>

                {
                  pages.map((x)=>(
                    
                      <li ><Link
                            // to={handlePage({page: x + 1})}
                            className={x + 1 === page ? 'active' : ''}
                            key={x + 1}
                            to={`/listproduct/${brandId}?page=${x+1}`}
                          >
                            {x+1}
                        </Link>
                      </li>

                    

                  ))
                }
                  <li><Link to="#"><i className="bx bxs-chevron-right" /></Link></li>

                    
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