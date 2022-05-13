import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Chart} from 'react-google-charts';
import { summaryOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function DashboardScreen() {
  const orderSummary = useSelector((state) => state.orderSummary);
  const { loading, summary, error } = orderSummary;
  console.log(summary)
  // console.log(summary.users[0].numUsers);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(summaryOrder());
  }, []);
  return (
    <div>
      <div className="row">
        <h1 style={{marginLeft: '15px'}}>Thống kê</h1>
      </div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
          <>
            <ul className="row summary">
            <li>
              <div className="summary-title color1">
                <span>
                  <i className="fa fa-users" /> Thành viên
                </span>
              </div>
              <div className="summary-body">{summary.users[0].numUsers}</div>
            </li>
            <li>
              <div className="summary-title color2">
                <span>
                  <i className="fa fa-shopping-cart" /> Số lượng đơn 
                </span>
              </div>
              <div className="summary-body">
                {summary.orders[0] ? summary.orders[0].numOrders : 0}
              </div>
            </li>
            <li>
              <div className="summary-title color3">
                <span>
                  <i className="fa fa-money" /> Doanh thu
                </span>
              </div>
              <div className="summary-body">
                $
                {summary.orders[0]
                  ? summary?.orders[0].totalSales?.toFixed(2)
                  : 0}
              </div>
            </li>
          </ul>
          <div>
            <div>
              <h2>Doanh thu</h2>
              {summary.dailyOrders.length === 0 ? (
                <MessageBox>Không có đơn hàng</MessageBox>
              ) : (
                <Chart
                  width="100%"
                  height="400px"
                  chartType="AreaChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['Date', 'Sales'],
                    ...summary.dailyOrders.map((x) => [x.id, x.sales]),
                  ]}
                ></Chart>
              )}
            </div>
          </div>
            

          </>
      )}
    </div>
  );
}
