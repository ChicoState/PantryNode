var express = require('express');
var router = express.Router();

// Define the route GET function
router.get('/barcode/:barcode_num', async (req, res) => {
    const barcode_num = req.params.barcode_num;
    const result = await item.findOne({ where: { barcode_num } });
    
    if (!result) {
      // Return 404 if no item was found with the given barcode number
      return res.status(404).send('Item not found');
    }
    
    // Return the item object if it exists
    return res.send(result);
  });
  
  module.exports = router;