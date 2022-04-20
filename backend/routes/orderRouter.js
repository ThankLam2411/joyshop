import express from "express";
import expressAsyncHandler from "express-async-handler";
import { OrderProduct, OrderDetail, Shipping, User, Category, Product, Payment } from "../models/index.js";
import { isAdmin, isAuth } from "../utils.js";
import {Sequelize} from "sequelize";
import db from "../config/database.js";
import create_detail from "../services/index.js"


const orderRouter = express.Router();
orderRouter.get('/summary', expressAsyncHandler(async (req, res)=>{
    const orders = await OrderProduct.findAll({
        attributes:[
            [Sequelize.fn("COUNT", Sequelize.col("id")), 'numOrders' ],
            [Sequelize.fn("SUM", Sequelize.col("totalPrice")), 'totalSales' ]

        ],
        raw: true

    })
    const users= await User.findAll({
        attributes: [
            'id',
            [Sequelize.fn("COUNT", Sequelize.col("id")), 'numUsers' ]
        ],
        raw: true
    })
    const dailyOrders = await OrderProduct.findAll({
        attributes:[
            [Sequelize.fn("DATE_FORMAT", Sequelize.col("createdAt"), "%Y-%c-%D"),'id'],
            [Sequelize.fn("COUNT", Sequelize.col("id")), 'numOrders' ],
            [Sequelize.fn("SUM", Sequelize.col("totalPrice")), 'sales' ]
        ],
        group:[Sequelize.fn("DATE_FORMAT", Sequelize.col("createdAt"), "%Y-%c-%D")],
        raw: true

    })
    // const productCategories = await Product.findAll({
    //     includes: [
    //         {
    //             model: Category,
    //             // attributes:['category_name']
    //         }
    //     ],
    //     attributes:[
    //         [Sequelize.fn("COUNT", Sequelize.col("category_id")), 'category' ],
    //         'category_name'
    //     ],
    //     group:'products.category_id'
    // })
    // const users= await User.count({
    //     col:'id'
    // })
    res.send({users, orders, dailyOrders})
}))

orderRouter.get('/', expressAsyncHandler(async (req, res)=>{
    const order = await OrderProduct.findAll({
        // where:{
        //     id: req.params.id
        // },
        include:[
            {
                model: OrderDetail,
                required:false
            },
            {
                model: Shipping,
                required:false
            },
            {
                model: User,
                required:false

            }

            
        ],
            
    });
    if (order) {
        res.send(order);
    }else{
        res.status(404).send({message: 'Order Not Found'});
    }
}))

orderRouter.post(
    '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        console.log('123',req.body);
        console.log('234', req.user)
        if (req.body.orderItems.length == 0) {
            res.status(400).send({ message: 'Cart is empty' })

        } else {
            const order = new OrderProduct({
                shipping_id: req.body.shippingAddress.shippingAddress.id,
                paymentMethod: req.body.paymentMethod,
                itemsPrice: req.body.itemsPrice,
                shippingPrice: req.body.shippingPrice,
                taxPrice: req.body.taxPrice,
                totalPrice: req.body.totalPrice,
                user_id: req.user.id,

            });
            console.log('order', order);
            const createdOrder = await order.save();
          
            const result =  await Promise.all(req.body.cartItems.map(async (val) => {
                const orderItems = new OrderDetail({
                    name: val.product_name,
                    qty: val.qty,
                    image: val.image,
                    price: val.price,
                    product_id: val.product,
                    order_id: order.id 
                });
                const product = await Product.findByPk(val.product)
                product.countInStock= Number(product.countInStock - val.qty)
                // const product = new Product({
                //     product_id: val.product,
                //     countInStock: Number(val.countInStock - val.qty)
                // }); 
                const result2 = await product.save();
                console.log('aaaaaa', result2)
                return await orderItems.save();
            })
            )
            console.log('bbbbbb',result);

            // const result2 =  await Promise.all(req.body.cartItems.map(async (val) => {
            //     const product = new Product({
            //         countInStock: Number(countInStock - qty)
            //     });
            //     return product.save();
            // })
            // )
            // console.log('cccc',result2);

            res.status(201).send({ message: 'New order created', order: createdOrder });
        }
    })
)
orderRouter.delete(
    '/:id',
    // isAuth,
    // isAdmin,
    expressAsyncHandler(async (req, res) => {
        try{
            const orderDetail= await OrderDetail.findOne({
                where:{
                    order_id:req.params.id
                }
            })
            console.log(orderDetail)
            const result = await orderDetail.destroy();
            console.log('123',result)
           
            const order = await OrderProduct.findByPk(req.params.id);
    
            const deleteOrder = await order.destroy();
    
            res.send({ message: 'Order Deleted', order: deleteOrder });
    
        }catch(error){
            console.log(error)
        }
    //   } else {
    //     res.status(404).send({ message: 'Order Not Found' });
    //   }
    })
  );

orderRouter.get(
    '/:id',
    // isAuth,
    expressAsyncHandler(async (req, res)=>{
        const order = await OrderProduct.findOne({
            where:{
                id: req.params.id
            },
            include:[
                {
                    model: OrderDetail,
                    required:false
                },
                {
                    model: Shipping,
                    required:false
                }

                
            ],
                
        });
        if (order) {
            res.send(order);
        }else{
            res.status(404).send({message: 'Order Not Found'});
        }
    })

)
orderRouter.get(
    '/mine/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        // console.log('req',req.params.id)
        const orders = await OrderProduct.findAll({
            where: {
                user_id: req.params.id
            }
            // include: [{
            //     model: User,
            //     where: {
            //         user_id: req.params.id
            //     }
            // }]
           
        })
        res.send(orders);

    })
)
orderRouter.patch('/:id/pay', isAuth, expressAsyncHandler(async(req, res)=>{
    const order = await OrderProduct.findByPk(req.params.id);
    if(order) {
        order.isPaid = true;
        order.paidAt= Date.now();
        async function createPayment(){
            const payment=  new Payment({
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address,
            })
            return await payment.save();
        }
        createPayment() 
       
    }
}))
export default orderRouter;

