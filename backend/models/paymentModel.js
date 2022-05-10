import {Sequelize} from "sequelize";
const {DataTypes, Model}= Sequelize;
import db from '../config/database.js';
import Product from './productModel.js';


const Payment = db.sequelize.define('paymentResult',{

    status :{
        type : DataTypes.STRING,
    },
    updateTime :{
        type : DataTypes.DATE
    },
    email_address:{
        type : DataTypes.STRING
    },
    order_id:{
        type : DataTypes.INTEGER
    },



},{
    timestamps:false,
    freezeTableName: true
});

export default Payment;