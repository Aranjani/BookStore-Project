import express from 'express';
import Orders from '../models/orderModel.js';

const router = express.Router();

// Get all order items
router.get('/', async (req, res) => {
  try {
    const orders = await Orders.find().populate('bookId');
    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Add a book to orders
router.post('/', async (req, res) => {
  try {
    const { bookId } = req.body;

    if (!bookId) {
      return res.status(400).json({ message: 'Book ID is required' });
    }

    const newOrderItem = new Orders({ bookId });
    await newOrderItem.save();
    res.status(201).json({ message: 'Book added to Orders', order: newOrderItem });
  } catch (error) {
    console.error('Error adding to Orders:', error);
    res.status(500).json({ message: 'Error adding book to orders' });
  }
});

// Remove a book from orders
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Orders.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order removed from Orders' });
  } catch (error) {
    console.error('Error removing book from Orders:', error);
    res.status(500).json({ message: 'Error removing book from Orders' });
  }
});

export default router;
