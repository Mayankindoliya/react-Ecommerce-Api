const express = require("express");
const router = express.Router();

const CartsController = require("../controllers/carts");

// create or update a new cart
router.post("/carts", (req, res, next) => {
  CartsController.addCarts(req.user, req.body)
    .then((data) => {
      res.json({success: true, data})
    })
    .catch((err) => {
      next(err)
    })
});

// Retrieve cart for the user
router.get('/carts', (req, res, next) => {
  CartsController.getCarts(req.user)
  .then(data => res.json({success: true, data}))
  .catch(next)
})

router.put('/carts/:id', (req, res, next) => {
  CartsController.checkout(req.user, req.params.id)
  .then(data => res.json({success: true, data}))
  .catch(next)
})



module.exports = router;