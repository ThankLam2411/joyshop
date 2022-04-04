import express from "express";
import expressAsyncHandler from "express-async-handler";
import {Sequelize} from "sequelize";
import Contact from "../models/contactModel.js";
import { isAuth } from "../utils.js";

const contactRouter = express.Router();
contactRouter.post('/', expressAsyncHandler(async (req, res)=>{
    const contact = new Contact({
        name: req.body.name,
        email: req.body.email, 
        message: req.body.message
    })
    const createdContact = await contact.save();
    res.send({ message: 'Comment created', contact: createdContact });
}));
contactRouter.get('/', expressAsyncHandler(async (req, res)=>{
    const contacts = await Contact.findAll({})
    res.send(contacts)
}))
export default contactRouter;