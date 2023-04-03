import React from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const sale = () => {


  const categories = [
    { id: 1, category_name: "Fruits", image_url: "/images/icons/fruit.png" },
    { id: 1, category_name: "Vegetables", image_url: "/images/icons/vege.png" },
    { id: 1, category_name: "Dairy", image_url: "/images/icons/fruit.png" },
    { id: 1, category_name: "Meat", image_url: "/images/icons/meat.png" },
    { id: 1, category_name: "Bakery", image_url: "/images/icons/bread.png" },
    { id: 1, category_name: "Ready", image_url: "/images/icons/ready.png" },
    { id: 1, category_name: "Stationary", image_url: "/images/icons/pencil.png" },
  ];


  //return <div>Sales Report</div>;

  return (
    <Container component="main" maxWidth="xs">
      <Grid container spacing={3}>
        {categories.map((category) => (
            <Grid item xs={12} sm={8} md={4} key={category.id}>
              <Card className="">
                <CardMedia
                  className=""
                  image={process.env.PUBLIC_URL + category.image_url}
                  title={category.category_name}
                />
                <CardContent>
                  <Typography variant="h6" align="center" gutterBottom>
                    {category.category_name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );

};

export default sale;
