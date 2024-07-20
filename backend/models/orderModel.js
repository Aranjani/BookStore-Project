import mongoose from 'mongoose';

const calculateDeliveryDate = (orderDate) => {
  const deliveryDate = new Date(orderDate);
  deliveryDate.setDate(deliveryDate.getDate() + 7); 
  return deliveryDate;
};

const orderSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  deliveryDate: {
    type: Date,
    default: function() {
      return calculateDeliveryDate(this.orderDate);
    },
  },
  deliveryStatus: {
    type: Boolean,
    default: false,
  },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
