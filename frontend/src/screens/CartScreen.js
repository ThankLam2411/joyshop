import React, {useEffect, useState} from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import {addToCart, removeFromCart} from '../actions/cartActions'
import MessageBox from "../components/MessageBox";
const CartScreen =()=>{
    const dispatch = useDispatch();
    const {id: productId}= useParams();
    const navigate = useNavigate()
    const location = useLocation();
    const qty = location.search?Number(location.search.split('=')[1]):1;
    const cart = useSelector(state => state.cart);
    const {cartItems}= cart;
   

    useEffect(() =>{
        if(productId){
            dispatch(addToCart(productId,qty));
        }

    },[dispatch,productId,qty])
    const removeFromCartHandler=(id)=>{
        dispatch(removeFromCart(id))
    };
    const checkoutHandler=()=>{
        if (window.confirm('Are you sure to order?')) {
         navigate(`/signin?redirect=shipping`);
        }

        
    }
 return(
     <>
        <div className="row top">
                <div className="cart-col-2">
                    <h2>Shopping Cart</h2>
                    {cartItems.length === 0 ? <MessageBox>
                        Cart is empty. <Link to="/">Go Shopping</Link>
                    </MessageBox>
                    : (
                        <ul>
                            {cartItems.map((item)=>(
                                <li key={item.product}>
                                    <div className="row">
                                        <div className="">
                                            <img src={item.image} alt={item.product_name} className="small"></img>
                                        </div>
                                        <div className="min-30">
                                          <Link to={`/product/${item.product}`}>{item.product_name}</Link>
                                        </div>
                                        <div className="">
                                          
                                        <select
                                            value={item.qty}
                                            onChange={(e) =>
                                                dispatch(
                                                addToCart(item.product, Number(e.target.value))
                                                )
                                            }
                                            >
                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                                </option>
                                            ))}
                                            </select>                                           
                                        </div>
                                        <div className=""> ${item.price}</div>
                                        <div className="">
                                            <button 
                                                type="button"
                                                className="delete-btn"
                                                onClick={() => removeFromCartHandler(item.product)}
                                            >Delete</button>
                                        </div>
                                    </div>
                                 
                                </li>
                            ))}
                        </ul>
                    )}
    
                </div>

                <div className="cart-col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>
                                    Subtotal ({cartItems.reduce((a,c)=> a + c.qty,0)} items) : ${cartItems.reduce((a,c)=> a + c.price * c.qty,0)}
                                </h2>
                            </li>
                            <li>
                                <button type="button" onClick={checkoutHandler} className="cart primary block" disabled={cartItems.length ===0}>Proceed to checkout</button>
                            </li>
                        </ul>
                    </div>
                </div>
        </div>
     </>
 )
}
export default CartScreen;