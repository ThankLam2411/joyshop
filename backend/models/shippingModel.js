import {Sequelize} from "sequelize";
const {DataTypes, Model}= Sequelize;
import db from '../config/database.js';


const Shipping = db.define('shipping',{
    
    fullName:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    phone:{
     type:DataTypes.STRING,   
    },
    address:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    city:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    postalCode:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    country:{
        type:DataTypes.STRING,
        allowNull:false,
    },


},{
    timestamps:false,
    freezeTableName: true
})
export default Shipping;