const Products = require('../models/products');

module.exports = class ProductsController {

  // Retrieve all Products:
  static async getProducts() {
   return Products.find({}, "").lean()
  }

  static async getProductById(id) {
    return Products.findById(id).lean();
  }

  static async getProductsByCategory(category) {
    return Products.find({category}).lean();
  }

}