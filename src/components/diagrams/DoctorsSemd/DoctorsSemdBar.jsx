
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect } from 'react';

const DoctorsSemdBar = ({clear, resultPercent}) => {
  useEffect(() => {
    clear();
  }, [])

  const options = {
    chart: {
      type: 'bar',
      backgroundColor: '#fff',
      reflow: true,
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
      borderRadius: 10,
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