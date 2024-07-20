import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import OrderCard from '../components/Home/OrderCard';

const Orders = () => {
  const [books, setBooks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const ordersResponse = await axios.get('http://localhost:5555/orders');
      console.log('Order Response:', ordersResponse.data); 
      const orderBooks = ordersResponse.data.orders;
      setOrders(orderBooks);

      const booksResponse = await axios.get('http://localhost:5555/books');
      setBooks(booksResponse.data.data);

      setLoading(false);
    } catch (error) {
      console.log('Error fetching Orders:', error);
      setLoading(false);
    }
  };

  const bookMap = books.reduce((map, book) => {
    map[book._id] = book;
    return map;
  }, {});

  return (
    <div className='p-4 bg-gray-900 text-white'>
      <h1 className='text-3xl mb-4'>Your Orders</h1>
      {loading ? (
        <Spinner />
      ) : orders.length > 0 ? (
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4'>
          {orders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              book={bookMap[order.bookId._id]}  
            />
          ))}
        </div>
      ) : (
        <p>No orders found</p>
      )}
    </div>
  );
};

export default Orders;
