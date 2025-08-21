import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true
  },
  customerPhone: {
    type: String,
    required: true
  },
  deliveryAddress: {
    region: String,
    city: String
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product',
      required: true
    },
    name: String,
    price: Number,
    size: String,
    quantity: Number,
    image: String
  }],
  subtotal: {
    type: Number,
    required: true
  },
  deliveryFee: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    default: 'esewa'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  // eSewa specific fields
  esewaTransactionId: String,
  esewaSignature: String,
  esewaProductCode: String,
  // Order metadata
  orderDate: {
    type: Date,
    default: Date.now
  },
  notes: String
}, {
  timestamps: true
});

const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);

export default orderModel;
