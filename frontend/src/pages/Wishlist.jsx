import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import BooksCard from '../components/Home/BooksCard';

const Wishlist = () => {
  const [books, setBooks] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5555/wishlist');
      console.log('Wishlist Response:', response.data);  // Debugging line
      const wishlistBooks = response.data.wishlist.map((item) => item.bookId._id);  // Adjust if needed
      setWishlist(wishlistBooks);
  
      const booksResponse = await axios.get('http://localhost:5555/books');
      setBooks(booksResponse.data.data.filter((book) => wishlistBooks.includes(book._id)));
  
      setLoading(false);
    } catch (error) {
      console.log('Error fetching wishlist:', error);
      setLoading(false);
    }
  };
  

  return (
    <div className='p-4 bg-gray-900 text-white'>
      <h1 className='text-3xl mb-4'>Your Wishlist</h1>
      {loading ? (
        <Spinner />
      ) : (
        <BooksCard books={books} wishlist={wishlist} />
      )}
    </div>
  );
};

export default Wishlist;
