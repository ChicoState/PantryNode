import React from "react";
import { Box, Button, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import SaleTable from "../Components/Sale/SaleTable";

const Sale = () => {

  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 10.99,
      quantity: 10,
      categories: ["Fruits", "Bakery"],
    },
    {
      id: 2,
      name: "Product 2",
      price: 19.99,
      quantity: 22,
      categories: ["Meat"],
    },
    {
      id: 3,
      name: "Product 3",
      price: 5.99,
      quantity: 70,
      categories: ["Vegetables"],
    },
  ];
  

  const categoryList = [
    { id: 1, name: "Fruits", image_url: "/images/icons/fruit.png" },
    { id: 2, name: "Vegetables", image_url: "images/icons/vege.png" },
    { id: 3, name: "Dairy", image_url: "images/icons/dairy.png" },
    { id: 4, name: "Meat", image_url: "images/icons/meat.png" },
    { id: 5, name: "Bakery", image_url: "images/icons/bread.png" },
    { id: 6, name: "Ready", image_url: "images/icons/ready.png" },
    { id: 7, name: "Stationary", image_url: "images/icons/pencil.png" },
  ];

  // const [selectedCategory, setSelectedCategory] = useState(categoryList[0])

  // return (
  //   <Box sx={{ width: '100%' }}>
  //     <Grid container columns={categoryList.length} justifyContent={"space-evenly"} flexWrap={"wrap"} gap={2} marginBottom={5}>
  //       {categoryList.map((category) => (
  //         <Grid key={category.id} item width={"150px"}>
  //           <Button key={category.id} onClick={() => setSelectedCategory(category)} sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", backgroundColor: selectedCategory.id === category.id ? "#f0e1e3" : "transparent", color: "#8c2332", padding: 2, paddingInline: 4, borderRadius: "30px", "&:hover": { backgroundColor: "#f0e1e3", cursor: "pointer", } }} >
  //             <img
  //               src={category.image_url}
  //               alt={category.name}
  //               style={{ width: 50 }}
  //             />
  //             <Typography variant="h6" align="center" sx={{}}>
  //               {category.name}
  //             </Typography>
  //           </Button>
  //         </Grid>
  //       ))}
  //     </Grid>

  //     <SaleTable category={selectedCategory} products={products}/>
  //   </Box>

  // )
  // Sale component

const [selectedCategory, setSelectedCategory] = useState(categoryList[0]);

// Filter the products based on the selected category
const categoryProducts = products.filter((product) =>
  product.categories.includes(selectedCategory.name)
);

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

    {/* Pass the filtered products as a prop to the SaleTable component */}
    <SaleTable category={selectedCategory} products={categoryProducts}/>
  </Box>
);

};

export default Sale;