import React from 'react';
import BookSingleCard from './BookSingleCard';

const BooksCard = ({ books, wishlist, onAddToWishlist, onRemoveFromWishlist, onAddToOrders }) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 bg-gray-900 text-white'>
      {books.length > 0 ? (
        books.map((item) => (
          <BookSingleCard
            key={item._id}
            book={item}
            wishlist={wishlist}
            onAddToWishlist={onAddToWishlist}
            onRemoveFromWishlist={onRemoveFromWishlist}
            onAddToOrders={onAddToOrders}
          />
        ))
      ) : (
        <p>No books available</p>
      )}
    </div>
  );
};

export default BooksCard;
