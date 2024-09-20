import React, { useState, useEffect } from 'react';
import { Box, Text } from "@chakra-ui/react";
import { Line } from 'react-chartjs-2'

const RealTimeLineChart = () => {
  const [data, setData] = useState({
    labels: [], // x-axis labels
    datasets: [{
      label: 'Real-Time Data',
      borderColor: '#B57295',
      backgroundColor: '#db86b2',
      data: [], // y-axis data points
      fill: false,
    }]
  });

  useEffect(() => {
    const formatTime = (date) => {
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    };

    const interval = setInterval(() => {
      const now = new Date();
      const newDataPoint = {
        x: formatTime(now), // Timestamp as x-value
        y: Math.random() * 100 // Random y-value
      };

      setData(prevData => {
        const updatedLabels = [...prevData.labels, newDataPoint.x];
        const updatedData = [...prevData.datasets[0].data, newDataPoint];

        // Keep the chart from becoming too cluttered
        if (updatedLabels.length > 100) {
          updatedLabels.shift();
          updatedData.shift();
        }

        return {
          labels: updatedLabels,
          datasets: [{
            ...prevData.datasets[0],
            data: updatedData
          }]
        };
      });
    }, 1000); // Update every second

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

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


const MyChart = (props) => (
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
    <RealTimeLineChart></RealTimeLineChart>
  </Box>
)

export default MyChart;


