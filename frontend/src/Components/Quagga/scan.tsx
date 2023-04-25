import React, { useState, useEffect } from "react";
import Quagga from "quagga";
import CameraToggleButton from "./CameraToggleButton";
import { CircularProgress, Stack } from "@mui/material";

interface ScannerProps {
  onDetected: (code: string) => void;
}

const Scanner: React.FC<ScannerProps> = ({ onDetected }) => {
  const [cameraOn, setCameraOn] = useState(false);
  const [loadingCamera, setLoadingCamera] = useState(true);
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
      setLoadingCamera(false);
      setCameraOn(true);
    };
    // eslint-disable-next-line
    const stopCamera = () => {
      Quagga.stop();
      setLoadingCamera(false);
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
    setLoadingCamera((s) => !s);
    setTimeout(() => {
      setLoadingCamera((s) => !s);
      setCameraOn((s) => !s);
    }, 1000);
  };

  return (
    <Stack sx={{ flexDirection: "column", alignItems: "flex-start" }}>
      <CameraToggleButton
        cameraStatus={cameraOn}
        handleToggleCamera={handleToggleCamera}
      />

      <CircularProgress />
      <div id="interactive" className="viewport" />
    </Stack>
  );
};

export default Scanner;
