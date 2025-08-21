import crypto from 'crypto'
import orderModel from '../models/orderModel.js';

// Handle eSewa callback
export const handleEsewaCallback = async (req, res) => {
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

    await orderModel.findByIdAndUpdate(
      order._id,
      updateData,
      { new: true }
    );

    // Redirect to frontend with status
    const frontendOrigin = req.get('origin') || req.get('referer') || `${req.protocol}://${req.get('host')}`;
    const redirectUrl = `${frontendOrigin.replace(/\/$/, '')}/orders?esewa=${status === 'COMPLETE' ? 'success' : 'failure'}&orderId=${order._id}`;
    
    res.redirect(redirectUrl);

  } catch (error) {
    console.error('handleEsewaCallback error:', error);
    res.status(500).send('Payment verification failed');
  }
};
