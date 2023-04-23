import React, { useState, useEffect } from "react";
import Quagga from "quagga";

interface ScannerProps {
  onDetected: (code: string) => void;
}

const Scanner: React.FC<ScannerProps> = ({ onDetected }) => {
  const [cameraOn, setCameraOn] = useState(false);

  useEffect(() => {
    let quaggaInitialized = false;

    const initQuagga = () => {
      const config = {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#interactive"),
        },
        decoder: {
          readers: ["ean_reader"],
        },
      };

      Quagga.init(config, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Quagga initialization succeeded");
          Quagga.start();
          quaggaInitialized = true;
        }
      });

      Quagga.onDetected((data) => {
        console.log("Quagga detection:", data);
        onDetected(data.codeResult.code);
      });
    };

    const startCamera = () => {
      if (!quaggaInitialized) {
        initQuagga();
      } else {
        Quagga.start();
      }
      setCameraOn(true);
    };
    // eslint-disable-next-line
    const stopCamera = () => {
      Quagga.stop();
      setCameraOn(false);
    };

    if (cameraOn) {
      startCamera();
    }

    return () => {
      if (quaggaInitialized) {
        Quagga.stop();
      }
    };
  }, [cameraOn, onDetected]);

  const handleToggleCamera = () => {
    if (cameraOn) {
      setCameraOn(false);
    } else {
      setCameraOn(true);
    }
  };

  return (
    <div>
      <button onClick={handleToggleCamera}>
        {cameraOn ? "Stop" : "Start"} Camera
      </button>
      <div id="interactive" className="viewport" />
    </div>
  );
};

export default Scanner;
