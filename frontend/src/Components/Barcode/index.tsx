import axiosInstance from "../../util/axiosInstance";

    export default  function lookup(barcode: string) {

        axiosInstance.get("scanner", {'barcode':barcode}).then((res: any) => {
            if(res != "Not found") {
                return res;
            }
        })

        const promptName = window.prompt("Please enter product name", "");
        if (promptName == null || promptName == "" || promptName.length <= 0)
            {
                console.log("Bad Prompt Input");
            }
            
            //send to backend make it do all the fun stuffs
        }
  