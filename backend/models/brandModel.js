import {Sequelize} from "sequelize";
const {DataTypes, Model}= Sequelize;
import db from '../config/database.js';


const Brand = db.sequelize.define('brand',{

    brand_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    brand_image:{
        type: DataTypes.STRING,
    }


},{
    timestamps:false,
    freezeTableName: true
});

export default Brand;


