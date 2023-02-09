import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect } from 'react';
import xrange from 'highcharts/modules/xrange';

xrange(Highcharts);

const DoctorsSemdBarSum = ({clear, resultPercent}) => {
  useEffect(() => {
    clear();
  }, [])

  const options = {
    chart: {
      type: 'xrange',
      backgroundColor: '#fff',
      // borderWidth: 2,
      // borderColor: '#335cad',
      height: 100,
      margin: [0, 0, 0, 0],
      spacing: [0, 0, 0, 0]

    },
    title: null,
    legend: {
      enabled: false,
    },
    xAxis: {
      visible: false,
    },
    yAxis: {
      visible: false,
      height: 90,
      offset: 0,
    },
    gridLineColor: "#fcfcfc",
    tooltip: {
      enabled: false,
      useHTML: false,
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      xrange: {
        borderRadius: 15,
      }
    },
    series: [{
      type: 'xrange',
      data: [{
        x: 0,
        x2: 100,
        partialFill: 0.25, //
        dataLabels: {
          enabled: false,
        },
        color: "#d6d6d6", //background color
      }],
      partialFill: {
        fill: "#3f50b5" //graph color
      }
    }]
  }

  return(
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  )
};

export default DoctorsSemdBarSum;