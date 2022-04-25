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
    const pageSize = 8;
    const page = Number(req.query.page) ||1;
    const min =
        req.query.min && Number(req.query.min) !== 0 && req.query.min !== 'NaN'  ? Number(req.query.min) : 0;

    const max =
        req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 1000;
    const category = !(req.query.category) || (req.query.category) === undefined || Number(req.query.category) ===0 ||(req.query.category) ==='NaN'  ? '%%': Number(req.query.category)  ;
    console.log('cate', (req.query.category) === undefined)
    const featured =  Boolean(req.query.featured) === 0 || String(req.query.featured) === 'true'   ?  1: '%%';
    console.log('Featured',  typeof featured);
    const order= req.query.order ? req.query.order:'';
    // const order ='DESC'
    const inStock = Boolean(req.query.inStock) === 1 || String(req.query.inStock) === 'true'? 1 : 0;

    const products = await Product.findAndCountAll({
        limit: pageSize,
        offset: pageSize * (page - 1),
        where: {
            [Op.and]:[
                {category_id:{[Op.like]:category}},
                {brand_id: req.params.id},
                {price:{[Op.gte]:min}},
                {price:{[Op.lte]:max}},
                {featured: {[Op.like]:featured}},
                {countInStock:{[Op.gte]:inStock}}
                // {category_id: req.query.q},
            ]
            
        },
        include: [{
            model: Category,
            required: false,
           
        }
        ],
    order:Sequelize.literal(`price ${order} `)
    
        
      
    })
    res.send({
        products:products.rows,
        totalPages:Math.floor(products.count/pageSize),
        page
        })
}))
// brandRouter.get('/:id', expressAsyncHandler(async(req, res)=>{
//     const pageSize = 8;
//     const page = Number(req.query.page) ||1;
//     const min =
//         req.query.min && Number(req.query.min) !== 0 && req.query.min !== 'NaN'  ? Number(req.query.min) : 0;

//     const max =
//         req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 1000;
//     // const category = req.query.category && (req.query.category) !== undefined  ? Number(req.query.category): '%%' ;
//     const category = !(req.query.category) || (req.query.category) === undefined || Number(req.query.category) ===0 ||(req.query.category) ==='NaN'  ? '%%': Number(req.query.category)  ;
//     console.log('cate', (req.query.category) === undefined)
//     const featured =  Boolean(req.query.featured) === 0 || String(req.query.featured) === 'true'   ?  1: '%%';
//     console.log('Featured',  typeof featured)
//     const inStock = Boolean(req.query.inStock) === 1 || String(req.query.inStock) === 'true'? 1 : 0;
//     const products = await Product.findAll({
//         // limit: pageSize,
//         // offset: pageSize * (page - 1),
//         where: {
//             [Op.and]:[
//                 {category_id:{[Op.like]:category}},
//                 {brand_id: req.params.id},
//                 {price:{[Op.gte]:min}},
//                 {price:{[Op.lte]:max}},
//                 {featured: {[Op.like]:featured}},
//                 {countInStock:{[Op.gte]:inStock}}
//                 // {category_id: req.query.q},
//             ]
            
//         },
//         include: [{
//             model: Category,
//             required: false,
           
//         }
//         ]
        
      
//     })
//     res.send(products)
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