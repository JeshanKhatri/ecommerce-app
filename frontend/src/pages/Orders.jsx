import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { toast } from 'react-toastify';
import axios from 'axios';

const Orders = () => {
  const { currency, backendUrl, token } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/order/user`, {
        headers: { token }
      });
      
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message || 'Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

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
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className='border-t pt-16'>
        <div className="text-2xl mb-4">
          <Title text1={'Order'} text2={'List'}/>
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
      <div className=" text-2xl mb-6">
        <Title text1={'Order'} text2={'List'}/>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 text-lg">No orders found</p>
          <p className="text-gray-400 mt-2">Start shopping to see your orders here</p>
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

                {/* Order Status */}
                <div className="lg:w-48 space-y-4">
                  <div className="text-center">
                    <div className={`inline-block w-3 h-3 rounded-full ${getStatusColor(order.orderStatus)} mr-2`}></div>
                    <span className="text-sm font-medium capitalize">{order.orderStatus}</span>
                  </div>
                  
                  <div className="text-center">
                    <div className={`inline-block w-3 h-3 rounded-full ${getPaymentStatusColor(order.paymentStatus)} mr-2`}></div>
                    <span className="text-sm font-medium capitalize">{order.paymentStatus}</span>
                  </div>

                  <div className="text-center p-3 bg-gray-50 rounded">
                    <p className="text-xs text-gray-500">Payment Method</p>
                    <p className="text-sm font-medium text-gray-900 capitalize">{order.paymentMethod}</p>
                  </div>

                  {order.notes && (
                    <div className="text-center p-3 bg-blue-50 rounded">
                      <p className="text-xs text-blue-600 font-medium">Notes</p>
                      <p className="text-sm text-blue-800">{order.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders
