import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {  detailsOrder, PayOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_PAY_RESET } from '../constants/orderConstants';
// import {
//   ORDER_DELIVER_RESET,
//   ORDER_PAY_RESET,
// } from '../constants/orderConstants';

export default function OrderScreen(props) {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: orderId } = params;
  const [sdkReady, setSdkReady] = useState(false)
  const ship= useSelector((state) => state.shippingAddress)
  const {shippingAddress}= ship
  console.log(shippingAddress)

  const orderDetails = useSelector(state => state.orderDetails);
  const { loading, error, order } = orderDetails;
  console.log(order)
  const orderPay= useSelector(state => state.orderPay)
  const {error: errorPay, success:successPay, loading:loadingPay}= orderPay
  useEffect(() => {
     const addPayPalScript = async () => {
      const { data } = await Axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (
          !order ||
          successPay||
          (order && order.id !== orderId)
        ) {
      dispatch({type: ORDER_PAY_RESET})
      dispatch(detailsOrder(orderId))
        }
        else {
              if (!order.isPaid) {
                if (!window.paypal) {
                  addPayPalScript();
                } else {
                  setSdkReady(true);
                }
              }
            }
  },[])
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  console.log(order);
  const successPaymentHandler=(paymentResult)=>{
    dispatch(PayOrder(order,paymentResult))

  }
  
  return loading?(<LoadingBox></LoadingBox>): error?(<MessageBox variant="danger">{error}</MessageBox>) :(
    <>
       <div>
      <h1>Order {order.id}</h1>
      <div className="row top">
        <div className="cart-col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Địa chỉ</h2>
                <p>
                  <strong>Họ tên:</strong> {shippingAddress.shippingAddress.fullName} <br />
                  <strong>Địa chỉ: </strong> {shippingAddress.shippingAddress.address},{' '}
                  {shippingAddress.shippingAddress.city},{' '}
                  {shippingAddress.shippingAddress.postalCode},{' '}
                  {shippingAddress.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Giao hàng lúc {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Chưa giao hàng</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Thanh toán</h2>
                <p>
                  <strong>Phương thức:</strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Thanh toán lúc {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Chưa thanh toán</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Sản phẩm đã đặt</h2>
                <ul>
                  {order.orderDetails.map((item)=>(
                     <li key={item.id}>
                     <div className="row">
                       <div>
                         <img
                           src={item.image}
                           alt={item.name}
                           className="small"
                         ></img>
                       </div>
                       <div className="min-30">
                         <Link to={`/product/${item.product_id}`}>
                           {item.name}
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
        <div className="cart-col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Tổng đơn hàng</h2>
              </li>
              <li>
                <div className="row">
                  <div>Giá tổng sản phẩm</div>
                  <div>${order.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Phí vận chuyển</div>
                  <div>${order.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Thuế</div>
                  <div>${order.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Tổng giá trị đơn hàng</strong>
                  </div>
                  <div>
                    <strong>${order.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              {
                order.paymentMethod === "paylater" ?(<></>)
                :(<>
                {!order.isPaid && (
                <li>
                  {sdkReady ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <>
                     {errorPay && (<MessageBox variant='danger'>{errorPay}</MessageBox>)}
                     {loadingPay &&(<LoadingBox></LoadingBox>)}
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      ></PayPalButton>
                    </>
                  )}
                </li>
              )}
                </>)
              }
              
              {/* {userInfo.isAdmin && order.isPaid && !order.isDelivered && ( */}
                {/* <li> */}
                  {/* {loadingDeliver && <LoadingBox></LoadingBox>}
                  {errorDeliver && (
                    <MessageBox variant="danger">{errorDeliver}</MessageBox>
                  )} */}
                  {/* <button
                    type="button"
                    className="signin primary order-btn"
                    // onClick={deliverHandler}
                  >
                    Deliver Order
                  </button>
                </li> */}
              {/* )} */}
            </ul>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}