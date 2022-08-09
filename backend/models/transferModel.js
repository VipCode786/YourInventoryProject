import mongoose from 'mongoose';

const transferSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String , required: true},
    price: { type: Number, required: true },
    countInStock: { type: Number , required: true},
    TransferQTY :{ type: Number , required: true},
    SourceWarehouse : { type: String, required: true  },
    DestinationWarehouse: {type: String, required: true  }
    // rating: { type: Number, required: true },
     //numReviews: { type: Number, required: true },
    //isActive: { type: Boolean, default: true, required: true },
  },
  {
    timestamps: true,
  }
);
const Transfer = mongoose.model('Transfer', transferSchema);

export default Transfer;
