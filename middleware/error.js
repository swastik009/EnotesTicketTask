const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  //console.log
  console.log(err);

  let error = {
    success: false,
    error: err.message || 'Server Error',
  };

  //Mongoose bad OjbectId
  if (err.name === 'CastError') {
    const message = `Resource not found`;
    err = new ErrorResponse(message, 404);
    error.error = err.message;
  }

  //for duplocate
  if (err.code === 11000) {
    const message = `Duplicate field value entered`;
    //do this before err is assigned to newly form object by ErrorResponse
    error.fields = Object.keys(err.keyPattern);

    err = new ErrorResponse(message, 400);
    error.error = err.message;
  }

  return res.status(err.statusCode || 500).json(error);
};

module.exports = errorHandler;
