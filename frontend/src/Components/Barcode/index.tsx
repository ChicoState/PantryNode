const axios = require("axios");
const csv = require("csv-parser");
const fs = require("fs"); //TO-DO: Link Backend to Frontend
const Sequelize = require("sequelize"); //TO-DO: Link Backend to Frontend

const axiosInstance = axios.create({
    baseURL: "https://world.openfoodfacts.org/api/v2/search?code=",
    timeout: 3000
});

function convertCSVtoJSON(filePath: string): object[] {
    const jsonArray: object[] = [];
  
    fs.createReadStream(filePath)
        .on('error', () => {})
        .pipe(csv())
        .on('data', (row: object) => {console.log(row), jsonArray.push(row)})
        .on('end', () => {})
    
    return jsonArray;
}

function promptData() {
    const promptInput = window.prompt("Item Name and Quantity, separated by a newline:\nName\nAge");
    promptInput;
    if (promptInput != null) {
        const [name, age] = promptInput.split("\n");
        //TO-DO: Sequelize to DB
    } else {
        console.log("Prompt is Null, no entry to DB");
    }  
}

interface DataEntry {
    lookup: (barcode: string) => void;
}

class UPCHandler implements DataEntry {
    
    public async lookup(barcode: string) {
        try {
            var scannedItem = await axiosInstance.get(barcode);
            var itemJSON = scannedItem.data;
            if(itemJSON.product_name_en != undefined) {
                //TO-DO: Sequelize to DB
            } else if (itemJSON.product_name != undefined) {
                //TO-DO: Sequelize to DB
            } else {
                promptData();
            }
            console.log(itemJSON.product_name_en); 
        } catch (error) {
            console.error(error);
        }
    } 
}
  
class PLUHandler implements DataEntry{
    private PLUJson: object[] = convertCSVtoJSON("data/PLUCodes.csv");
    
    public async lookup(barcode: string) {
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
}

class BarcodeProxy implements DataEntry {
    private upcHandler: UPCHandler;
    private pluHandler: PLUHandler;

    constructor(upcHandler: UPCHandler, pluHandler: PLUHandler) {
        this.upcHandler = upcHandler;
        this.pluHandler = pluHandler;
    }

    public lookup(barcode: string) {
        const promptName = window.prompt("Please enter product name", "");

        if (this.checkAccess(barcode) == "UPC") {
            this.upcHandler.lookup(barcode);
        } else if (this.checkAccess(barcode) == "PLU") {
            this.pluHandler.lookup(barcode);
        } else {
            promptName;
            if (promptName == null || promptName == "" || promptName.length <= 0)
            {
                console.log("Bad Prompt Input");
                promptName;
            }
        }
    }

    private checkAccess(barcode: string): string {
        if (barcode.length > 4) {
            return "UPC";
        } else if (barcode.length <= 4) {
            return "PLU";
        } else {
            console.log("Not a valid barcode");
        }
        return "";
    }
}
  
export default BarcodeProxy;