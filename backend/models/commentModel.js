import {Sequelize} from "sequelize";
const {DataTypes, Model}= Sequelize;
import db from '../config/database.js';
import Product from './productModel.js';


const Comment = db.sequelize.define('comment',{
    comment_content:{
        type: DataTypes.STRING,
    } ,
    rating:{
        type: DataTypes.FLOAT,
    } ,
    user_id:{
        type: DataTypes.INTEGER,
    },
    product_id:{
        type: DataTypes.INTEGER,
    } ,


},{
    timestamps:true,
    freezeTableName: true
});

export default Comment;