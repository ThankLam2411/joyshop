import {Sequelize} from "sequelize";


// const db = new Sequelize({
//     host: '127.0.0.1',
//     port: 3306,
//     username:'root',
//     database:'joyshop',
//     password:'123456',
//     // host: process.env.DB_HOST,
//     // port: process.env.DB_PORT,
//     // username:process.env.DB_USERNAME,
//     // database:process.env.DB_DATABASE,
//     // password:process.env.DB_PASSWORD,
//     dialect:'mysql',
// });
const db = {}
const sequelize = new Sequelize('joyshop', 
                                'root', 
                                '123456', {
  host: '127.0.0.1',
  port: 3306,
  dialect: 'mysql',
//   logging: console.log,
  freezeTableName: true,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db;