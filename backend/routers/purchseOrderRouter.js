import express from 'express';
import expressAsyncHandler from 'express-async-handler';
//import Order from '../models/orderModel.js';
import PurchaseOrder from '../models/purchaseOrderModel.js';
import { isAdmin, isAuth } from '../utils.js';

const purchaseOrderRouter = express.Router();
purchaseOrderRouter.get(
  '/',
   isAuth,
  // isAdmin,
  expressAsyncHandler(async (req, res) => {
    // const orders = await Order.find({}).populate('user', 'name');
    const orders = await PurchaseOrder.find({}).sort({updatedAt: -1});
    res.send(orders);
  })
);


purchaseOrderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const purchaseProducts = await PurchaseOrder.findById(req.params.id);
    if (purchaseProducts) {
      res.send(purchaseProducts);
    } else {
      res.status(404).send({ message: 'PurchaseOrder Not Found' });
    }
  })
);
// purchaseOrderRouter.post(
//   '/',
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     if (req.body.orderItems.length === 0) {
//       res.status(400).send({ message: 'Cart is empty' });
//     } else {
//       const order = new Order({
//         orderItems: req.body.orderItems,
//         shippingAddress: req.body.shippingAddress,
//         paymentMethod: req.body.paymentMethod,
//         itemsPrice: req.body.itemsPrice,
//         shippingPrice: req.body.shippingPrice,
//         taxPrice: req.body.taxPrice,
//         totalPrice: req.body.totalPrice,
//         user: req.user._id,
//       });
//       const createdOrder = await order.save();
//       res
//         .status(201)
//         .send({ message: 'New Order Created', order: createdOrder });
//     }
//   })
// );

purchaseOrderRouter.post('/', expressAsyncHandler(async (req, res)=>{
  const purchaseOrder = new PurchaseOrder({
    purchaseOrderItems : req.body.purchaseInfo.map((x)=> ({...x, product:x.id})),
  });
  const purchaseOrder1 = await purchaseOrder.save();
  res.status(201).send({ message: 'New Order Created', order: purchaseOrder1 });
}))

purchaseOrderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

purchaseOrderRouter.put(
  '/:id/pay',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedOrder = await order.save();
      res.send({ message: 'Order Paid', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

purchaseOrderRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      const deleteOrder = await order.remove();
      res.send({ message: 'Order Deleted', order: deleteOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

purchaseOrderRouter.put(
  '/:id/deliver',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.send({ message: 'Order Delivered', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

export default purchaseOrderRouter;
