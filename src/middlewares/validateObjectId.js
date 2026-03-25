const mongoose = require('mongoose');

module.exports = (paramName = 'id') => (req, res, next) => {
  const value = req.params[paramName] || req.body[paramName];

  if (!mongoose.Types.ObjectId.isValid(value)) {
    return res.status(400).json({
      success: false,
      message: `Invalid ${paramName}`
    });
  }

  next();
};
