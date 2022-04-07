import {Link, BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AdminRoute from './components/AdminRoute';
import Footer from './components/Footer';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import ProductItem from './components/Product-item';
import Promotion from './components/Promotion';
import Slider from './components/Slider';
import data from './data';
import BlogDetailScreen from './screens/BlogDetailScreen';
import BlogScreen from './screens/BlogScreen';
import CartScreen from './screens/CartScreen';
import ContactScreen from './screens/ContactScreen';
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
              path="/bloglist"
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
        <Route path="/contact" element={<ContactScreen />}></Route>  
        <Route path="/blog" element={<BlogScreen />}></Route>  

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
   <Footer />
    {/* end footer */}
  
  </div>
</Router>

  );
}

export default App;
