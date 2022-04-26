import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import {Product, Brand, User,Comment} from '../models/index.js';
import {Sequelize} from "sequelize";
import { isAdmin, isAuth } from "../utils.js";

const commentRouter = express.Router();
commentRouter.get('/:id', expressAsyncHandler(async(req,res)=>{
    const comments = await Comment.findAll({
        where: {
            product_id: req.params.id
        },
        include: [
        {
            model: Product,
            required: false,
          
        },
        {
            model: User,
            required: false,
          
        },

    ]
    })
    res.send(comments)
}))
commentRouter.post(
    '/',
    isAuth, 
    expressAsyncHandler(async(req,res)=>{
    console.log('aaaa',req.body)
    const comment = new Comment({
        comment_content: req.body.comment_content,//||comment.comment_content,
        user_id: req.body.user_id,//||comment.user_id,
        product_id: req.body.product_id,//||comment.product_id,
    })
    const createdComment = await comment.save();
    res.send({ message: 'Comment created', comment: createdComment });
}))
commentRouter.get(
    '/',
    // isAuth,
    // isAdmin,
    expressAsyncHandler(async(req,res)=>{
        const comments = await Comment.findAll({
            // order: [
            //     ["product_id", "ASC"],
            // ],
            order:Sequelize.literal("product_id","ASC")

        })
        res.send({comments})
    })
)
export default commentRouter;