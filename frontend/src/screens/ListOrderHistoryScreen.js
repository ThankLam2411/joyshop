import  Axios  from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteOrder, listOrderAll } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ORDER_DELETE_RESET } from "../constants/orderConstants";

const ListOrderHistoryScreen=()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const [orders,setOrders] =useState([])
    const orderList = useSelector((state) => state.orderList)
    const {loading, error, orders}= orderList;
    const orderDelete = useSelector((state) => state.orderDelete);
    const {
      loading: loadingDelete,
      error: errorDelete,
      success: successDelete,
    } = orderDelete;
    useEffect(()=>{
        dispatch({ type: ORDER_DELETE_RESET });

        // async function getOrders(){
        //     let res = await Axios.get('/api/orders');
        //     let orders=res.data;
        //     setOrders(orders);
        //     return orders;
          
        //   }
        // getOrders()
      dispatch(listOrderAll())
    },[dispatch, successDelete])
    

    const deleteHandler=(order)=>{
        // e.preventDefault();
        if (window.confirm('Are you sure to delete?')) {
            dispatch(deleteOrder(order.id));
          }
        };
    console.log(orders===[]);
    // if(orders) return null 
    return(
        <>
            <h1>Orders</h1>
             {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : ( 
            <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order?.user?.user_name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'No'}
                </td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => {
                      navigate(`/order/${order.id}`);
                    }}
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(order)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
            </table>
    )} 
        </>
    )
}
export default ListOrderHistoryScreen;