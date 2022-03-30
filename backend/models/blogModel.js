import {Sequelize} from "sequelize";
const {DataTypes, Model}= Sequelize;
import db from '../config/database.js';


const Blog = db.define('blog',{
    blog_title:{
        type: DataTypes.STRING,
    },
    blog_content:{
        type: DataTypes.STRING,
    },
    product_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    }


},{
    timestamps:true,
    freezeTableName: true
});

export default Blog;
