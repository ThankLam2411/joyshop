import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listOrderMine } from "../actions/orderActions";
// import {Moment} from 'react-moment';
import dateFormat, { masks } from "dateformat";

import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const OrderHistoryScreen=()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const orderMineList= useSelector( (state) => state.orderMineList);
    const {loading, error, orders}= orderMineList;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo}= userSignin;
    console.log(userInfo?.id);
    
    useEffect(()=>{
        dispatch(listOrderMine(userInfo?.id))
    },[dispatch, userInfo?.id])
    return(
        <div className="container">
            <h1> Lịch sử đặt hàng</h1>
            {loading? <LoadingBox></LoadingBox>:
            error?<MessageBox variant="danger">{error}</MessageBox>:
            (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Mã đơn đặt hàng</th>
                            <th>Ngày đặt</th>
                            <th>Tổng tiền</th>
                            <th>Thanh toán</th>
                            <th>Vận chuyển</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order)=>(
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    {/* <td><Moment>{order.createdAt}</Moment></td> */}
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid? order.paidAt.substring(0,10): 'No'}</td>
                                    <td>{order.isDelivered? order.deliveredAt.substring(0,10): 'No'}</td>
                                    <td><button 
                                            type="button" 
                                            className="small"
                                            onClick={()=>navigate(`/order/${order.id}`)}
                                            > Xem chi tiết
                                        </button></td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            )
            }
        </div>
    )
}
export default OrderHistoryScreen;