import {Sequelize} from "sequelize";
const {DataTypes, Model}= Sequelize;
import db from '../config/database.js';


const OrderDetail = db.define('orderDetail',{
    name:{
        type: DataTypes.STRING,
    },
    qty:{
        type: DataTypes.FLOAT,
    },
    image:{
        type: DataTypes.STRING,
    },
    price:{
        type: DataTypes.NUMBER,
    },
    product_id:{
        type: DataTypes.INTEGER,
    },
    order_id:{
        type: DataTypes.INTEGER,
    }


},{
    timestamps:false,
    freezeTableName: true
})
export default OrderDetail;