import Blog from "./blogModel.js";
import Brand from "./brandModel.js";
import Category from "./categoryModel.js";
import Comment from "./commentModel.js";
import OrderDetail from "./orderDetail.js";
import OrderProduct from "./orderModel.js";
import Payment from "./paymentModel.js";
import Product from "./productModel.js";
import Shipping from "./shippingModel.js";
import User from "./userModel.js";

Brand.hasMany(Product,{
    foreignKey: 'brand_id',
})
Product.belongsTo(Brand,{
    foreignKey: 'brand_id'
})
Category.hasMany(Product,{
    
    foreignKey: 'category_id',
})
Product.belongsTo(Category,{
    foreignKey: 'category_id'
});
OrderDetail.hasMany(Product,{
    foreignKey: 'id',
});
Product.belongsTo(OrderDetail,{
    foreignKey: 'id',
});
OrderProduct.hasOne(Shipping,{
    foreignKey:'id',
})
Shipping.belongsTo(OrderProduct,{
    foreignKey:'id',
})
OrderProduct.hasMany(OrderDetail,{
    foreignKey: 'order_id'
});
OrderDetail.belongsTo(OrderProduct,{
    foreignKey: 'order_id'
});
// OrderProduct.hasOne(User,{
//     foreignKey: 'id'
// });

User.hasMany(OrderProduct,{
    foreignKey: 'id',
});
OrderProduct.belongsTo(User,{
    foreignKey: 'user_id'
})
User.hasMany(Comment,{
    foreignKey: 'id'
});
Comment.belongsTo(User,{
    foreignKey: 'user_id'
})
Product.hasMany(Comment, {
    foreignKey: 'product_id'
});
Comment.belongsTo(Product,
    {
    foreignKey: 'id'
    }
)
OrderProduct.hasOne(Payment,{
    foreignKey: 'id'
})
Payment.belongsTo(OrderProduct,{
    foreignKey: 'order_id'
})
Product.hasMany(Blog,{
    foreignKey: 'id'
})
Blog.belongsTo(Product,{
    foreignKey: 'product_id'
})



export { Product, Brand, Category, OrderDetail, OrderProduct, Shipping, User, Comment, Payment, Blog };