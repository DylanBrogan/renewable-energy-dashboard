import { Box } from "@chakra-ui/react";
import { Pie } from 'react-chartjs-2'


export const PieChart = (props) => {

    const data = {
        labels: ['Battery Charge'],
        datasets: [
          {
            label: 'Sample Pie Chart',
            data: [90, 10], // Data values for each group
            backgroundColor: [
                "#9AE6B4",
                "#F7FAFC"
            ], // Background colors for each segment
            hoverOffset: 4,
          },
        ],
      };


    // Optional: You can customize options for the chart
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
      },
    };

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
            <Pie data={data} options={options} />
        </Box>

    )



}