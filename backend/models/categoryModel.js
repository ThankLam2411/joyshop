import {Sequelize} from "sequelize";
const {DataTypes, Model}= Sequelize;
import db from '../config/database.js';


const Category = db.define('category',{
      
    category_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    category_description:{
        type: DataTypes.STRING,
        allowNull: false
    },



},{
    timestamps:false,
    freezeTableName: true
})
export default Category;