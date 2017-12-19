const swag = require("../models/swag");

module.exports = {
  search: (req, res, next) => {
    const { category } = req.query;
    if (!category) {
      res.status(200).json(swag);
    } else {
      const filteredSwag = swag.filter(e => {
        e.category == category;
      });
      res.status(200).json(filteredSwag);
    }
  }
};
