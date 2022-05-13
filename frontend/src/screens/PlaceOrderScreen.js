import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createOrder, createOrderDetail } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Axios  from 'axios';

export default function PlaceOrderScreen(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const ship= useSelector(state => state.shippingAddress);
  const {shippingAddress}= ship;
 
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo}= userSignin;
  console.log(userInfo);
  
  console.log('ship', ship)
  
  if (!cart.paymentMethod) {
    navigate('/payment');
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  console.log('cart',cart)
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.1 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
 
 const placeOrderHandler = async () => {
     dispatch(createOrder({...ship,...cart, orderItems: cart.cartItems }));
    try{
      const {data} = await Axios.post('/send_mail',{shippingAddress, cart, email:userInfo.user_email})
      return data;
    }catch(error){
      console.log(error);
    }
  };
  console.log('aaaaaaaaaa',{...shippingAddress,...cart, orderItems: cart.cartItems })
  useEffect(() => {
    if (success) {
      navigate(`/order/${order.id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, navigate, success]);
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row top">
        <div className="cart-col-2 l-8">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Địa chỉ</h2>
                <p>
                  <strong>Họ tên:</strong> {shippingAddress?.shippingAddress?.fullName} <br />
                  <strong>Địa chỉ: </strong> {shippingAddress?.shippingAddress?.address}, {shippingAddress?.shippingAddress?.city}, {shippingAddress?.shippingAddress?.postalCode}
                  , {shippingAddress?.shippingAddress?.country}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Thanh toán</h2>
                <p>
                  <strong>Phương thức:</strong> {cart.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Sản phẩm đã đặt</h2>
                <ul>
                  {cart.cartItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.product_name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="cart-col-1 l-4">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Tổng đơn hàng</h2>
              </li>
              <li>
                <div className="row">
                  <div>Giá tổng sản phẩm</div>
                  <div>${cart.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Phí vận chuyển</div>
                  <div>${cart.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Thuế</div>
                  <div>${cart.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>Tổng giá trị đơn hàng</strong>
                  </div>
                  <div>
                    <strong>${cart.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="submit"
                  onClick={placeOrderHandler}
                  className="signin primary order-btn"
                  disabled={cart.cartItems.length === 0}
                >
                  Đặt hàng
                </button>
              </li>
              {/* {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>} */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
