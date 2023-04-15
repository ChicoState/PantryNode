import React, { useState } from "react";
import QuaggaScanner from "../Components/Quagga/scan";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
} from "@mui/material";



function Scanner() {
  const [camera, setCamera] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const onDetected = (result: string) => {
    setResult(result);
  };

  return (
    <div className="App">
      <h2>{result ? result : "Ready to Scan"}</h2>
      <Button
          variant="contained"
          color="primary"
          onClick={() => setCamera(!camera)}
          sx={{ marginLeft: "auto", paddingRight: 2 }}
          >
         <AddIcon />
        {camera ? "Stop" : "Start"} 
            </Button>
      <div className="container">
        {camera && <QuaggaScanner onDetected={onDetected} />}
      </div>
    </div>
  );
}

export default Scanner;
