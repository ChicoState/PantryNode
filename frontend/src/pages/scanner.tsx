import React, { useState } from "react";
import QuaggaScanner from "../Components/Quagga/scan";


function Scanner() {
  const [camera, setCamera] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const onDetected = (result: string) => {
    setResult(result);
  };

  return (
    <div className="App">
      <p>{result ? result : "Scanning..."}</p>
      <button onClick={() => setCamera(!camera)}>
        {camera ? "Stop" : "Start"}
      </button>
      <div className="container">
        {camera && <QuaggaScanner onDetected={onDetected} />}
      </div>
    </div>
  );
}

export default Scanner;
