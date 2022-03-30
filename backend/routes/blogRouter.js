import express from "express";
import expressAsyncHandler from "express-async-handler";
import {Product, Blog} from '../models/index.js';
import {Sequelize} from "sequelize";
const {Op}= Sequelize;

import db from '../config/database.js';
// import ProductController from "../controllers/productController.js";

const blogRouter=express.Router();

blogRouter.get('/',expressAsyncHandler(async (req, res) => {
            const blogs= await Blog.findAll({
                include: [
                    {
                        model: Product
                    }
                ]
            })
            res.send(blogs)
   
}))
blogRouter.get('/:id',expressAsyncHandler(async (req, res) => {
    const blogs= await Blog.findAll({
        where: {id: req.params.id},
        include: [
            {
                model: Product
            }
        ]
    })
    res.send(blogs)

}))

blogRouter.patch('/:id',expressAsyncHandler(async (req, res) => {
    const blog= await Blog.findByPk(req.params.id)
    if(blog){
        blog.blog_title= req.body.blog_title;
        blog.blog_content= req.body.blog_content;
        blog.product_id= req.body.product_id;
        const updatedBlog = await blog.save();
        res.send({message:'Blog is updated', blog:updatedBlog});

    }else{
        res.status(404).send({message:'Blog Not Found'})
    }

}))
export default blogRouter;