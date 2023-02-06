import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect } from 'react';

const SemdsMSColumn = ({clear}) => {

  useEffect(() => {
    clear();
  }, []);

  const options = {
    chart: {
      type: 'column',
      backgroundColor: '#fcfcfc',
      height: "100%",
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
      // список специальностей массивом
      categories: ['МСР', 'МСС', 'МСЭ',],
      title: {
          text: null
      },
      lineColor: "#fcfcfc",
    },
  ],
    yAxis: [{
      min: 0,
      max: 1000,
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
    series: [
    {
      color: 'rgba(158, 159, 163, 0.5)',
      pointPlacement: 0.2,
      linkedTo: 'main',
      data: [
        ['МСС', 60],
        ['МСЭ', 200],
        ['МСР', 295]
    ],
      name: 'Предыдущая дата'
    }, 
    
    {
      color: '#009425',
      name: 'Текущая дата',
      id: 'main',
      dataSorting: {
        enabled: true,
        matchByName: true
      },
      dataLabels: [{
        enabled: false,
        inside: true,
        style: {
          fontSize: '16px'
        }
      }],
      data: [
        ['МСС', 45],
        ['МСЭ', 374],
        ['МСР', 634]
    ]
    }]

  };

  return(
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  )
};

export default SemdsMSColumn;