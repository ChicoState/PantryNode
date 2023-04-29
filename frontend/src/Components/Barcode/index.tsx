import openFFInstance from "../../util/openFFInstance"; //for handling authorized requests

export default  function lookup(barcode: string) {
    let openFFData: any;

    openFFInstance.get(`/search?code=${barcode}`)
    .then(response => {
      console.log("Response Data: " + response.data);
      openFFData = response.data;
    })
    .catch(error => {
      console.log("Error in Scanner: " + error);
    });

    console.log("Found the data: " + openFFData);

    const promptName = window.prompt("Please enter product name", "");
    if (promptName == null || promptName == "" || promptName.length <= 0)
    {
        console.log("Bad Prompt Input");
    }
            
    //send to backend make it do all the fun stuffs
}
  