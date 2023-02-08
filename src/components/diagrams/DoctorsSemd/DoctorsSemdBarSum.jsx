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
  // settings for current bar
  series: [{
    type: "bar",
    name: null,
    // color: "#009425",
    colorByPoint: true,
    borderRadius: 10,
    dataLabels: {
      enabled: true,
    },
    data: [90],
    events: {
      click: () => {console.log('clicked')},
    },
    // shadow: {
    //   color: "black",
    //   offsetX: 2,
    //   offsetY: 2,
    // }
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