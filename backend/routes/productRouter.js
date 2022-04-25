import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import {Product, Brand, Category, OrderDetail} from '../models/index.js'
// import Category from '../models/categoryModel.js';
import { isAuth, isAdmin } from "../utils.js";
import {Sequelize} from "sequelize";
import path from 'path';

import db from '../config/database.js';
const {Op}= Sequelize;

// import ProductController from "../controllers/productController.js";

const productRouter=express.Router();
productRouter.get('/featured', expressAsyncHandler(async(req, res)=>{
  const pageSize = 8;
  const page = Number(req.query.page) ||1;
  console.log('page',req.query.page)


  const products = await Product.findAndCountAll({
   

    include: [
      {
       model: Brand,
       required: false,
       // attribute: ['brand_id']
      },
      {
       model: Category,
       required: false,
      },
     
   ],
   where: {
    featured:true
  },
  limit: pageSize,
  offset: pageSize * (page - 1),

  });
  if(products){
    res.send({
      products:products.rows,
      totalPages:Math.ceil(products.count/pageSize),
      page
      })
  }else{
    res.send({ message: 'Product Not Found' })
  }
}))
productRouter.get('/', expressAsyncHandler(async(req, res)=>{
  const pageSize = 8;
  const page = Number(req.query.page) ||1;
  console.log('page',req.query.page)
  
  const products = await Product.findAndCountAll({
    limit: pageSize,
    offset: pageSize * (page - 1),
    where: {

    },

    include: [
      {
       model: Brand,
       required: false,
       // attribute: ['brand_id']
      },
      {
       model: Category,
       required: false,
      },
   ],


  });
  res.send({
    products:products.rows,
    totalPages:Math.ceil(products.count/pageSize),
    page
    })
}))


productRouter.get('/find',expressAsyncHandler(async (req, res) => {
            console.log('123',req.query.q)
            const products= await Product.findAll({
                include: [
                   {
                    model: Brand,
                    as: 'brand',
                    required: false,
                    where: {
                      brand_name:{
                        [Op.like]: `%${req.query.q}%`
                    },
                    }
                    // attribute: ['brand_id']
                   },
                   {
                    model: Category,
                    required: false,
                   },
                ],
                where: {
                  [Op.or]:[
                    {
                      product_name:{
                        [Op.like]: `%${req.query.q}%`
                      },
                    },
                    {
                      
                       '$brand.brand_name$': { [Op.like]: `%${req.query.q}%` }                       
                    }
                   
                  ]
                
              },
            })
            res.send(products)
}))

productRouter.get('/seed', expressAsyncHandler(async(req, res)=>{
    const createdProducts = await Product.build(data.products);
    // await createdProducts.save()
    res.send({createdProducts})
}))
productRouter.get('/:id', expressAsyncHandler(async(req, res)=>{
    const product = await Product.findOne({
        where: {id: req.params.id},
        include: [
            {
             model: Brand,
             required: false,
             where: {
                 // is_valid:1,
                 // is_vertify:1
             }
             // attribute: ['brand_id']
            },
        ]
    })
    if(product){
        res.send(product);
        console.log(product);
    }else{
        res.status(404).send({message:'Product Not Found'})

    }
}))
productRouter.post(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {

      const product = new Product({
        product_name: req.body.product_name ||product.product_name,
        // image: req.file.path,
        image: req.body.image,
        countInStock: req.body.countInStock,
        old_price: req.body.old_price,
        price: req.body.price,
        featured: req.body.featured,
        product_description: req.body.product_description,
        category_id: req.body.category_id,
        brand_id: req.body.brand_id,
      });
      const createdProduct = await product.save();
      res.send({ message: 'Product Created', product: createdProduct });
    })
  );
productRouter.patch(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      console.log(req.params.id)
      const product = await Product.findByPk( req.params.id);
      console.log('aaaaaaaaa', req.body)
      if (product) {
        product.product_name = req.body.product_name;
        product.image = req.body.image;
        product.countInStock = req.body.countInStock;
        product.old_price = req.body.old_price;
        product.price = req.body.price;
        // product.rating= req.body.rating;
        // product.numReviews = req.body.numReviews;
        product.featured= req.body.featured;
        product.product_description = req.body.product_description;
        product.category_id = req.body.category_id;
        product.brand_id = req.body.brand;
        const updatedProduct = await product.save();
        res.send({ message: 'Product Updated', product: updatedProduct });
      } else {
        res.status(404).send({ message: 'Product Not Found' });
      }
    })
  );
  
productRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const product = await Product.findOne({
        where: {id: req.params.id},
        include: [
            {
             model: Brand,
             required: false,
             // attribute: ['brand_id']
            },
            
            {
              model: OrderDetail,
             required: false,
            }
        ]
      });
      console.log(product);
      if (product && product.orderDetail === null) {
        const deleteProduct = await product.destroy();
        res.send({ message: 'Product Deleted', product: deleteProduct });
      } else {
        res.status(404).send({ message: 'Product Not Found or Product is ordered' });
      }
    })
  );
export default productRouter;