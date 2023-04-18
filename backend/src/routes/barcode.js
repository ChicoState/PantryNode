var express = require('express');
var router = express.Router();

router.get('/barcode/:barcode', async (req, res) => {
    const barcode_var = req.params.barcode;
    const result = await item.findOne({ where: { barcode_var } });
    
    if (!result) {
      return res.status(404).send('Item not found');
    }
    
    return res.send(result);
  });
  
  module.exports = router;