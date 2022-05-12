import {Sequelize} from "sequelize";
const {DataTypes, Model}= Sequelize;
import db from '../config/database.js';


const OrderProduct = db.sequelize.define('orderproduct',{
    //   id:{
    //       type: DataTypes.INTEGER,
    //       allowNull: false,
    //       autoIncrement: true, 
    //       primaryKey: true
    //   },
      shipping_id:{
          type: DataTypes.INTEGER,
      },
      paymentMethod :{
          type: DataTypes.STRING,
          allowNull: false
      },
      itemsPrice:{
          type: DataTypes.FLOAT,
          allowNull: false
      },
      shippingPrice:{
          type: DataTypes.FLOAT,
      } ,
      taxPrice:{
          type: DataTypes.FLOAT,
      },
      totalPrice:{
          type: DataTypes.FLOAT,
      },
      user_id:{
          type: DataTypes.INTEGER,
          
      },
      isPaid:{
          type: DataTypes.BOOLEAN,
          defaultValue: false
      },
      paidAt:{
          type: DataTypes.DATE
      },
      isDelivered:{
          type: DataTypes.BOOLEAN,
          default: false
      },
      deliveredAt:{
          type: DataTypes.DATE
      },
  


},{
    timestamps:true,
    freezeTableName: true
})
export default OrderProduct;