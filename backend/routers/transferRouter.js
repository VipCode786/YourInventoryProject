import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import { isAdmin, isAuth } from '../utils.js';
import multer from 'multer';
import path from 'path';
import Transfer from '../models/transferModel.js';



const transferRouter = express.Router();

transferRouter.get(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);


transferRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);


transferRouter.get(
    '/product',
    isAuth,
     expressAsyncHandler(async (req, res) => {
       const productName = req.body.name
       const warehouseName = req.body.warehouse
      const products = await Product.find({name:{$regex: productName,$options:"$i"},warehouse:{$regex: warehouseName,$options:"$i"}});
      res.send(products);
    })
  );
  


transferRouter.get(
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



transferRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {

    let createdProduct 
    let updatedProduct
    let updatedSourceProduct
    const CurrentQTY = req.body.countInStock
    const TransferProductQTY = req.body.TransferQTY
    const QTY = parseInt(CurrentQTY) - parseInt(TransferProductQTY)
    console.log("-------------------------------QTY---------------", QTY  )

    console.log("QTY", QTY)
   
    const productName = req.body.name
    console.log(productName)
    const SourceWarehouseName = req.body.SourceWarehouse
    console.log(SourceWarehouseName)

    
    const warehouseName = req.body.DestinationWarehouse
    console.log(warehouseName)

    const sourceProducts = await Product.find({name: productName,warehouse: SourceWarehouseName});
    console.log(sourceProducts)
    const sourceproduct = sourceProducts[0]
    
    if(sourceproduct)
    {

      console.log("-------------------------------QTY---------------", QTY  )
        console.log(sourceproduct._id)
        sourceproduct.name = req.body.name;
        sourceproduct.price = req.body.price;
        //product.image = req.file.filename;
        sourceproduct.category = req.body.category;
        sourceproduct.brand = req.body.brand;
        sourceproduct.countInStock = QTY;
        sourceproduct.description = req.body.description;
        sourceproduct.warehouse= req.body.SourceWarehouse;
        //console.log(products) 
        updatedSourceProduct = await sourceproduct.save();
         console.log("--------------------updatedProduct-----------------",updatedSourceProduct) 
       
   }

    const products = await Product.find({name: productName,warehouse: warehouseName});
    console.log(products)
    const product = products[0]
    
    if(product)
    {

       const currentDestinationQTY = product.countInStock
       console.log("product.countInStock",typeof currentDestinationQTY)
       const DestinationQTY =  currentDestinationQTY + parseInt(TransferProductQTY)
        console.log(product._id)
        product.name = req.body.name;
        product.price = req.body.price;
        
        product.category = req.body.category;
        product.brand = req.body.brand;
        product.countInStock = DestinationQTY;
        product.description = req.body.description;
        product.warehouse= req.body.DestinationWarehouse;
        //console.log(products) 
        createdProduct = await product.save();
        console.log("------------------------------createdProduct---------------------",createdProduct)
   
    }
    else{

        console.log("else loop")

        const productsave = new Product({
            name: req.body.name,
            price: req.body.price,
            image: req.body.image,
            category: req.body.category,
            brand: req.body.brand,
            description:req.body.description,
            countInStock: TransferProductQTY,
            warehouse : req.body.DestinationWarehouse
          });
          createdProduct = await productsave.save();
          console.log("------------------------------createdProduct---------------------",createdProduct)
        }


    const transfer = new Transfer({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      brand: req.body.brand,
      description:req.body.description,
      countInStock: CurrentQTY,
      TransferQTY: TransferProductQTY,
      SourceWarehouse : req.body.SourceWarehouse,
      DestinationWarehouse: req.body.DestinationWarehouse
    });
    const createdTransfer = await transfer.save();

    res.send({ message: 'Transfer Created', Transfer: createdTransfer , CreatedProduct: createdProduct,UpdatedSourceProduct:updatedSourceProduct, UpdatedProduct: updatedProduct });

  
  

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
transferRouter.post(
  '/:id',
   isAuth,
  // isAdmin,
  expressAsyncHandler(async (req, res) => {

    const productName = req.body.name
    console.log("name",typeof productName)
    const warehouseName = req.body.warehouse
    console.log("warehouse", warehouseName)
    const productId = req.params.id;
    const products = await Product.find({name:{$regex: productName,$options:"$i"},warehouse:{$regex: warehouseName,$options:"$i"}});
    console.log(products[0].name)
    const product = products[0]
    if (product) {
        console.log(product._id)
      product.name = req.body.name;
      product.price = req.body.price;
      //product.image = req.file.filename;
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

// 

export default transferRouter;
