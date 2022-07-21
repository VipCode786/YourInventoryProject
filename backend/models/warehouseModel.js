import mongoose from 'mongoose';

const warehouseSchema = new mongoose.Schema(
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
  
  },

  {
    timestamps: true,
  }
);
const Warehouse = mongoose.model('Warehouse', warehouseSchema);
export default Warehouse;
