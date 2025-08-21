import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(backendUrl + '/api/order/admin/list', {
         headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
      });
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.put(
        `${backendUrl}/api/order/admin/${orderId}`,
        { orderStatus: newStatus },
        {   headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          } }
      );
      
      if (response.data.success) {
        toast.success('Order status updated successfully');
        fetchOrders(); // Refresh the list
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };

  const updatePaymentStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.put(
        `${backendUrl}/api/order/admin/${orderId}`,
        { paymentStatus: newStatus },
        {   headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          } }
      );
      
      if (response.data.success) {
        toast.success('Payment status updated successfully');
        fetchOrders(); // Refresh the list
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error updating payment status:', error);
      toast.error('Failed to update payment status');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-500';
      case 'shipped':
        return 'bg-yellow-500';
      case 'delivered':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'failed':
        return 'bg-red-500';
      default:
        return 'bg-yellow-500';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className='border-t pt-16'>
        <div className="text-2xl mb-4">
          <p className='font-bold'>Order List</p>
        </div>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='border-t pt-16'>
      <div className="text-2xl mb-6">
        <p className='font-bold'>Order List</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 text-lg">No orders found</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div key={order._id || index} className='py-6 border border-gray-200 rounded-lg p-6 bg-white shadow-sm'>
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                {/* Order Header */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Order #{order._id?.slice(-8) || 'N/A'}
                    </h3>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        {formatDate(order.createdAt)}
                      </p>
                      <p className="text-lg font-bold text-gray-900">
                        {currency}{order.total}
                      </p>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="mb-4 p-3 bg-gray-50 rounded">
                    <p className="font-medium text-gray-900">{order.customerName}</p>
                    <p className="text-sm text-gray-600">{order.customerEmail}</p>
                    <p className="text-sm text-gray-600">{order.customerPhone}</p>
                    <p className="text-sm text-gray-600">
                      {order.deliveryAddress?.region}, {order.deliveryAddress?.city}
                    </p>
                  </div>

                  {/* Items */}
                  <div className="space-y-3">
                    {order.items?.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center gap-4 p-3 bg-white border border-gray-100 rounded">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">Size: {item.size}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{currency}{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Management */}
                <div className="lg:w-64 space-y-4">
                  {/* Order Status */}
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <p className="text-xs text-gray-500 mb-2">Order Status</p>
                    <div className="flex items-center justify-center mb-2">
                      <div className={`inline-block w-3 h-3 rounded-full ${getStatusColor(order.orderStatus)} mr-2`}></div>
                      <span className="text-sm font-medium capitalize">{order.orderStatus}</span>
                    </div>
                    <select 
                      value={order.orderStatus} 
                      onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                      className="w-full p-2 text-sm border border-gray-300 rounded"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  
                  {/* Payment Status */}
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <p className="text-xs text-gray-500 mb-2">Payment Status</p>
                    <div className="flex items-center justify-center mb-2">
                      <div className={`inline-block w-3 h-3 rounded-full ${getPaymentStatusColor(order.paymentStatus)} mr-2`}></div>
                      <span className="text-sm font-medium capitalize">{order.paymentStatus}</span>
                    </div>
                    <select 
                      value={order.paymentStatus} 
                      onChange={(e) => updatePaymentStatus(order._id, e.target.value)}
                      className="w-full p-2 text-sm border border-gray-300 rounded"
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="failed">Failed</option>
                    </select>
                  </div>

                  {/* Payment Method */}
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <p className="text-xs text-gray-500">Payment Method</p>
                    <p className="text-sm font-medium text-gray-900 capitalize">{order.paymentMethod}</p>
                  </div>

                  {/* eSewa Details */}
                  {order.esewaTransactionId && (
                    <div className="text-center p-3 bg-blue-50 rounded">
                      <p className="text-xs text-blue-600 font-medium">eSewa Transaction</p>
                      <p className="text-xs text-blue-800 break-all">{order.esewaTransactionId}</p>
                    </div>
                  )}

                  {/* Notes */}
                  {order.notes && (
                    <div className="text-center p-3 bg-yellow-50 rounded">
                      <p className="text-xs text-yellow-600 font-medium">Notes</p>
                      <p className="text-sm text-yellow-800">{order.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
