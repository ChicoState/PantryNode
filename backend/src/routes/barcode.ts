var express = require('express');
var router = express.Router();
const { item } = require("../models/init-models");
const axios = require("axios");
var { ensureAuthenticated } = require('../config/auth');

const axiosInstance = axios.create({
  baseURL: "https://world.openfoodfacts.org/api/v2",
  timeout: 3000
});
 
async function UPC_lookup(barcode: string) {
  try {
    var scannedItem = await axiosInstance.get('/search', {params: {code: barcode}});
    var product_name = scannedItem.data.products[0].product_name_en;
    return product_name;
  } catch (error) {
    console.error(error);
    return null;
  }
} 

async function PLU_lookup(barcode: string) {
  let product = await item.LookUpbarcode(barcode);
  if (product !== null){
    return JSON.stringify(product);
  }
  else {
    return null
  }
}

async function update_BarcodeDB() {
  //TO-DO: Sequelize function to update DB based on returned Barcode
  //Note: Will likely need to re-factor current scan design to handle automatic DB updates when scanned
}

router.get('/barcode', ensureAuthenticated, async (req: any, res: any) => {
  if (!req.isAuthenticated()) {
    const errors = [];
    res.post('Unauthenticated');
  } else {
    const barcode = req.query.barcode;
    if (barcode.length > 4) {
      const result = await UPC_lookup(barcode);
      res.send(result);
    } else if (barcode.length === 4) {
      const result = await PLU_lookup(barcode);
      res.send(result);
    } else {
      return res.status(404).send('Item not found');
    }
  }
});

router.post('barcode', ensureAuthenticated, async (req: any, res: any) => {
  //TO-DO: Update backend database with newly-scanned barcodes
});

module.exports = router;