const Carts = require('../models/carts');

module.exports = class cartsController {

  // Post cart
  static async addCarts(user, document) {
    if (!user) {
      throw new Error('user is not logged in');
    }
    // get existing cart
    const existingCart = await Carts.findOne({ user: user.id, status: 'pending' }).lean();
    if (existingCart) {
      let existingProduct;
      switch (document.action) {
        case 'add':
          // find existing product
          existingProduct = existingCart.products.find(el => el._id.toString() === document.product._id)
          if (existingProduct) {
            // increase quantity
            return Carts.findOneAndUpdate({ _id: existingCart._id, 'products._id': existingProduct._id }, {
              $set: {
                'products.$.quantity': existingProduct.quantity + 1,
              },
              $inc: {
                totalQuantity: 1,
                totalAmount: existingProduct.price
              }
            }, { new: true }).lean()
          } else {
            return Carts.findOneAndUpdate({ _id: existingCart._id }, {
              $push: {
                'products': document.product
              },
              $inc: {
                totalQuantity: 1,
                totalAmount: document.product.price
              }
            }, { new: true }).lean()
          }
        case 'delete':
          existingProduct = existingCart.products.find(el => el._id.toString() === document.product._id)
          if (existingProduct.quantity > 1) {
            // decrease quantity
            return Carts.findOneAndUpdate({ _id: existingCart._id, 'products._id': existingProduct._id }, {
              $set: {
                'products.$.quantity': existingProduct.quantity - 1,
              },
              $inc: {
                totalQuantity: -1,
                totalAmount: -existingProduct.price
              }
            }, { new: true }).lean()
          } else {
            return Carts.findOneAndUpdate({ _id: existingCart._id }, {
              $pull: {
                'products': { _id: existingProduct._id }
              }
            }, { new: true }).lean()
          }
      }
    }
    const cart = {
      products: [document.product],
      shippingFee: 30,
      totalQuantity: 1,
      totalAmount: document.product.price + 30,
      user: user.id
    }
    return Carts.create(cart)
  }

  // Retrieve all carts:
  static async getCarts(user) {
    if (!user) {
      throw new Error('user is not logged in');
    }
    return Carts.findOne({ user: user, status: 'pending' }).lean()
  }

  static async checkout(user, id) {
    if (!user) {
      throw new Error('user is not logged in');
    }
    return Carts.findOneAndUpdate({ _id: id }, { status: 'complete' }, { new: true }).lean()
  }

}