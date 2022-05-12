import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import {Product, Brand, Category, Comment} from '../models/index.js';
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
    const featured =  Boolean(req.query.featured) === 0 || String(req.query.featured) === 'true'   ?  1: '%%';
<<<<<<< .merge_file_a11824
    const order= req.query.order || req.query.order !== 'DEFAULT' ? req.query.order:'';
    const inStock = Boolean(req.query.inStock) === 1 || String(req.query.inStock) === 'true'? 1 : 0;
    const off = pageSize * (page - 1);
    const field = req.query.order && req.query.order !== 'DEFAULT' ? 'price' : 'id';

=======
    const order= req.query.order ? req.query.order:'';
    const inStock = Boolean(req.query.inStock) === 1 || String(req.query.inStock) === 'true'? 1 : 0;
    const off = pageSize * (page - 1);
>>>>>>> .merge_file_a04712
    const rating =
    req.query.rating && Number(req.query.rating) !== 0
      ? Number(req.query.rating)
      : 0;
    console.log('rating', rating);

    console.log('rating',req.query.rating );
    if(rating ===0){
        console.log(111111111);
        let products= await db.sequelize.query(
            `
            SELECT p.*
            FROM products p 
            WHERE p.category_id LIKE :category
            AND p.brand_id LIKE ${req.params.id}
            AND p.price >= :min
            AND p.price <= :max
            AND p.featured LIKE :featured
            AND p.countInStock >= :inStock
<<<<<<< .merge_file_a11824
            order by p.${field} ${order}

=======
>>>>>>> .merge_file_a04712
            LIMIT ${pageSize}
            OFFSET ${off}`
        ,
            {
                replacements: { category: category, min: min, max: max, featured: featured, inStock: inStock, rating: rating },
    
                type: db.sequelize.QueryTypes.SELECT
            }
        )
        let count = await db.sequelize.query(
            `SELECT count(p.id) as count 
            FROM products p 
            WHERE p.category_id LIKE :category
            AND p.brand_id LIKE ${req.params.id}
            AND p.price >= :min
            AND p.price <= :max
            AND p.featured LIKE :featured
            AND p.countInStock >= :inStock
            `
        ,
            {
                replacements: { category: category, min: min, max: max, featured: featured, inStock: inStock  },
    
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
            SELECT b.* FROM
                (SELECT p.*,  avg(c.rating) as rating ,count(c.id) as numReviews, c.product_id 
                            FROM products p
                            LEFT JOIN comment c ON c.product_id= p.id  
                            WHERE p.category_id LIKE :category
                            AND p.brand_id LIKE ${req.params.id}
                            AND p.price >= :min
                            AND p.price <= :max
                            AND p.featured LIKE :featured
<<<<<<< .merge_file_a11824
                            AND p.countInStock >= :inStock
                            GROUP BY c.product_id) b
                where b.rating >= :rating
                order by b.${field} ${order}
                
                LIMIT ${pageSize}
                OFFSET ${off}
=======
                            AND p.countInStock >= :rating
                            GROUP BY c.product_id
                            LIMIT ${pageSize}
                            OFFSET ${off}) b
                where b.rating >= :rating; 
>>>>>>> .merge_file_a04712
                `
        ,
            {
                replacements: { category: category, min: min, max: max, featured: featured, inStock: inStock, rating: rating },
    
                type: db.sequelize.QueryTypes.SELECT
            }
        )
        let count = await db.sequelize.query(
            `SELECT count(p.id) as count 
            FROM products p 
            LEFT JOIN comment c ON c.product_id= p.id 
            WHERE p.category_id LIKE :category
            AND p.brand_id LIKE ${req.params.id}
            AND p.price >= :min
            AND p.price <= :max
            AND p.featured LIKE :featured
            AND p.countInStock >= :inStock
            AND rating >= ${rating}
            GROUP BY c.product_id
            `
        ,
            {
                replacements: { category: category, min: min, max: max, featured: featured, inStock: inStock  },
    
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