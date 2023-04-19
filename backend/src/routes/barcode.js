const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const { item } = require("../models/init-models");

router.get('/barcode', async (req, res) => {
  const barcode = req.query.barcode;
  const result = await item.LookUpbarcode(barcode);

  if (!result) {
    return res.status(404).send('Item not found');
  }
  
  return res.send(result);
});

module.exports = router;