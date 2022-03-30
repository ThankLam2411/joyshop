import {Link, BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AdminRoute from './components/AdminRoute';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import ProductItem from './components/Product-item';
import Promotion from './components/Promotion';
import Slider from './components/Slider';
import data from './data';
import BlogDetailScreen from './screens/BlogDetailScreen';
import CartScreen from './screens/CartScreen';
import DashboardScreen from './screens/DashboardScreen';
import HomeScreen from './screens/HomeScreen';
import ListBlogScreen from './screens/ListBlogScreen';
import ListOrderHistoryScreen from './screens/ListOrderHistoryScreen';
import ListProductScreen from './screens/ListProductScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductCreateScreen from './screens/ProductCreateScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import SearchScreen from './screens/SearchScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import UserEditScreen from './screens/UserEditScreen';
import UserListScreen from './screens/UserListScreen';
function App() {
  return (
<Router>
    <div>
      <Header/>
    {/* end header */}
    {/* hero section */}
    <main>
      <Routes>
      <Route
              path="/blog/:id"
              element={<BlogDetailScreen/>}
              exact
        ></Route>
      <Route
              path="/blogs"
              element={
                <AdminRoute>
                  <ListBlogScreen />
                </AdminRoute>
              }
            />
    
      <Route
              path="/dashboard"
              element={
                <AdminRoute>
                  <DashboardScreen />
                </AdminRoute>
              }
            />
      <Route
              path="/user/:id/edit"
              element={
                <AdminRoute>
                  <UserEditScreen />
                </AdminRoute>
              }
            />
      <Route
              path="/userlist"
              element={
                <AdminRoute>
                  <UserListScreen />
                </AdminRoute>
              }
            />
      <Route
              path="/orderlist"
              element={
                <AdminRoute>
                  <ListOrderHistoryScreen />
                </AdminRoute>
              }
            />
      <Route
              path="/productlist"
              element={
                <AdminRoute>
                  <ProductListScreen />
                </AdminRoute>
              }
            />
          <Route path="/product/create" element= {<ProductCreateScreen/>}></Route>
        <Route
              path="/product/:id/edit"
              element={<ProductEditScreen/>}
              exact
        ></Route>
        <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfileScreen />
                </PrivateRoute>
              }
            />      
        <Route path="/search" element={<SearchScreen />}></Route>  
        <Route path="/orderhistory" element={<OrderHistoryScreen/>}></Route>
        <Route path="/listproduct/:id" element={<ListProductScreen/>}></Route>
        <Route path="/order/:id" element={<OrderScreen/>}></Route>
        <Route path="/placeorder" element={<PlaceOrderScreen/>}></Route>
        <Route path="/payment" element={<PaymentMethodScreen/>}></Route>
        <Route path="/signin/shipping" element={<ShippingAddressScreen/>}></Route>
        <Route path="/shipping" element={<ShippingAddressScreen/>}></Route>
        <Route path="/register" element={<RegisterScreen/>}></Route>
        <Route path="/signin" element={<SigninScreen/>}></Route>
        <Route path="/cart/:id" element={<CartScreen/>}></Route>
        <Route path="/cart" element ={<CartScreen/>}></Route>
        <Route path="/product/:id" element={<ProductScreen/>}></Route>
        <Route exact path="/" element={<HomeScreen/>} ></Route>
      </Routes>
    </main>
    <footer className="bg-second">
      <div className="container">
        <div className="row">
          <div className="col-3 col-md-6">
            <h3 className="footer-head">Products</h3>
            <ul className="menu">
              <li><Link to="#">Help center</Link></li>
              <li><Link to="#">Contact us</Link></li>
              <li><Link to="#">product help</Link></li>
              <li><Link to="#">warranty</Link></li>
              <li><Link to="#">order status</Link></li>
            </ul>
          </div>
          <div className="col-3 col-md-6">
            <h3 className="footer-head">services</h3>
            <ul className="menu">
              <li><Link to="#">Help center</Link></li>
              <li><Link to="#">Contact us</Link></li>
              <li><Link to="#">product help</Link></li>
              <li><Link to="#">warranty</Link></li>
              <li><Link to="#">order status</Link></li>
            </ul>
          </div>
          <div className="col-3 col-md-6">
            <h3 className="footer-head">support</h3>
            <ul className="menu">
              <li><Link to="#">Help center</Link></li>
              <li><Link to="#">Contact us</Link></li>
              <li><Link to="#">product help</Link></li>
              <li><Link to="#">warranty</Link></li>
              <li><Link to="#">order status</Link></li>
            </ul>
          </div>
          <div className="col-3 col-md-6 col-sm-12">
            <div className="contact">
              <h3 className="contact-header">
                JOYSHOP
              </h3>
              <ul className="contact-socials">
                <li><Link to="#">
                    <i className="bx bxl-facebook-circle" />
                  </Link></li>
                <li><Link to="#">
                    <i className="bx bxl-instagram-alt" />
                  </Link></li>
                <li><Link to="#">
                    <i className="bx bxl-youtube" />
                  </Link></li>
                <li><Link to="#">
                    <i className="bx bxl-twitter" />
                  </Link></li>
              </ul>
            </div>
            <div className="subscribe">
              <input type="email" placeholder="ENTER YOUR EMAIL" />
              <button>subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
    {/* end footer */}
  
  </div>
</Router>

  );
}

export default App;
