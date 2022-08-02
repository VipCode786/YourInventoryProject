import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true,
      unique: true
    },
    password: { type: String , required: true,},
    isAdmin: { type: Boolean, default: false },
    isProduct: { type: Boolean, default: false },
    isWarehouse: { type: Boolean, default: false },
    isTransfer: { type: Boolean, default: false },
    isGeneratePurchaseOrder: { type: Boolean, default: false },
    isListPurchaseOrder: { type: Boolean, default: false }
  },

  {
    timestamps: true,
  }
);
const User = mongoose.model('User', userSchema);
export default User;
