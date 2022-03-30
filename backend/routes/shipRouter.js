import express from "express";
import expressAsyncHandler from "express-async-handler";
import { OrderProduct, OrderDetail,Shipping, User } from "../models/index.js";
import { isAuth } from "../utils.js";

const shipRouter= express.Router();
shipRouter.post('/', expressAsyncHandler(async(req, res)=>{
    const shippingAddress= new Shipping({
                fullName: req.body.fullName,
                phone: req.body.phone,
                address: req.body.address,
                city: req.body.city,
                postalCode: req.body.postalCode,
                country: req.body.country,
    })
    const createdShippingAddress = await shippingAddress.save();
    res.status(201).send({message:'New shipping address',shippingAddress: createdShippingAddress});

}))
export default shipRouter;