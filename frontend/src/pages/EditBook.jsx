import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setTitle(response.data.title);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error fetching book data', { variant: 'error' });
        console.log(error);
      });

    axios.get(`http://localhost:5555/wishlist`)
      .then((response) => {
        const wishlistIds = response.data.wishlist.map(item => item.bookId);
        setIsInWishlist(wishlistIds.includes(id));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, enqueueSnackbar]);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Edited successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error editing book', { variant: 'error' });
        console.log(error);
      });
  };

  const handleAddToWishlist = async () => {
    try {
      await axios.post('http://localhost:5555/wishlist', { bookId: id });
      setIsInWishlist(true);
      enqueueSnackbar('Book added to wishlist', { variant: 'success' });
    } catch (error) {
      console.log(error);
      enqueueSnackbar('Error adding book to wishlist', { variant: 'error' });
    }
  };

  const handleRemoveFromWishlist = async () => {
    try {
      await axios.delete(`http://localhost:5555/wishlist/${id}`);
      setIsInWishlist(false);
      enqueueSnackbar('Book removed from wishlist', { variant: 'success' });
    } catch (error) {
      console.log(error);
      enqueueSnackbar('Error removing book from wishlist', { variant: 'error' });
    }
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4 text-white'>Edit Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-gray-700 rounded-xl w-[600px] p-4 mx-auto bg-gray-800'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-300'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full bg-gray-700 text-white focus:outline-none focus:border-sky-400'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-300'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full bg-gray-700 text-white focus:outline-none focus:border-sky-400'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-300'>Publish Year</label>
          <input
            type='number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full bg-gray-700 text-white focus:outline-none focus:border-sky-400'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8 rounded-lg hover:bg-sky-400 text-white' onClick={handleEditBook}>
          Save
        </button>
        <button
          className={`p-2 m-2 rounded-lg text-white ${isInWishlist ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'}`}
          onClick={isInWishlist ? handleRemoveFromWishlist : handleAddToWishlist}
        >
          {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </button>
      </div>
    </div>
  );
};

export default EditBook;
