const express = require("express");
const router = express.Router();
const ProductsController = require('../controllers/products')

// Retrieve all products Route:
router.get('/products', (req, res, next) => {
  ProductsController.getProducts()
    .then((data) => {
      res.json({success: true, data: data})
    })
    .catch((err) => {
      next(err)
    })
})

router.get('/products/:id', (req, res, next) => {
  ProductsController.getProductById(req.params.id)
  .then(data =>  res.json({success: true, data}))
  .catch(next)
})

router.get('/products/category/:categoryName', (req, res, next) => {
  ProductsController.getProductsByCategory(req.params.categoryName)
  .then(data => res.json({success: true, data}))
  .catch(next)
})


module.exports = router;