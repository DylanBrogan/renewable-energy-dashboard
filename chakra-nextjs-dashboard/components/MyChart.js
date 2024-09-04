import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2'

const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
        {
            label: 'My Balance',
            fill: false,
            lineTension: 0.5,
            backgroundColor: '#db86b2',
            borderColor: '#B57295',
            borderCapStyle: 'butt',
            borderDashOffset: 0.0,
            borderJoinStyle: '#B57295',
            pointBorderColor: '#B57295',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#B57295',
            pointHoverBorderColor: '#B57295',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [500, 300, 400, 500, 800, 650, 700, 690, 1000, 1200, 1050, 1300],
        },
    ],
}

const options = {
    maintainAspectRatio: true,
    scales: {
        x: {
            grid: {
                display: false,
            },
        },
        y: {
            grid: {
                borderDash: [3, 3],
            },
            // beginAtZero: true, // this works
        },
    },
    plugins: {
        legend: {
            display: false
        }
    }
}


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
    const interval = setInterval(() => {
      const now = new Date();
      const newDataPoint = {
        x: now.getTime(), // Timestamp as x-value
        y: Math.random() * 100 // Random y-value
      };

      setData(prevData => {
        const updatedLabels = [...prevData.labels, newDataPoint.x];
        const updatedData = [...prevData.datasets[0].data, newDataPoint];

        // Keep the chart from becoming too cluttered
        if (updatedLabels.length > 10) {
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

  const chartData = {
    labels: data.labels,
    datasets: data.datasets
  };

  const options = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
      },
      y: {
        beginAtZero: true
      }
    },
    animation: {
      duration: 0 // Disable animation for real-time updates
    }
  };

  return <Line data={chartData} options={options} />;
};


const MyChart = () => (
    <RealTimeLineChart></RealTimeLineChart>
)

export default MyChart;


