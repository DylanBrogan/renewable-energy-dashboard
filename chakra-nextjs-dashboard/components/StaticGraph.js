import React, { useState, useEffect } from 'react';
import { Box, Text } from "@chakra-ui/react";
import { Line } from 'react-chartjs-2'

const Graph = (props) => {
  const data = {
    labels: props.labels, // x-axis labels
    datasets: [{
      label: props.label,
      borderColor: '#B57295',
      backgroundColor: '#db86b2',
      data: props.data, // y-axis data points
      fill: false,
    }]
  };

  // const chartData = {
    // labels: data.labels,
    // datasets: data.datasets
  // };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'category',
        position: 'bottom',
      },
      y: {
        beginAtZero: false
      }
    },
    animation: {
      duration: 0 // Disable animation for real-time updates
    }
  };

  return <Line data={data} options={options} />;
};


const StaticGraph = (props) => {
    return (
        <Box
          borderWidth="1px" 
          borderRadius="lg" 
          boxShadow="lg" 
          bg="gray.50"
          w={props.w}
          flex = {props.flex}
          p="2.5%"
          h={props.h}
          m={props.m}
        >
          <Text color="gray" fontSize="lg">{props.title}</Text>
          <Graph labels={props.labels} label={props.label} data={props.data} ></Graph>
        </Box>
)
}

export default StaticGraph;


