import mongoose from 'mongoose';

const purchaseOrderSchema = new mongoose.Schema(
  {
    purchaseOrderItems: [
      {
        name: { type: String, required: true },
        brand: { type: String, required: true },
        category: { type: String, required: true },
        price: { type: Number, required: true },
        countInStock:{ type: String, required: true },
        purchaseQTY : {type: Number , required: true},
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        warehouse:{ type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const PurchaseOrder = mongoose.model('PurchaseOrder', purchaseOrderSchema);
export default PurchaseOrder;
