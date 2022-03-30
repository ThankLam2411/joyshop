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
}
export default  ProductController;