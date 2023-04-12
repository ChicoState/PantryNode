import React,{useState} from 'react';

interface DataProps {
  name: string;
  value: number;
}

interface BarChartProps {
  data: DataProps[];

}

function BarChart(props: BarChartProps) { 

  return (
    <h1>Chart</h1>
  );
}

export default BarChart;