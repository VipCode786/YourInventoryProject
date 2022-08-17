import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import data from '../data.js';
import User from '../models/userModel.js';
import Warehouse from '../models/warehouseModel.js'
import { generateToken, isAuth, isWarehouse } from '../utils.js';

const warehouseRouter = express.Router();

warehouseRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    await Warehouse.deleteMany({});
    const createdWarehouses = await Warehouse.insertMany(data.warehouses);
    res.send({ createdWarehouses });
  })
);


warehouseRouter.get(
  '/',
  isAuth,
  isWarehouse,
  expressAsyncHandler(async (req, res) => {
    const warehouses = await Warehouse.find({});
    res.send(warehouses);
  })
);

warehouseRouter.get(
  '/totalWarehouse',
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const warehouses = await Warehouse.countDocuments({});
    res.send([warehouses]);
  })
);



warehouseRouter.post(
  '/add',
  isAuth,
  isWarehouse,
  expressAsyncHandler(async (req, res) => {
    const warehouse = new Warehouse({
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      email: req.body.email,
     
    });
    const createdWarehouse = await warehouse.save();
    res.send({
      _id: createdWarehouse._id,
      name: createdWarehouse.name,
      address: createdWarehouse.address,
      phone: createdWarehouse.phone,
      email: createdWarehouse.email,
      //isAdmin: createdUser.isAdmin,
      //token: generateToken(createdUser),
    });
  })
);

warehouseRouter.get(
  '/:id',
  isAuth,
  isWarehouse,
  expressAsyncHandler(async (req, res) => {
    const warehouse = await Warehouse.findById(req.params.id);
    if (warehouse) {
      res.send(warehouse);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);
warehouseRouter.put(
  '/:id',
  isAuth,
  isWarehouse,
  expressAsyncHandler(async (req, res) => {
    const warehouseID = req.params.id;
    const warehouse = await Warehouse.findById(warehouseID);
    if (warehouse) {
        warehouse.name = req.body.name || warehouse.name;
        warehouse.email = req.body.email || warehouse.email;
        warehouse.phone = req.body.phone || warehouse.phone;
        warehouse.address = req.body.address || warehouse.address;
      // if (req.body.password) {
      //   user.password = bcrypt.hashSync(req.body.password, 8);
      // }
      const updatedWarehouse = await warehouse.save();
      res.send({
        _id: updatedWarehouse._id,
        name: updatedWarehouse.name,
        email: updatedWarehouse.email,
        phone: updatedWarehouse.phone,
        address: updatedWarehouse.address,
        isAdmin: updatedWarehouse.isAdmin,
     
        
      });
    }
  })
);


warehouseRouter.delete(
  '/:id',
   isAuth,
   isWarehouse,
  // isAdmin,
  expressAsyncHandler(async (req, res) => {
    const warehouse = await Warehouse.findById(req.params.id);
    if (warehouse) {
      const deleteWarehouse = await warehouse.remove();
      res.send({ message: 'User Deleted', warehouse: deleteWarehouse });
    } else {
      res.status(404).send({ message: 'warehouse Not Found' });
    }
  })
);

export default warehouseRouter;
