import {Sequelize} from "sequelize";


const db = new Sequelize({
    host: '127.0.0.1',
    dialect:'mysql',
    port: 3306,
    username:'root',
    database:'joyshop',
    password:'123456',
});
export default db;