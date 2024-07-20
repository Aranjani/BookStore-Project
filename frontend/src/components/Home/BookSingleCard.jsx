import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete, MdOutlineFavoriteBorder, MdOutlineFavorite, MdOutlineShoppingCart } from 'react-icons/md';
import BookModal from './BookModal';

const BookSingleCard = ({ book, wishlist, onAddToWishlist, onRemoveFromWishlist, onAddToOrders }) => {
  const [showModal, setShowModal] = useState(false);
  const isInWishlist = wishlist.includes(book._id);

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      onRemoveFromWishlist(book._id);
    } else {
      onAddToWishlist(book._id);
    }
  };

  return (
    <div className='border-2 border-gray-500 bg-gray-800 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl hover:shadow-black'>
      <h2 className='absolute top-1 right-2 px-4 py-1 bg-blue-700 text-white rounded-lg'>
        {book.publishYear}
      </h2>
      <h4 className='my-2 text-gray-300'>{book._id}</h4>
      <div className='flex justify-start items-center gap-x-2'>
        <PiBookOpenTextLight className='text-blue-400 text-2xl' />
        <h2 className='my-1 text-white'>{book.title}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <BiUserCircle className='text-blue-400 text-2xl' />
        <h2 className='my-1 text-white'>{book.author}</h2>
      </div>
      <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
        <BiShow
          className='text-3xl text-blue-400 hover:text-white cursor-pointer'
          onClick={() => setShowModal(true)}
        />
        <Link to={`/books/details/${book._id}`}>
          <BsInfoCircle className='text-2xl text-green-400 hover:text-white' />
        </Link>
        <Link to={`/books/edit/${book._id}`}>
          <AiOutlineEdit className='text-2xl text-yellow-400 hover:text-white' />
        </Link>
        <Link to={`/books/delete/${book._id}`}>
          <MdOutlineDelete className='text-2xl text-red-400 hover:text-white' />
        </Link>
        {isInWishlist ? (
          <MdOutlineFavorite
            className='text-2xl text-red-500 hover:text-white cursor-pointer'
            onClick={handleWishlistToggle}
          />
        ) : (
          <MdOutlineFavoriteBorder
            className='text-2xl text-gray-400 hover:text-white cursor-pointer'
            onClick={handleWishlistToggle}
          />
        )}
        <MdOutlineShoppingCart
          className='text-2xl text-blue-400 hover:text-white cursor-pointer'
          onClick={() => onAddToOrders(book._id)}
        />
      </div>
      {showModal && (
        <BookModal book={book} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default BookSingleCard;
