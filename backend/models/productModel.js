import {Sequelize} from "sequelize";
import Brand from "./brandModel.js";
import Category from "./categoryModel.js"
import db from '../config/database.js';
const {DataTypes, Model}= Sequelize;

const Product = db.define('products',{
      
 
    product_name:{
        type: DataTypes.STRING,
        // allowNull: false
    },
    image:{
        type: DataTypes.STRING,
        // allowNull: false
    },
    countInStock:{
        type: DataTypes.INTEGER,
        // allowNull: false
    },
    old_price:{
        type: DataTypes.FLOAT,
        // allowNull: false
    },
    price:{
        type: DataTypes.FLOAT,
        // allowNull: false
    },
    rating:{
        type: DataTypes.FLOAT,
    },
    numReviews:{
        type: DataTypes.INTEGER,
    },
    featured:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        
    },
    product_description:{
        type: DataTypes.STRING,
        allowNull: true
    },
    category_id:{
        type: DataTypes.INTEGER,
    },
    brand_id:{
        type: DataTypes.INTEGER,
    }
    // category_name:{
    //     type: DataTypes.STRING,
    //     references:{
    //         model: Category,
    //         key:'category_id'

    //     },
    //     allowNull: false
    // },
    // brand_name:{
    //     type: DataTypes.STRING,
    //     references:{
    //         model: Brand,
    //         key:'brand_id'

    //     },
    //     allowNull: false
    // }

},{
    timestamps:true,
    freezeTableName: true
});

export default Product;
// export default class Product extends Model {}
// Product.init({
//     product_name:{
//                 type: DataTypes.STRING,
//                 allowNull: false
//             },
//     category_name:{
//                 type: DataTypes.STRING,
//                 allowNull: false
//             },
//     image:{
//                 type: DataTypes.STRING,
//                 allowNull: false
//             },
//     countInStock:{
//                 type: DataTypes.INTEGER,
//                 allowNull: false
//             },
//     old_price:{
//                 type: DataTypes.FLOAT,
//                 allowNull: false
//             },
//     price:{
//                 type: DataTypes.FLOAT,
//                 allowNull: false
//             },
//     brand_name:{
//                 type: DataTypes.STRING,
//                 allowNull: false
//             },
//     rating:{
//                 type: DataTypes.FLOAT,
//                 allowNull: false
//             },
//     numReviews:{
//                 type: DataTypes.INTEGER,
//                 allowNull: true
//             },
//     product_description:{
//                 type: DataTypes.STRING,
//                 allowNull: true
//             },
//     category_id:{
//                 type: DataTypes.INTEGER,
//                 allowNull: false
//             },
//     brand_id:{
//                 type: DataTypes.INTEGER,
//                 allowNull: false
//             }
// },
// {
//     db, 
//     timestamps: false,
//     modelName:'Product',
//     tableName: "products",
// }
// )
// Product.belongsTo(Brand,{
//     foreignKey: 'brand_id',
// });