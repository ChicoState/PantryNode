import { Typography } from '@mui/material'
import React from 'react'

type categoryListType = {
  id: Number,
  name: string,
  image_url: string
}
type categoryDataListType = {
  item_id: Number,
  quantity: Number,
  expiration: string,
  person_id: Number,
  first_name: string,
  last_name: string
}

interface SaleTableProps {
  category: categoryListType,
  categorydata: categoryDataListType[],
}

const SaleTable = ({ category, categorydata }: SaleTableProps) => {
  return (
    <div>
      <Typography variant="h6" align="center">
      </Typography>
      <div>
        {categorydata.map((data) => (
          <div>
            <div
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "25px",
                backgroundColor: "#eee8e8",
                margin: "10px",
                borderBottom: "none"
              }}>
              <Typography variant="caption" style={{ position: "absolute", top: "5px", right: "10px" }}>
                Added on: {data.first_name}
              </Typography>
              <Typography style={{ width: "70%" }}>
                <b>apple</b> expiring on <b>22/21/2023</b>
              </Typography>

              <Typography style={{ width: "30%" }}>
                <strong>Stock Quantity: 45</strong>
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SaleTable
