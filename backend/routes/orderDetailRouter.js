import express from "express";
import expressAsyncHandler from "express-async-handler";
import { OrderDetail } from "../models/index.js";
import { isAuth } from "../utils.js";

const orderDetailRouter= express.Router();
orderDetailRouter.post('/', expressAsyncHandler(async(req, res)=>{
    const orderDetail= new OrderDetail({
        name: req.body.orderItems.product_name,
        qty: req.body.orderItems.qty,
        image: req.body.orderItems.image,
        price: req.body.orderItems.price,
        product_id: req.body.orderItems.product
    })
    const createdOrderDetail = await orderDetail.save();
    res.status(201).send({message:'New shipping address',orderItems: createdOrderDetail});

}))
export default orderDetailRouter;