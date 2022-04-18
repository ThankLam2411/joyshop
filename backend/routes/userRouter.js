import express from 'express';
import data from '../data.js';
import User from '../models/userModel.js';
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import {generateToken, isAdmin, isAuth} from '../utils.js'
import {OAuth2Client} from 'google-auth-library';
import dotenv from "dotenv";



dotenv.config();
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID)


const userRouter = express.Router();
userRouter.get(
    '/seed',
    expressAsyncHandler(async(req, res)=>{
        const createdUsers = await User.bulkCreate(data.user);
        res.send({createdUsers});
    })

)
userRouter.post('/signin', expressAsyncHandler(async(req, res)=>{
    const user= await User.findOne({where:{user_email: req.body.email} });
    if(user){
        // Compare with password in database
        if(bcrypt.compareSync(req.body.password, user.user_password)){
            res.send({
                id: user.id,
                user_name: user.user_name,
                user_email: user.user_email,
                user_phone: user.user_phone,
                user_address: user.user_address,
                user_image: user.user_image,
                isAdmin: user.isAdmin,
                isUser: user.isUser,
                token: generateToken(user),


            });
            return;
        }
    }
    res.status(401).send({message:'Invalid user or password'})
}))
userRouter.post('/register', expressAsyncHandler(async(req, res)=>{
    const user = new User({user_name: req.body.name, user_email: req.body.email, 
    user_password: bcrypt.hashSync(req.body.password, 8),
    user_phone: req.body.phone,
    user_address: req.body.address,
});
    const createdUsers = await user.save();
    res.send({
        id: createdUsers.id,
        user_name: createdUsers.user_name,
        user_email: createdUsers.user_email,
        user_phone: createdUsers.user_phone,
        user_address: createdUsers.user_address,
        isAdmin: createdUsers.isAdmin,
        isUser: createdUsers.isSeller,
        token: generateToken(createdUsers),

    })
}))
userRouter.get('/:id', expressAsyncHandler(async(req, res)=>{
    // console.log(req.params.id)
    const user = await User.findByPk(req.params.id);
    if (user) {
        res.send(user);
    }else{
        res.send(404).send({message:'User Not Found'});
    }
}));
userRouter.put(
    '/profile',
     isAuth,
     expressAsyncHandler(async(req, res)=>{
         const user = await User.findByPk(req.user.id);
         console.log(req.body.user_password);
         if(user){
             user.user_name= req.body.user_name || user.user_name;
             user.user_email= req.body.user_email || user.user_email;
             user.user_phone= req.body.user_phone || user.user_phone;
             user.user_address= req.body.user_address || user.user_address;
             user.user_image= req.body.user_image||user.user_image;
             if(req.body.user_password){
                 user.user_password= bcrypt.hashSync(req.body.user_password,8);
             }
             const updateUser = await user.save();
             res.send({
                 id: updateUser.id,
                 user_name: updateUser.user_name,
                 user_email: updateUser.user_email,
                 user_password:updateUser.user_password,
                 user_phone: updateUser.user_phone,
                 user_address: updateUser.user_address,
                 user_image: updateUser.user_image,
                 isAdmin: updateUser.isAdmin,
                 isUser: updateUser.isUser,
                 token: generateToken(updateUser),
             });
         }
     })
)
userRouter.get(
    '/', 
    // isAuth,
    // isAdmin,
    expressAsyncHandler(async(req, res)=>{
        const users = await User.findAll({});
        res.send(users)
}));
userRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const user = await User.findByPk(req.params.id);
      console.log('llllll',req.body)
      if (user) {
        user.user_name = req.body.user_name || user.user_name;
        user.user_email = req.body.user_email || user.user_email;
        user.user_phone= req.body.user_phone || user.user_phone;
        user.user_address= req.body.user_address || user.user_address;
        user.isUser = Boolean(req.body.isUser);
        user.isAdmin = Boolean(req.body.isAdmin);
        // user.isAdmin = req.body.isAdmin || user.isAdmin;
        const updatedUser = await user.save();
        res.send({ message: 'User Updated', user: updatedUser });
      } else {
        res.status(404).send({ message: 'User Not Found' });
      }
    })
  );
  userRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const user = await User.findByPk(req.params.id);
      if (user) {
        if (user.isAdmin === true) {
          res.status(400).send({ message: 'Can Not Delete Admin User' });
          return;
        }
        const deleteUser = await user.destroy();
        res.send({ message: 'User Deleted', user: deleteUser });
      } else {
        res.status(404).send({ message: 'User Not Found' });
      }
    })
  );
userRouter.post('/google-login', expressAsyncHandler(async(req, res)=>{
  const {token}= req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const {name, email} = ticket.getPayload();
  const user = new User({
    user_name: name,
    user_email: email
  });
  const createdUser= await user.save();
  res.status(401).send({
    // id: createdUser.id,
    // user_name: createdUser.user_name,
    // user_email: createdUser.user_email,
    // // user_phone: createdUser.user_phone,
    // // user_address: createdUser.user_address,
    // isAdmin: createdUser.isAdmin,
    // isUser: createdUser.isSeller,
    // token: generateToken(createdUser),

    id: user.id,
    user_name: user.user_name,
    user_email: user.user_email,
    // user_phone: user.user_phone,
    // user_address: user.user_address,
    isAdmin: user.isAdmin,
    isUser: user.isSeller,
    token: generateToken(user),

  })
}))
export default userRouter;