import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect } from 'react';
import xrange from 'highcharts/modules/xrange';

xrange(Highcharts);

const DoctorsSemdBar = ({clear, resultPercent}) => {
  useEffect(() => {
    clear();
  }, [])

  const value = 0.8;
  
  const options = {
    chart: {
      type: 'bar',
      backgroundColor: '#fff',
      reflow: true,
      margin: [0, 0, 0, 100],
      spacing: [10, 10, 15, 10],
    },
    title: null,
    legend: {
      enabled: false,
    },
    gridLineColor: "#fff",
    tooltip: {
      enabled: true,
      useHTML: true,
    },


    xAxis: [{
      // список специальностей массивом
      categories: ['Терапевт', 'Хирург', 'Стоматолог', 'Фтизиатр',],
      title: {
          text: null
      },
      lineColor: "#fcfcfc",
    },
    {
      // список специальностей массивом
      categories: ['Терапевт', 'Хирург', 'Стоматолог', 'Фтизиатр',],
      opposite: true,
      title: {
          text: null
      },
      lineColor: "#fcfcfc",
    }
  
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
      // color: "#009425",
      borderRadius: 15,
      data: [20, 60, 60, 70],
      dataLabels: {
        enabled: true,
      }
      // grouping: false,
      // groupPadding: 0,
      // height: 10,
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

export default DoctorsSemdBar;