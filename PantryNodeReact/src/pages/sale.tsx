import React, { useEffect } from "react";
import { Box, Button, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import SaleTable from "../Components/Sale/SaleTable";
import axiosInstance from "../util/axiosInstance";

type SaleMetadata = {
  item_id: number;
  quantity: number;
  expiration: string;
  person_id: number;
  first_name: string;
  last_name: string;
  name: string;
  price: number;
};

type SaleData = {
  [k: string]: SaleMetadata[];
};

type Category = {
  id: number;
  name: string;
  image_url: string;
};
const Sale = () => {
  const [categoryList, setCategoryList] = useState<Array<Category>>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [dummyData, setDummyData] = useState<SaleData>({});

  useEffect(() => {
    axiosInstance.get<Category[]>("categories").then((res) => {
      setCategoryList(res as any);
      // if(res.)
    });

    axiosInstance
      .get("sales")
      .then((res) => setDummyData(res as unknown as SaleData))
      .catch((err) => err);
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Grid
        container
        columns={categoryList.length}
        justifyContent={"space-evenly"}
        flexWrap={"wrap"}
        gap={2}
        marginBottom={5}
      >
        {categoryList.map((category) => (
          <Grid key={category.id} item width={"150px"}>
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category)}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "100%",
                backgroundColor:
                  selectedCategory?.id === category.id
                    ? "#f0e1e3"
                    : "transparent",
                color: "#8c2332",
                padding: 2,
                paddingInline: 4,
                borderRadius: "30px",
                "&:hover": { backgroundColor: "#f0e1e3", cursor: "pointer" },
              }}
            >
              <img
                src={category.image_url}
                alt={category.name}
                style={{ width: 50 }}
              />
              <Typography variant="h6" align="center" sx={{}}>
                {category.name}
              </Typography>
            </Button>
          </Grid>
        ))}
      </Grid>
      {selectedCategory && (
        <SaleTable
          category={selectedCategory}
          categorydata={dummyData[selectedCategory.name]}
        />
      )}
    </Box>
  );
};

export default Sale;
