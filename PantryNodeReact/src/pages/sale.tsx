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

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import Paper from '@mui/material/Paper';

const sale = () => {

  const categories = [
    { id: 1, category_name: "Fruits", image_url: "images/icons/fruit.png"},
    { id: 2, category_name: "Vegetables", image_url: "images/icons/vege.png" },
    { id: 3, category_name: "Dairy", image_url: "images/icons/book.png" },
    { id: 4, category_name: "Meat", image_url: "images/icons/meat.png" },
    { id: 5, category_name: "Bakery", image_url: "images/icons/bread.png" },
    { id: 6, category_name: "Ready", image_url: "images/icons/ready.png" },
    { id: 7, category_name: "Stationary", image_url: "images/icons/pencil.png" },
  ];

  return (
    <Box >
    <Grid container spacing={2}>
     <Grid item xs={2} md={8}>
       
        {categories.map((item) => (
          <div>
            <img src={item.image_url} />
            {item.category_name}
          </div>
        ))}
        
      </Grid>
    </Grid>
  </Box>

)};

export default sale;
