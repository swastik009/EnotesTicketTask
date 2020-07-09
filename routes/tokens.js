const express = require('express');

const {
  getTokens,
  getToken,
  createToken,
  updateToken,
  deleteToken,
} = require('../controllers/tokens');

const router = express.Router();

router.route('/').post(createToken).get(getTokens);

router.route('/:id').get(getToken).put(updateToken).delete(deleteToken);

module.exports = router;
