/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { Quagga } from "quagga";

const Scanner = () => {
  const handleBarcodeScan = (data: any) => {
    console.log("Barcode detected:", data.codeResult.code);
    // Do something with the barcode data
  };

  const handleBarcodeError = (error: any) => {
    console.error("Barcode error:", error.message);
    // Handle any errors that occur during scanning
  };

  return (
    <div>
      <h1>Barcode Scanner</h1>
      <Quagga
        onDetected={handleBarcodeScan}
        onError={handleBarcodeError}
        style={{ width: "100%", height: "auto" }}
        config={{
          inputStream: {
            name: "Live",
            type: "LiveStream",
            target: "#barcode-scanner",
          },
          decoder: {
            readers: ["ean_reader"],
          },
        }}
      />
      <div id="barcode-scanner"></div>
    </div>
  );
};

export default Scanner;
