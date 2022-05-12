import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import {Product, Brand, Category, OrderDetail, Comment} from '../models/index.js'
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
  const category = !(req.query.category) || req.query.category === 'undefined' || Number(req.query.category) ===0 ||(req.query.category) ==='NaN'  ? '%%': Number(req.query.category)  ;
  const brand = !(req.query.brand) || (req.query.brand) === 'undefined' || Number(req.query.brand) ===0 ||(req.query.brand) ==='NaN'  ? '%%': Number(req.query.brand)  ;
  const min =
    req.query.min==='undefined' || Number(req.query.min) === 0 || req.query.min === 'NaN' || req.query.min === NaN  || typeof req.query.min === 'undefined'
    ? 0 
    : Number(req.query.min);

  const max =
  req.query.max==='undefined' || Number(req.query.max) === 0 || req.query.max === 'NaN'  || req.query.max === NaN   || typeof req.query.max === 'undefined'
  ? 1000 
  : Number(req.query.max);
<<<<<<< .merge_file_a10916
  console.log('page',page);
  const featured =  Boolean(req.query.featured) === 0 || String(req.query.featured) === 'true'   ?  1: '%%';
  const order= !req.query.order||req.query.order === 'undefined' ? '' :req.query.order;
  const field = req.query.order === undefined || req.query.order === 'DEFAULT' || req.query.order === 'undefined' || !req.query.order? 'id': 'price' ;
  const off = pageSize * (page - 1);

=======
  console.log('order',typeof req.body.order);
  const featured =  Boolean(req.query.featured) === 0 || String(req.query.featured) === 'true'   ?  1: '%%';
  const order= !req.query.order||req.query.order === 'undefined' ? '' :req.query.order;
  const field = req.query.order === 'undefined'|| req.query.order === undefined || req.query.order === 'DEFAULT' || typeof req.body.order === 'undefined' ? 'id':'price';
  console.log('field', field);
>>>>>>> .merge_file_a06748
  const inStock = Boolean(req.query.inStock) === 1 || String(req.query.inStock) === 'true'? 1 : 0;
  // const rating =
  // req.query.rating && Number(req.query.rating) !== 0 || req.query.rating !== 'undefined' || req.query.rating !== undefined
  //   ? Number(req.query.rating)
  //   : 0;
  console.log('field', field);
  console.log('req', req.query.order);
  const rating = req.query.rating === undefined || req.query.rating === 'undefined'|| !req.query.rating ? 0: Number(req.query.rating);

  if(rating ===0 ){
    console.log(111111111);
    let products= await db.sequelize.query(
        `
        SELECT p.*, b.brand_name, ca.category_name
        FROM products p 
        left join brand b on b.id= p.brand_id 
        left join category ca on ca.id= p.category_id 
        WHERE p.category_id LIKE :category AND p.brand_id LIKE :brand AND p.price >= :min AND p.price <= :max AND p.featured LIKE :featured AND p.countInStock >= :inStock
        order by p.${field} ${order}
        LIMIT ${pageSize}
        OFFSET ${off}`
    ,
        {
            replacements: { category: category, min: min, max: max, featured: featured, inStock: inStock, rating: rating, brand: brand },

            type: db.sequelize.QueryTypes.SELECT
        }
    )
    let count = await db.sequelize.query(
        `SELECT count(p.id) as count 
        FROM products p 
        WHERE p.category_id LIKE :category
        AND p.brand_id LIKE :brand
        AND p.price >= :min
        AND p.price <= :max
        AND p.featured LIKE :featured
        AND p.countInStock >= :inStock
        `
    ,
        {
            replacements: { category: category, min: min, max: max, featured: featured, inStock: inStock, brand: brand  },

            type: db.sequelize.QueryTypes.SELECT
        }
    )
    let totalPages = count.reduce((a,b)=>a+b.count,0)
    console.log(totalPages);

    res.send({
        products:products,
        totalPages:Math.ceil(totalPages/pageSize),
        page
        })
}else{
    console.log(222222222222);

    let products= await db.sequelize.query(
        `
        SELECT * FROM(
          SELECT p.*,  avg(c.rating) as rating ,count(c.id) as numReviews 
          FROM products p
          LEFT JOIN comment c ON c.product_id= p.id  
          WHERE p.category_id LIKE :category
          AND p.brand_id LIKE :brand
          AND p.price >= :min
          AND p.price <= :max
          AND p.featured LIKE :featured
          AND p.countInStock >= :inStock
          GROUP BY c.product_id) n
       
        where n.rating >= :rating
        order by n.${field} ${order}
        LIMIT ${pageSize}
        OFFSET ${off}
                  
            `
    ,
        {
            replacements: { category: category,brand: brand, min: min, max: max, featured: featured, inStock: inStock, rating: rating },

            type: db.sequelize.QueryTypes.SELECT
        }
    )
    let count = await db.sequelize.query(
        `SELECT count(b.id) as count FROM
            (SELECT p.*,  avg(c.rating) as rating ,count(c.id) as numReviews 
                        FROM products p
                        LEFT JOIN comment c ON c.product_id= p.id  
                        WHERE p.category_id LIKE :category
                        AND p.brand_id LIKE :brand
                        AND p.price >= :min
                        AND p.price <= :max
                        AND p.featured LIKE :featured
                        AND p.countInStock >= :rating
                        GROUP BY c.product_id
                        LIMIT ${pageSize}
                        OFFSET ${off}) b 
            
            where b.rating >= :rating;   
        `
    ,
        {
            replacements: { category: category, brand:brand, min: min, max: max, featured: featured, inStock: inStock, rating: rating },

            type: db.sequelize.QueryTypes.SELECT
        }
    )
    let totalPages = count.reduce((a,b)=>a+b.count,0)
    console.log(totalPages);

    res.send({
        products:products,
        totalPages:Math.ceil(totalPages/pageSize),
        page
    })
}
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
             },
             
            },
            {
              model: Comment,
              attributes: [
                [Sequelize.fn('COUNT', Sequelize.col('comments.id')), 'numReviews'],
                [Sequelize.fn('AVG', Sequelize.col('comments.rating')), 'rating']

              ]
            }
        ],
        group: ['products.id']

    })
    if(product){
        res.send(product);
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