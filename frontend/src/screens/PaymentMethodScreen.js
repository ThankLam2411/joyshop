import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentMethodScreen=()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const ship= useSelector(state => state.shippingAddress);
    // const {shippingAddress}= ship;
    // if(!shippingAddress){
    //     navigate('/shipping');
    // }
    const [paymentMethod,setPaymentMethod]= useState('PayPal')
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder')
    }
    return(
        <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Phương thức thanh toán</h1>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="paypal"
              value="PayPal"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="paypal">PayPal</label>
          </div>
        </div>
        <div>
          <div style={{display:'inline-block'}}>
              
            <input
              type="radio"
              id="paylater"
              value="paylater"
              name="paymentMethod"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
        
            <label htmlFor="paylater">Thanh toán khi nhận hàng</label>
          </div>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
    )
}
export default PaymentMethodScreen;