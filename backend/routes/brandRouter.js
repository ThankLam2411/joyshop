import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import {Product, Brand, Category} from '../models/index.js';
import {Sequelize} from "sequelize";
const {Op}= Sequelize;

import db from '../config/database.js';
// import ProductController from "../controllers/productController.js";

const brandRouter=express.Router();

brandRouter.get('/',expressAsyncHandler(async (req, res) => {
            const brands= await Brand.findAll({})
            res.send(brands)
   
}))

brandRouter.get('/:id', expressAsyncHandler(async(req, res)=>{
    const products = await Product.findAll({
        where: {
            [Op.and]:[
                {brand_id: req.params.id},
                // {category_id: req.query.q},
            ]
            
        },
        include: [{
            model: Category,
            required: false,
           
        }
        ]
        
      
    })
    res.send(products)
}))
// brandRouter.get('/:id', expressAsyncHandler(async(req, res)=>{
//     const product = await Product.findByPk(req.params.id);
//     if(product){
//         res.send(product);
//         console.log(product);
//     }else{
//         res.status(404).send({message:'Product Not Found'})

//     }
// }))

brandRouter.get('/find/:id', expressAsyncHandler(async(req, res)=>{
    const products = await Product.findAll({
        where: {
            [Op.and]:[
                {brand_id: req.params.id},
                {category_id: req.query.q},
            ]
            
        },
        include: [{
            model: Category,
            required: false,
           
        }
        ]
        
      
    })
    if(products){
        res.send(products);
    }else{
        res.status(404).send({message:'Product Not Found'})
        
    }
}))
brandRouter.get('/checked/:id', expressAsyncHandler(async(req, res)=>{
    console.log('qqqq', req.query.q)
    const products = await Product.findAll({
        where: {
            [Op.and]:[
                {brand_id: req.params.id},
                {featured: req.query.q},
            ]
            
        },
        include: [{
            model: Category,
            required: false,
           
        }
        ]
        
      
    })
    if(products){
        res.send(products);
    }else{
        res.status(404).send({message:'Product Not Found'})
        
    }
}))
export default brandRouter;