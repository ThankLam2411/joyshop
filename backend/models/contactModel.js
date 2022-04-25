import {Sequelize} from "sequelize";
const {DataTypes, Model}= Sequelize;
import db from '../config/database.js';
import Product from './productModel.js';


const Contact = db.define('contact',{
    name:{
        type: DataTypes.STRING,
    } ,
    email:{
        type: DataTypes.STRING,
        
    } ,
    message:{
        type: DataTypes.STRING,
    },
    subject:{
        type: DataTypes.STRING,
    }


},{
    timestamps:true,
    freezeTableName: true
});

export default Contact;