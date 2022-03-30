import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Blog from '../components/Blog';
import ProductItem from '../components/Product-item';
import Promotion from '../components/Promotion';
import Slider from '../components/Slider';
import Axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
const HomeScreen =()=>{
  const dispatch = useDispatch()
  // const productList = useSelector((state) => state.productList);
  // const {loading, error, products} = productList;
  const [products, setProducts]=useState([])
 
  useEffect(() =>{
    async function getProducts() {
      let res = await Axios.get('/api/products/featured')
      let products = res.data;
      setProducts(products);
    }
    getProducts();
  },[]);
    // useEffect(() => {
    //   dispatch()
    // },[dispatch])
  console.table(products)
    return(
        <>
        
        <Slider/>
        {/* end hero section */}
        {/* promotion section */}
        <Promotion />
        {/* end promotion section */}
        {/* product list */}
        <div className="section">
          <div className="container">
            <div className="section-header">
              <h2>Featured Products</h2>
            </div>
            {/* {loading?<LoadingBox></LoadingBox>:
          error?<MessageBox variant="danger">{error}</MessageBox>:
          ( */}
              <div className="row" id="latest-products">
                  {
                    products.map((product,index) =>
                     (
                      <ProductItem key={product.id} product={product}></ProductItem>
                   )
                   )}
              </div>
            {/* )} */}
            <div className="section-footer">
              <Link to="./products.html" className="btn-flat btn-hover">view all</Link>
            </div>
      
          </div>
        </div>
        {/* end product list */}
        {/* special product */}
        <div className="bg-second">
          <div className="section container">
            <div className="row">
              <div className="col-4 col-md-4">
                <div className="sp-item-img">
                  <img src="./images/Chanel_nuochoa_1.png" alt="" />
                </div>
              </div>
              <div className="col-7 col-md-8">
                <div className="sp-item-info">
                  <div className="sp-item-name">Chanel Chance Eau Tendre Eau de Toilette</div>
                  <p className="sp-item-description">
                  Thứ vũ khí mạnh nhất của một người phụ nữ nằm ở sự dịu dàng của họ, và cách tốt nhất để trình diễn sự dịu dàng ấy chính là qua mùi hương...</p>                  <Link to='/product/9' className="btn-flat btn-hover">shop now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end special product */}
        {/* product list */}
        {/* <div className="section">
          <div className="container">
            <div className="section-header">
              <h2>Chanel</h2>
            </div>
            <div className="row" id="best-products">
              <div className="col-3 col-md-6 col-sm-12">
                <div className="product-card">
                  <div className="product-card-img">
                    <img src="./images/Chanel_nuochoa_3.png" alt="" />
                  </div>
                  <div className="product-card-info">
                    <div className="product-btn">
                      <button className="btn-flat btn-hover btn-shop-now">shop now</button>
                      <button className="btn-flat btn-hover btn-cart-add">
                        <i className="bx bxs-cart-add" />
                      </button>
                      <button className="btn-flat btn-hover btn-cart-add">
                        <i className="bx bxs-heart" />
                      </button>
                    </div>
                    <div className="product-card-name">
                      JBL Quantum 400
                    </div>
                    <div className="product-card-price">
                      <span><del>$300</del></span>
                      <span className="curr-price">$200</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="section-footer">
              <Link to="./products.html" className="btn-flat btn-hover">view all</Link>
            </div>
          </div>
        </div> */}
        {/* end product list */}
        {/* blogs */}
        <Blog />
        {/* end blogs */}
        {/* footer */}
        </>
    )
}
export default HomeScreen;