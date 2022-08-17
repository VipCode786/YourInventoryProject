import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import data from '../data.js';
import User from '../models/userModel.js';
import { generateToken, isAdmin, isAuth } from '../utils.js';

const userRouter = express.Router();

userRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    await User.deleteMany({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);


userRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

userRouter.get(
  '/usercount',
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const count = await User.countDocuments({});
    res.send( [count] );
    console.log("users",[count])
  })
);

userRouter.post(
  '/signin',
  
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          isProduct: user.isProduct,
      isWarehouse: user.isWarehouse,
      isTransfer: user.isTransfer,
      isGeneratePurchaseOrder: user.isGeneratePurchaseOrder,
      isListPurchaseOrder: user.isListPurchaseOrder,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

userRouter.post(
  '/register',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      email: req.body.email,
      isAdmin: req.body.isAdmin,
      isProduct: req.body.isProduct,
      isWarehouse: req.body.isWarehouse,
      isTransfer: req.body.isTransfer,
      isGeneratePurchaseOrder: req.body.isGeneratePurchaseOrder,
      isListPurchaseOrder: req.body.isListPurchaseOrder,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      address: createdUser.address,
      phone: createdUser.phone,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      isProduct: createdUser.isProduct,
      isTransfer: createdUser.isTransfer,
      isTransfer: createdUser.isTransfer,
      isGeneratePurchaseOrder: createdUser.isGeneratePurchaseOrder,
      isListPurchaseOrder: createdUser.isListPurchaseOrder,
      
      //token: generateToken(createdUser),
    });
  })
);

userRouter.get(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);
userRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const userID = req.params.id;
    const user = await User.findById(userID);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      user.address = req.body.address || user.address;
      // if (req.body.password) {
      //   user.password = bcrypt.hashSync(req.body.password, 8);
      // }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
        isAdmin: updatedUser.isAdmin,
     
        
      });
    }
  })
);


userRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      const deleteUser = await user.remove();
      res.send({ message: 'User Deleted', user: deleteUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

export default userRouter;
