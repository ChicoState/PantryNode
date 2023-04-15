import React, { useEffect } from "react";
import Quagga from "quagga";

const Scanner = (props) => {
  const { onDetected } = props;

  useEffect(() => {
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
      }
    });

    Quagga.onDetected((data) => {
      console.log("Quagga detection:", data);
      onDetected(data.codeResult.code);
    });

    return () => {
      Quagga.stop();
    };
  }, [onDetected]);

  return <div id="interactive" className="viewport" />;
};

export default Scanner;
