import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect } from 'react';

const DoctorsSemdBarSum = ({clear, resultPercent}) => {
  useEffect(() => {
    clear();
  }, [])

  const options = {
    chart: {
      type: 'bar',
      backgroundColor: '#fff',
      height: "10%",
    },
    title: null,
    legend: {
      enabled: false,
    },
    gridLineColor: "#fcfcfc",
    tooltip: {
      enabled: true,
      useHTML: true,
    },


    xAxis: [{
      categories: ['Врач'],
      title: {
          text: null
      },
      lineColor: "#fcfcfc",
    },
  ],
    yAxis: [{
      min: 0,
      max: 100,
      title: {
          text: '%',
          align: 'middle',
          enabled: false,
      },
      labels: {
          enabled: false,
          overflow: 'justify'
      },
      gridLineColor: "#fcfcfc",
    },
  ],


    credits: {
      enabled: false,
    },
    series: [{
      type: "bar",
      name: null,
      color: "#009425",
      data: [90]
      },
    ]

  };

  return(
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  )
};

export default DoctorsSemdBarSum;