import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import { Category} from '../models/index.js';
import {Sequelize} from "sequelize";
const {DataTypes, Model, QueryTypes }= Sequelize;

const categoryRouter=express.Router();

categoryRouter.get('/',expressAsyncHandler(async (req, res) => {
            const categories= await Category.findAll({})
            res.send(categories)
   
}))
export default categoryRouter;