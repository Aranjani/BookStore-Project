import express from 'express';
import Wishlist from '../models/wishlistModel.js';

const router = express.Router();

// Get all wishlist items
router.get('/', async (req, res) => {
  try {
    const wishlist = await Wishlist.find().populate('bookId');
    res.status(200).json({ wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlist' });
  }
});

// Add a book to wishlist
router.post('/', async (req, res) => {
  try {
    const { bookId } = req.body;
    const newWishlistItem = new Wishlist({ bookId });
    await newWishlistItem.save();
    res.status(201).json({ message: 'Book added to wishlist' });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({ message: 'Error adding book to wishlist' });
  }
});

// Remove a book from wishlist
router.delete('/:bookId', async (req, res) => {
  try {
    await Wishlist.deleteOne({ bookId: req.params.bookId });
    res.status(200).json({ message: 'Book removed from wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing book from wishlist' });
  }
});

export default router;
