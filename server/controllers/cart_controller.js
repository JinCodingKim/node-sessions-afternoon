const swag = require("../models/swag");

module.exports = {
  add: (req, res, next) => {
    const { id } = req.query;
    const { user } = req.session;
    //this will return -1 if it isnt in the cart
    const index = user.cart.findIndex(e => e.id == id);
    if (index === -1) {
      const swagObj = swag.find(e => e.id == id);
      user.cart.push(swagObj);
      user.total += swagObj.price;
    }
    res.status(200).json(user);
  },
  remove: (req, res, next) => {
    const { id } = req.query;
    const { user } = req.session;
    const swagObj = swag.find(e => e.id == id);
    if (swagObj) {
      const index = user.cart.findIndex(e => e.id == id);
      user.cart.splice(index, 1);
      user.total -= swagObj.price;
    }
    res.status(200).json(user);
  },
  checkout: (req, res, next) => {
    const { user } = req.session;
    user.cart = [];
    user.total = 0;
    res.status(200).json(user);
  }
};
