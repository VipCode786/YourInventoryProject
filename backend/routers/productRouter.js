import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import { isAdmin, isAuth } from '../utils.js';
import multer from 'multer';
import path from 'path';


let x = Math.floor((Math.random() * 999999999999) + 999)
const productRouter = express.Router();

productRouter.get(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({updatedAt: -1});
    res.send(products);
  })
);


// productRouter.get(
//   '/seed',
 
//   expressAsyncHandler(async (req, res) => {
//     // await Product.remove({});
//     const createdProducts = await Product.insertMany(data.products);
//     res.send({ createdProducts });
//   })
// );

productRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      //cb(null, './public/images');
      cb(null, 'images');
  },
  filename: function(req, file, cb) {   
      cb(null, Date.now()+ x + path.extname(file.originalname));
  }
});

let upload = multer({ storage: storage });


productRouter.post(
  '/',isAuth,upload.single('image'),
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: req.body.name,
      image: req.file.filename,
      price: req.body.price,
      category: req.body.category,
      brand: req.body.brand,
      description:req.body.description,
      countInStock: req.body.countInStock,
      warehouse : req.body.warehouse
    });
    const createdProduct = await product.save();
    res.send({ message: 'Product Created', product: createdProduct });
  })
);

// productRouter.post(
//   '/',upload.single('image'),
//   expressAsyncHandler(async (req, res) => {
//     const product = new Product({
//       name: req.body.name,
//       image: req.file.filename,
//       price: req.body.price,
//       category: req.body.category,
//       brand: req.body.brand,
//       description:req.body.description,
//       countInStock: req.body.countInStock,

//     });
//     const createdProduct = await product.save();
//     res.send({ message: 'Product Created', product: createdProduct });
//   })
// );
productRouter.put(
  '/:id',upload.single('image'),
   isAuth,
  // isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    console.log(typeof product)
    console.log(product)
    if (product) {
      console.log("product11111111",product._id)
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.file.filename ;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      product.warehouse = req.body.warehouse
      const updatedProduct = await product.save();
      res.send({ message: 'Product Updated', product: updatedProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

productRouter.delete(
  '/:id',
   isAuth,
  // isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const deleteProduct = await product.remove();
      res.send({ message: 'Product Deleted', product: deleteProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

export default productRouter;
