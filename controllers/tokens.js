const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const Token = require('../models/Token');
const { query } = require('express');

// @desc    GET tokens
// @route   GET /api/v1/tokens
// @access  Public
exports.getTokens = asyncHandler(async (req, res, next) => {
  const tokens = await Token.find().sort({ createdAt: -1 });
  return res.status(200).json({
    success: true,
    count: tokens.length,
    data: tokens,
  });
});

// @desc    GET Single token
// @route   GET /api/v1/token/:id
// @access  Public
exports.getToken = asyncHandler(async (req, res, next) => {
  const token = await Token.findById(req.params.id);
  return res.status(200).json({
    success: true,
    count: token.length,
    data: token,
  });
});

// @desc    Create tokens
// @route   POST /api/v1/tokens
// @access  Public
exports.createToken = asyncHandler(async (req, res, next) => {
  req.body.tokens = await getNumber(req.body.initials);
  //make sure a value was passed from the form
  if (req.body.taskAssign) {
    //If only one value is passed it won't be an array, so you need to create one
    req.body.taskAssign = Array.isArray(req.body.taskAssign)
      ? req.body.taskAssign
      : [req.body.taskAssign];
  }
  console.log(req.body.tokens);

  const tokens = await Token.create(req.body);

  return res.status(200).json({
    success: true,
    count: tokens.length,
    data: tokens,
  });
});

// @desc    Update tokens
// @route   PUT /api/v1/tokens/:id
// @access  Public
exports.updateToken = asyncHandler(async (req, res, next) => {
  delete req.body.tokens;
  let token = await Token.findById(req.params.id);

  if (!token) {
    return next(
      new ErrorResponse(`No review with the id of ${req.params.id}`, 404)
    );
  }

  token = await Token.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: token,
  });
});

// @desc    delete tokens
// @route   DELETE /api/v1/tokens/:id
// @access  Public
exports.deleteToken = asyncHandler(async (req, res, next) => {
  const tokens = await Token.findOneAndDelete({ _id: req.params.id });
  return res.status(200).json({
    success: true,
    data: {},
  });
});

//Generate 4 digit number
async function getNumber(initials) {
  let n = `${initials}-${Math.floor(1000 + Math.random() * 9000)}`;
  const token = await Token.findOne({ number: n }, function (err, result) {
    if (err) return err;
    else if (result) return getNumber(initials);
    else return n;
  });
  return n;
}
