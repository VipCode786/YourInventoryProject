import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
//import orderRouter from './routers/orderRouter.js';
import uploadRouter from './routers/uploadRouter.js';
import warehouseRouter from './routers/warehouseRouter.js';
import transferRouter from './routers/transferRouter.js';
import purchaseOrderRouter from './routers/purchseOrderRouter.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect(process.env.MONGODB_URL , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(()=> console.log("MongoDb Connected ...........")).catch((error)=> console.error("MongoDB connection failed :", error.message));



app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/warehouses', warehouseRouter);
app.use('/api/transfer', transferRouter);
app.use('/api/purchaseOrder', purchaseOrderRouter);



const __dirname = path.resolve();

//app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

//const publicpath = path.resolve(__dirname + 'public')


//app.use('/public', express.static( 'public'));

app.use('/images', express.static( 'images'));



// app.get('/', (req, res) => {
//   res.send('Server is ready');
// });

app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
