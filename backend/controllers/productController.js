import Product from '../models/productModel.js';
import Brand from '../models/brandModel.js';
import Category from '../models/categoryModel.js';

class ProductController{
    getProductDetail(req, res, next){
        Product.findAll({
            where: {
                id: req.params.id
            },
            include: [
               {
                model: Brand,
                required: false,
                attribute: ['brand_id']
               },
               {
                model: Category,
                required: false,
                attribute: ['category_id']
               },
            ]
        })
    }
    async getProductFeatured(req, res, next){
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
    }
}
export default  ProductController;