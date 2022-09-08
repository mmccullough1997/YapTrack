/* eslint-disable quotes */
/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import { Chart } from 'react-google-charts';

export default function mySpending() {
  const data = [
    ['Task', 'Hours per Day'],
    ['Work', 11],
    ['Eat', 2],
    ['Commute', 2],
    ['Watch TV', 2],
    ['Sleep', 7],
  ];

  return (
    <Chart
      chartType="PieChart"
      data={data}
      width={"100%"}
      height={"100%"}
    />
  );
}
