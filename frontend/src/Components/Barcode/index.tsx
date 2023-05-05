import axiosInstance from "../../util/axiosInstance";

export default async function lookup(code: string) {
  const openFFData = await axiosInstance.get("/barcode", {params: {barcode: code}})
    .then((res: any) => {
      return res;
    })
    .catch(error => {
      console.log("Error in Scanner: " + error);
    });
  if (openFFData !== "") {
    console.log("Found the data: ");
    console.log(openFFData);
    return openFFData;
  }
  else {
    console.log("Product not found");
    const promptName = window.prompt("Please enter product name", "");
    if (promptName === null || promptName === "" || promptName.length <= 0)
    {
      console.log("Bad Prompt Input");
    }
  }
    
            
  //send to backend make it do all the fun stuffs
}
  