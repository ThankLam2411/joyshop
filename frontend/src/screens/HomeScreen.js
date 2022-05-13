import { useEffect, useState } from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import Blog from '../components/Blog';
import ProductItem from '../components/Product-item';
import Promotion from '../components/Promotion';
import Slider from '../components/Slider';
import Axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import  {listFeaturedProducts, listProducts}  from '../actions/productActions';
const HomeScreen =()=>{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // const [pageNumber, setPageNumber]= useState(1)

  const productFeaturedList = useSelector((state) => state.productFeaturedList);
  const {loading, error, products, totalPages, page} = productFeaturedList;
  console.log(products);
  const pageNumber = location.search.split('?page=')[1];
  console.log('currPage',pageNumber);
  console.log('pagedb', page)
  // console.log(location)
  // const {totalPages}= products;

  // const {totalPages}= products;
  // console.log(totalPages)
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
    dispatch(listFeaturedProducts(pageNumber));
    

  },[dispatch, pageNumber])


  // console.log([...Array(totalPages).keys()])
  const pages =[...Array(totalPages).keys()]
//  console.log(products.page)
// const handlePage=(e)=>{
//  e.preventDefault();
//  navigate(`/?page=${page}`)
// }

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
              <h2>Sản phẩm đặc biệt</h2>
            </div>
            {loading?<LoadingBox></LoadingBox>:
          error?<MessageBox variant="danger">{error}</MessageBox>:
          (
              <div className="row" id="latest-products">
                  {
                    products.products.map((product,index) =>
                     (
                      <ProductItem key={product.id} product={product}></ProductItem>
                   )
                   )}
              </div>
          )}
          {/* )} */}
              <div className="box">
                  <ul className="pagination">
                  <li><Link to={`/?page=${page-1}`}><i className="bx bxs-chevron-left" /></Link></li>

                {
                  pages.map((x)=>(
                    
                      <li ><Link
                            // to={handlePage({page: x + 1})}
                            className={x + 1 === page ? 'active' : ''}
                            key={x + 1}
                            to={`/?page=${x+1}`}
                          >
                            {x+1}
                        </Link>
                      </li>

                    

                  ))
                }
                  <li><Link to={`/?page=${page+1}`}><i className="bx bxs-chevron-right" /></Link></li>

                    
                  </ul>
                </div>
            {/* )} */}
            <div className="section-footer">
              <Link to="/listproductall" className="btn-flat btn-hover">xem tất cả</Link>
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
                  Thứ vũ khí mạnh nhất của một người phụ nữ nằm ở sự dịu dàng của họ, và cách tốt nhất để trình diễn sự dịu dàng ấy chính là qua mùi hương...</p>                  
                  <Link to='/product/18' className="btn-flat btn-hover">mua ngay</Link>
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