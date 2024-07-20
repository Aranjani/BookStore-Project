import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksTable from '../components/Home/BooksTable';
import BooksCard from '../components/Home/BooksCard';
import { useSnackbar } from 'notistack';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  const [wishlist, setWishlist] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await axios.get('http://localhost:5555/wishlist');
      const wishlistBooks = response.data.wishlist.map((item) => item.bookId);
      setWishlist(wishlistBooks);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToWishlist = async (bookId) => {
    try {
      await axios.post('http://localhost:5555/wishlist', { bookId });
      setWishlist([...wishlist, bookId]);
      enqueueSnackbar('Book added to wishlist', { variant: 'success' });
    } catch (error) {
      console.error('Error adding book to wishlist:', error);
      enqueueSnackbar('Error adding book to wishlist', { variant: 'error' });
    }
  };

  const handleRemoveFromWishlist = async (bookId) => {
    try {
      await axios.delete(`http://localhost:5555/wishlist/${bookId}`);
      setWishlist(wishlist.filter((id) => id !== bookId));
      enqueueSnackbar('Book removed from wishlist', { variant: 'success' });
    } catch (error) {
      console.log('Error removing from wishlist:', error);
      enqueueSnackbar('Error removing book from wishlist', { variant: 'error' });
    }
  };

  const handleAddToOrders = async (bookId) => {
    try {
      await axios.post('http://localhost:5555/orders', { bookId });
      enqueueSnackbar('Book ordered successfully', { variant: 'success' });
    } catch (error) {
      console.error('Error ordering book:', error);
      enqueueSnackbar('Error ordering book', { variant: 'error' });
    }
  };

  return (
    <div className='p-4 bg-gray-900 text-white'>
      <div className='flex justify-center items-center gap-x-4 mb-4'>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('table')}
        >
          Table
        </button>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('card')}
        >
          Card
        </button>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Books List</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl hover:text-sky-600' />
        </Link>
        <Link to='/wishlist'>
          <button className='bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg'>
            View Wishlist
          </button>
        </Link>
        <Link to='/orders'>
          <button className='bg-yellow-500 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg'>
            View Orders
          </button>
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <BooksTable
          books={books}
          onAddToWishlist={handleAddToWishlist}
          onAddToOrders={handleAddToOrders}
        />
      ) : (
        <BooksCard
          books={books}
          wishlist={wishlist}
          onAddToWishlist={handleAddToWishlist}
          onRemoveFromWishlist={handleRemoveFromWishlist}
          onAddToOrders={handleAddToOrders}
        />
      )}
    </div>
  );
};

export default Home;
