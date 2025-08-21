import orderModel from '../models/orderModel.js';
import productModel from '../models/productModel.js';

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      region,
      city,
      items,
      subtotal,
      deliveryFee,
      total
    } = req.body;

    // Validate required fields
    if (!customerName || !customerEmail || !customerPhone || !items || !total) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Create order data
    const orderData = {
      customerId: req.user.id, // From auth middleware
      customerName,
      customerEmail,
      customerPhone,
      deliveryAddress: { region, city },
      items,
      subtotal: subtotal || 0,
      deliveryFee: deliveryFee || 0,
      total,
      paymentMethod: 'esewa',
      paymentStatus: 'pending',
      orderStatus: 'pending'
    };

    const order = new orderModel(orderData);
    await order.save();

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order
    });

  } catch (error) {
    console.error('createOrder error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get orders for a specific user
export const getUserOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ customerId: req.user.id })
      .populate('items.productId')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders
    });

  } catch (error) {
    console.error('getUserOrders error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get all orders (admin only)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find()
      .populate('customerId', 'name email')
      .populate('items.productId')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders
    });

  } catch (error) {
    console.error('getAllOrders error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Update order status (admin only)
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus, paymentStatus, notes } = req.body;

    const updateData = {};
    if (orderStatus) updateData.orderStatus = orderStatus;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;
    if (notes) updateData.notes = notes;

    const order = await orderModel.findByIdAndUpdate(
      orderId,
      updateData,
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      message: 'Order updated successfully',
      order
    });

  } catch (error) {
    console.error('updateOrderStatus error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Handle eSewa payment verification
export const verifyEsewaPayment = async (req, res) => {
  try {
    const { 
      transaction_uuid, 
      total_amount, 
      product_code, 
      signature,
      status 
    } = req.body;

    // Find the order by transaction_uuid
    const order = await orderModel.findOne({ 
      esewaTransactionId: transaction_uuid 
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Update order with eSewa response
    const updateData = {
      paymentStatus: status === 'COMPLETE' ? 'completed' : 'failed',
      orderStatus: status === 'COMPLETE' ? 'confirmed' : 'pending'
    };

    if (status === 'COMPLETE') {
      updateData.esewaSignature = signature;
      updateData.esewaProductCode = product_code;
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(
      order._id,
      updateData,
      { new: true }
    );

    res.json({
      success: true,
      message: 'Payment verification completed',
      order: updatedOrder
    });

  } catch (error) {
    console.error('verifyEsewaPayment error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const order = await orderModel.findById(orderId)
      .populate('customerId', 'name email')
      .populate('items.productId');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user is authorized to view this order
    if (order.customerId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this order'
      });
    }

    res.json({
      success: true,
      order
    });

  } catch (error) {
    console.error('getOrderById error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
