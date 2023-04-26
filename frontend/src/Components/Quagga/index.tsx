import React, { useState, useEffect } from "react";
import Quagga from "quagga";
import CameraToggleButton from "./Header";
import { CircularProgress, Stack } from "@mui/material";
import "../../styles/quagga.css";
interface QuaggaScannerProps {
  onDetected: (code: string) => void;
}

const QuaggaScanner: React.FC<QuaggaScannerProps> = ({ onDetected }) => {
  const [cameraOn, setCameraOn] = useState(false);
  const [loadingCamera, setLoadingCamera] = useState(false);
  let quaggaInitialized = false;

  const initQuagga = () => {
    // For more information on Quagga implementation
    // https://serratus.github.io/quaggaJS/
    const config = {
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector("#interactive"),
      },
      decoder: {
        readers: ["ean_reader", "code_128_reader"],
      },
      debug: {
        drawScanline: true,
        showPatter: true,
        drawBoundingBox: true,
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

  useEffect(() => {
    if (cameraOn) {
      startCamera();
    }

    return () => {
      if (quaggaInitialized) {
        // Quagga.stop();
        stopCamera();
      }
    };
  }, [cameraOn]);

  const handleToggleCamera = () => {
    setLoadingCamera((s) => !s);
    setTimeout(() => {
      setLoadingCamera((s) => !s);
      setCameraOn((s) => !s);
    }, 1500);
  };

  return (
    <Stack sx={{ flexDirection: "column", alignItems: "flex-start" }}>
      <CameraToggleButton
        cameraStatus={cameraOn}
        handleToggleCamera={handleToggleCamera}
      />

      {/* This if for loading icon false && true */}
      {!cameraOn && loadingCamera && <CircularProgress />}
      {/* This is for camera true && false */}
      {cameraOn && !loadingCamera && (
        <div id="interactive" className="viewport" />
      )}
    </Stack>
  );
};

export default QuaggaScanner;
