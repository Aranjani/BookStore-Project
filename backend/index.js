import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import wishlistRoute from './routes/wishlistRoute.js';
import orderRoute from './routes/orderRoute.js'; // Import the order routes
import cors from 'cors';

const app = express();

// Middleware for parsing body
app.use(express.json());

// Middleware CORS for all origins
app.use(cors());

// // Middleware for CORS custom
// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type'],
// }));

app.get('/', (req, res) => {
  console.log(req);
  return res.status(234).send('Welcome');
});

// Define routes
app.use('/books', booksRoute);
app.use('/wishlist', wishlistRoute); // Add wishlist routes
app.use('/orders', orderRoute); // Add orders routes

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log('Database connection error:', error);
  });
