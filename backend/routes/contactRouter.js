import express from "express";
import expressAsyncHandler from "express-async-handler";
import {Sequelize} from "sequelize";
import Contact from "../models/contactModel.js";
import { isAdmin, isAuth } from "../utils.js";

const contactRouter = express.Router();
contactRouter.post('/', expressAsyncHandler(async (req, res)=>{
    const contact = new Contact({
        name: req.body.name,
        email: req.body.email, 
        message: req.body.message,
        subject: req.body.subject
    })
    const createdContact = await contact.save();
    res.send({ message: 'Comment created', contact: createdContact });
}));
contactRouter.get(
        '/', 
        isAuth,
        isAdmin,
        expressAsyncHandler(async (req, res)=>{
    const pageSize = 8;
    const page = Number(req.query.page) ||1;
    const contacts = await Contact.findAndCountAll({
        limit: pageSize,
        offset: pageSize * (page - 1),

    })
    if(contacts){
        res.send({
            contacts:contacts.rows,
            totalPages:Math.ceil(contacts.count/pageSize),
            page
        })
    }else{
        res.send({message: 'No Contact Sent'})
    }
}))
contactRouter.delete(
    '/:id',
    // isAuth,
    // isAdmin,
    expressAsyncHandler(async (req, res) => {
      const contact = await Contact.findOne({
        where: {id: req.params.id},
      });
      if (contact) {
        const deleteContact = await contact.destroy();
        res.send({ message: 'Contact Deleted', contact: deleteContact });
      } else {
        res.status(404).send({ message: 'Contact Not Found ' });
      }
    })
  );
export default contactRouter;