import { Typography } from '@mui/material'
import React from 'react'

type categoryListType = {
    id: Number,
    name: string,
    image_url: string
  }
  
interface SaleTableProps {
    category: categoryListType
}

const SaleTable = ({category}: SaleTableProps) => {
  return (
    <Typography variant="h6" align="center" sx={{  }}>
    {category.name}
  </Typography>
  )
}

export default SaleTable