import React from "react";
import { Box, Button, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import SaleTable from "../Components/Sale/SaleTable";

const Sale = () => {

  const categoryList = [
    { id: 1, name: "Fruits", image_url: "/images/icons/fruit.png" },
    { id: 2, name: "Vegetables", image_url: "images/icons/vege.png" },
    { id: 3, name: "Dairy", image_url: "images/icons/dairy.png" },
    { id: 4, name: "Meat", image_url: "images/icons/meat.png" },
    { id: 5, name: "Bakery", image_url: "images/icons/bread.png" },
    { id: 6, name: "Ready", image_url: "images/icons/ready.png" },
    { id: 7, name: "Stationary", image_url: "images/icons/pencil.png" },
  ];

  const dummyData = {
    "Fruits": [
      {
        item_id: 1,
        quantity: 100,
        expiration: "05-07-2023",
        person_id: 5,
        first_name: "sam1",
        last_name: 'stewart',
        name: 'apple',
        price: 500
      },
      { item_id: 2, quantity: 100, expiration: "05-07-2023", person_id: 5, first_name: "sam2", last_name: 'stewart', name: 'apple', price: 500 },
      { item_id: 3, quantity: 100, expiration: "05-07-2023", person_id: 5, first_name: "sam3", last_name: 'stewart', name: 'apple', price: 500 },
      { item_id: 4, quantity: 100, expiration: "05-07-2023", person_id: 5, first_name: "sam4", last_name: 'stewart', name: 'apple', price: 500 },
      { item_id: 5, quantity: 100, expiration: "05-07-2023", person_id: 5, first_name: "sam4", last_name: 'stewart', name: 'apple', price: 500 },
      { item_id: 6, quantity: 100, expiration: "05-07-2023", person_id: 5, first_name: "sam54", last_name: 'stewart', name: 'apple', price: 500 },
      { item_id: 7, quantity: 100, expiration: "05-07-2023", person_id: 5, first_name: "sam5", last_name: 'stewart', name: 'apple', price: 500 },
    ],
    "Vegetables": [

      { item_id: 2, quantity: 100, expiration: "05-07-2023", person_id: 5, first_name: "sam2", last_name: 'stewart', name: 'carrot', price: 500 },
      { item_id: 3, quantity: 100, expiration: "05-07-2023", person_id: 5, first_name: "sam3", last_name: 'stewart', name: 'carrot', price: 500 },
      { item_id: 4, quantity: 100, expiration: "05-07-2023", person_id: 5, first_name: "sam4", last_name: 'stewart', name: 'carrot', price: 500 },
      { item_id: 5, quantity: 100, expiration: "05-07-2023", person_id: 5, first_name: "sam4", last_name: 'stewart', name: 'carrot', price: 500 },
      { item_id: 6, quantity: 100, expiration: "05-07-2023", person_id: 5, first_name: "sam54", last_name: 'stewart', name: 'carrot', price: 500 },
      { item_id: 7, quantity: 100, expiration: "05-07-2023", person_id: 5, first_name: "sam5", last_name: 'stewart', name: 'carrot', price: 500 },
    ],
    "Dairy": [

      { item_id: 2, quantity: 100, expiration: "05-07-2023", person_id: 5, first_name: "sam2", last_name: 'stewart', name: 'Amul', price: 500 },
      { item_id: 3, quantity: 100, expiration: "05-07-2023", person_id: 5, first_name: "sam3", last_name: 'stewart', name: 'Amul', price: 500 },
      { item_id: 4, quantity: 100, expiration: "05-07-2023", person_id: 5, first_name: "sam4", last_name: 'stewart', name: 'Amul', price: 500 },
      { item_id: 5, quantity: 100, expiration: "05-07-2023", person_id: 5, first_name: "sam4", last_name: 'stewart', name: 'Amul', price: 500 },
      { item_id: 6, quantity: 100, expiration: "05-07-2023", person_id: 5, first_name: "sam54", last_name: 'stewart', name: 'Amul', price: 500 },
      { item_id: 7, quantity: 100, expiration: "05-07-2023", person_id: 5, first_name: "sam5", last_name: 'stewart', name: 'Amul', price: 500 },
    ],
    "Meat": [
      { item_id: 2, quantity: 100, expiration: "05-07-2023", person_id: 5, first_name: "sam2", last_name: 'stewart', name: 'chicken', price: 500 },
      { item_id: 3, quantity: 100, expiration: "05-07-2023", person_id: 5, first_name: "sam3", last_name: 'stewart', name: 'chicken', price: 500 },
      { item_id: 4, quantity: 100, expiration: "05-07-2023", person_id: 5, first_name: "sam4", last_name: 'stewart', name: 'chicken', price: 500 },
      { item_id: 5, quantity: 100, expiration: "05-07-2023", person_id: 5, first_name: "sam4", last_name: 'stewart', name: 'chicken', price: 500 },
      { item_id: 6, quantity: 100, expiration: "05-07-2023", person_id: 5, first_name: "sam54", last_name: 'stewart', name: 'chicken', price: 500 },
      { item_id: 7, quantity: 100, expiration: "05-07-2023", person_id: 5, first_name: "sam5", last_name: 'stewart', name: 'chicken', price: 500 },
    ],
    "Bakery": [
      { item_id: 2, quantity: 100, expiration: "05-07-2023", person_id: 5, first_name: "sam2", last_name: 'stewart', name: 'bread', price: 500 },
      { item_id: 3, quantity: 100, expiration: "05-07-2023", person_id: 5, first_name: "sam3", last_name: 'stewart', name: 'bread', price: 500 },
      { item_id: 4, quantity: 100, expiration: "05-07-2023", person_id: 5, first_name: "sam4", last_name: 'stewart', name: 'bread', price: 500 },
      { item_id: 5, quantity: 100, expiration: "05-07-2023", person_id: 5, first_name: "sam4", last_name: 'stewart', name: 'bread', price: 500 },
      { item_id: 6, quantity: 100, expiration: "05-07-2023", person_id: 5, first_name: "sam54", last_name: 'stewart', name: 'bread', price: 500 },
      { item_id: 7, quantity: 100, expiration: "05-07-2023", person_id: 5, first_name: "sam5", last_name: 'stewart', name: 'bread', price: 500 },
    ],
    "Ready": [
      { item_id: 2, quantity: 100, expiration: "05-07-2023", person_id: 5, first_name: "sam2", last_name: 'stewart', name: 'burger', price: 500 },
      { item_id: 3, quantity: 100, expiration: "05-07-2023", person_id: 5, first_name: "sam3", last_name: 'stewart', name: 'burger', price: 500 },
      { item_id: 4, quantity: 100, expiration: "05-07-2023", person_id: 5, first_name: "sam4", last_name: 'stewart', name: 'burger', price: 500 },
      { item_id: 5, quantity: 100, expiration: "05-07-2023", person_id: 5, first_name: "sam4", last_name: 'stewart', name: 'burger', price: 500 },
      { item_id: 6, quantity: 100, expiration: "05-07-2023", person_id: 5, first_name: "sam54", last_name: 'stewart', name: 'burger', price: 500 },
      { item_id: 7, quantity: 100, expiration: "05-07-2023", person_id: 5, first_name: "sam5", last_name: 'stewart', name: 'burger', price: 500 },
    ],
    "Stationary": [
      { item_id: 2, quantity: 100, expiration: "05-07-2023", person_id: 5, first_name: "sam2", last_name: 'stewart', name: 'cereals', price: 500 },
      { item_id: 3, quantity: 100, expiration: "05-07-2023", person_id: 5, first_name: "sam3", last_name: 'stewart', name: 'cereals', price: 500 },
      { item_id: 4, quantity: 100, expiration: "05-07-2023", person_id: 5, first_name: "sam4", last_name: 'stewart', name: 'cereals', price: 500 },
      { item_id: 5, quantity: 100, expiration: "05-07-2023", person_id: 5, first_name: "sam4", last_name: 'stewart', name: 'cereals', price: 500 },
      { item_id: 6, quantity: 100, expiration: "05-07-2023", person_id: 5, first_name: "sam54", last_name: 'stewart', name: 'cereals', price: 500 },
      { item_id: 7, quantity: 100, expiration: "05-07-2023", person_id: 5, first_name: "sam5", last_name: 'stewart', name: 'cereals', price: 500 },
    ]
  };



  const [selectedCategory, setSelectedCategory] = useState(categoryList[0])

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container columns={categoryList.length} justifyContent={"space-evenly"} flexWrap={"wrap"} gap={2} marginBottom={5}>
        {categoryList.map((category) => (
          <Grid key={category.id} item width={"150px"}>
            <Button key={category.id} onClick={() => setSelectedCategory(category)} sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", backgroundColor: selectedCategory.id === category.id ? "#f0e1e3" : "transparent", color: "#8c2332", padding: 2, paddingInline: 4, borderRadius: "30px", "&:hover": { backgroundColor: "#f0e1e3", cursor: "pointer", } }} >
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
      <SaleTable category={selectedCategory} categorydata={dummyData[selectedCategory.name]} />
    </Box>

  )
};

export default Sale;
