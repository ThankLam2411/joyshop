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
import  {listProducts}  from '../actions/productActions';
const HomeScreen =()=>{
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const {loading, error, products} = productList;
  // const [products, setProducts]=useState([])
 
  // useEffect(() =>{
  //   async function getProducts() {
  //     let res = await Axios.get('/api/products/')
  //     let products = res.data;
  //     setProducts(products);
  //   }
  //   getProducts();
  // },[]);
  useEffect(() => {
    dispatch(listProducts({}))
  },[dispatch])

  console.log(products)
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
                    products.products.map((product,index) =>
                     (
                      <ProductItem key={product.id} product={product}></ProductItem>
                   )
                   )}
              </div>
          {/* )} */}
              <div className="box">
                  <ul className="pagination">
                    <li><Link to="#"><i className="bx bxs-chevron-left" /></Link></li>
                    <li><Link to="#" className="active">1</Link></li>
                    <li><Link to="#">2</Link></li>
                    <li><Link to="#">3</Link></li>
                    <li><Link to="#">4</Link></li>
                    <li><Link to="#">5</Link></li>
                    <li><Link to="#"><i className="bx bxs-chevron-right" /></Link></li>
                  </ul>
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
       
        <Blog />
        </>
    )
}
export default HomeScreen;