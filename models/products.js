const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  rating: {
    rate: Number,
    count: Number
  }
},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

module.exports = mongoose.model('products', productsSchema);