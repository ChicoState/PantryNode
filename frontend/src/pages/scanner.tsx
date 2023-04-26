import React, { useState } from "react";
import { useFormik } from "formik";
import QuaggaScanner from "../Components/Quagga";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useAppSelector } from "../hooks";
import { Button, Typography } from "@mui/material";

function Scanner() {
  // const [camera, setCamera] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const loading = useAppSelector((state) => state.user.status);

  const onDetected = (result: string) => {
    setResult(result);
  };

  const formik = useFormik({
    initialValues: {
      barcode: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="container">
      <QuaggaScanner onDetected={onDetected} />
      <div className="FormInput">
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ mt: 1, maxWidth: "640px" }}>
          {result && (
            <Typography
              variant="subtitle1"
              sx={{
                color: "#989898",
                mb: 3,
              }}>
              Scan Result
              <Typography
                variant="h5"
                sx={{
                  color: "#378306",
                }}>
                {result}
              </Typography>
            </Typography>
          )}
          <TextField
            margin="normal"
            fullWidth
            id="barcode"
            label="Barcode"
            name="barcode"
            autoComplete="barcode"
            // autoFocus
            value={formik.values.barcode || result}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.barcode && formik.errors.barcode !== undefined
            }
            helperText={formik.touched.barcode ? formik.errors.barcode : ""}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            // disabled={!(formik.dirty && formik.isValid)}
            disabled={!(result || formik.values.barcode)}
            sx={{ mt: 3, mb: 2, py: 2 }}
            style={{
              backgroundColor: "primary",
            }}>
            Lookup
            {loading === "loading" && <CircularProgress />}
          </Button>
        </Box>
      </div>
    </div>
  );
}

export default Scanner;