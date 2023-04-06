import React, { useRef, useEffect } from 'react';
import Quagga from './quagga.js';

//This component creates a video and canvas element 
//using React refs. It then initializes Quagga.js and starts the 
//scanner with the "ean_reader" decoder. When a barcode is detected, 
//the onDetected callback is called with the barcode data. 
//Finally, the component cleans up by stopping the scanner and unsubscribing from the onDetected event.

const BarcodeScanner = ({ onDetected }) => {
  const videoRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: videoRef.current
      },
      decoder: {
        readers: ["ean_reader"]
      }
    }, (err) => {
      if (err) {
        console.error("Failed to initialize Quagga", err);
        return;
      }
      Quagga.start();
      Quagga.onDetected(onDetected);
    });

    return () => {
      Quagga.offDetected(onDetected);
      Quagga.stop();
    };
  }, [onDetected]);

  return (
    <div>
      <video ref={videoRef} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default BarcodeScanner;
