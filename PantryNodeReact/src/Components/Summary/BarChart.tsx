import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer  } from 'recharts';

interface DataProps {
  name: string;
  value: number;
}

interface BarChartProps {
  data: DataProps[];

}

function SummaryBarChart(props: BarChartProps) {
  const { data } = props;
  
  return (
    <>
    <ResponsiveContainer width="100%" height={300}>
    <BarChart width={500} height={300} data={data} >
      <XAxis dataKey="name" />
      <YAxis label={{ value: 'Quantity',angle: -90, position: 'insideLeft' }} />
      <CartesianGrid stroke="#ccc" />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#8C2332" />
    </BarChart>
    </ResponsiveContainer>
   
   
    </>
  );
}

export default SummaryBarChart;