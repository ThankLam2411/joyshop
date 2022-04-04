import {Sequelize} from "sequelize";
const {DataTypes, Model}= Sequelize;
import db from '../config/database.js';


const User = db.define('user',{
      
    user_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    user_email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    user_password:{
        type: DataTypes.STRING,
        required: true,

    },
    user_phone:{
        type: DataTypes.STRING
    },
    user_address:{
        type: DataTypes.STRING
    },
    user_image:{
        type: DataTypes.STRING
    },
    isAdmin:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        required: true,
    },
    isUser:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        required: true,
    }



},{
    timestamps:true,
    freezeTableName: true
})
export default User;