import React from 'react';
import { Link } from 'react-router-dom';

const OrderCard = ({ order, book }) => {
  const orderDate = new Date(order.orderDate);
  const deliveryDate = new Date(orderDate);
  deliveryDate.setDate(orderDate.getDate() + 7);

  return (
    <div className='border-2 border-gray-500 bg-gray-800 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl hover:shadow-black'>
      <h2 className='absolute top-1 right-2 px-4 py-1 bg-blue-700 text-white rounded-lg'>
        {book.publishYear}
      </h2>
      <div className='my-2 text-gray-300'>Book ID: {book._id}</div>
      <div className='flex justify-start items-center gap-x-2'>
        <h2 className='my-1 text-white'>Title: {book.title}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <h2 className='my-1 text-white'>Author: {book.author}</h2>
      </div>
      <div className='my-4 text-white'>
        <p>Order Date: {orderDate.toDateString()}</p>
        <p>Estimated Delivery Date: {deliveryDate.toDateString()}</p>
      </div>
      <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
        <Link to={`/books/details/${book._id}`}>
          <span className='text-2xl text-green-400 hover:text-white cursor-pointer'>
            View Details
          </span>
        </Link>
      </div>
    </div>
  );
};

export default OrderCard;
