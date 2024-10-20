import React, { useState } from 'react';
import { Box, Text, Flex, Button, Popover, PopoverTrigger, PopoverContent, PopoverBody } from "@chakra-ui/react";
import { Line } from 'react-chartjs-2'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

// This is just the graph
const Graph = (props) => {

  const filteredLabels = [];
  const filteredData = []; 
  for (let i = 0; i < props.labels.length; i++) {
    // Replace slashes with dashes for consistent date format
    const formattedDateString = props.labels[i].replace(/\//g, '-');

    // Parse the formatted date string
    const currentDate = new Date(formattedDateString);

    // Check if the date is valid before comparing
    if (!isNaN(currentDate.getTime())) {
      // Check if the currentDate is within the date range
      if (currentDate >= props.startDate && currentDate <= props.endDate) {
        filteredLabels.push(props.labels[i]); 
        filteredData.push(props.data[i]); 
      }
    }
  }
  console.log(filteredData);

  const data = {
    labels: filteredLabels, // x-axis labels
    datasets: [{
      label: props.label,
      borderColor: props.borderColor,
      backgroundColor: props.backgroundColor,
      data: filteredData, // y-axis data points
      fill: false,
    }]
  };

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
      duration: 0 
    }
  };

  return <Line data={data} options={options}  />;
};

// This is the exported block
const StaticGraph = (props) => {
  // Use State
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  console.log(startDate); 
    return (
        <Box
          borderWidth="1px" 
          borderRadius="lg" 
          boxShadow="lg" 
          bg="gray.50"
          w={props.w}
          flex = {props.flex}
          p="3%"
          h={props.h}
          m={props.m}
        >
          <Flex
            flexDir="row"
            justifyContent="space-between"
          >
            <Text color="gray" fontSize="lg">{props.title}</Text>
            <Box>
              <Popover
                placement="top"
              >
                <PopoverTrigger>
                  <Button 
                    size="sm"
                    bg="gray.200"
                    boxShadow="sm"
                    mr={4}
                  >
                    Start Date
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  width="xsm"
                  height="xsm"
                >
                  <PopoverBody>
                    <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showTimeSelect
                    dateFormat="Pp"
                    timeIntervals={60}
                    inline 
                    />
                  </PopoverBody>
                </PopoverContent>
              </Popover>

              <Popover
                placement="top"
              >
                <PopoverTrigger>
                  <Button 
                    size="sm"
                    bg="gray.200"
                    boxShadow="sm"
                  >
                    End Date
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  width="xsm"
                  height="xsm"
                >
                  <PopoverBody>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      showTimeSelect
                      dateFormat="Pp"
                      timeIntervals={60}
                      inline 
                      minDate={startDate}
                    />
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
          </Flex>
          <Graph startDate = {startDate} endDate = {endDate} labels={props.labels} label={props.label} data={props.data} borderColor={props.borderColor} backgroundColor={props.backgroundColor}></Graph>
        </Box>
)
}

export default StaticGraph;


