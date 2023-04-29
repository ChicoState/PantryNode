var express = require('express');
var router = express.Router();
const { item } = require("../models/init-models");
const axios = require("axios");

const axiosInstance = axios.create({
  baseURL: "https://world.openfoodfacts.org/api/v2/search?code=",
  timeout: 3000
});


  
async function UPC_lookup(barcode: string) {
    try {
        var scannedItem = await axiosInstance.get(barcode);
        var itemJSON = scannedItem.data;
        console.log(itemJSON.product_name_en); 
    } catch (error) {
        console.error(error);
    }
} 

async function PLU_lookup(barcode: string) {
    let temp = item.LookUpbarcode(barcode);
    console.log(temp);
      //TO-DO: Dependent on Backend
      //const PLUResult = this.PLUJson.find((row) => row.PLU === barcode);
      try {
          /*if(PLUResult == barcode) {
              //TO-DO: Sequelize to DB
          } else {
              promptData();    
          }*/
      } catch (error) {
          console.error(error);
      }
  }

router.get('/barcode', async (req: any, res: any) => {
  const barcode = req.query.barcode;
  if (barcode.length > 4) {
    const result = await UPC_lookup(barcode);
    console.log(result);
    res.send(result);
} else if (barcode.length <= 4) {
    const result = await PLU_lookup(barcode);
    console.log(result);
    res.send(result);
}
  else {
    return res.status(404).send('Item not found');
  }
   
});

module.exports = router;