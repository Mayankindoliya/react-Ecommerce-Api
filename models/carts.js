const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const Products = require('./products')

const cardsSchema = new Schema({
  shippingFee: { type: Number, required: true },
  totalQuantity: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  products: [{
    title: String,
    image: String,
    quantity: Number,
    price: Number
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users" // Reference to the User model
  },
  status: {type: String, enum: ['pending', 'complpete'], default: 'pending'}
},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

module.exports = mongoose.model('carts', cardsSchema);