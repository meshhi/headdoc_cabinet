import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect } from 'react';
import xrange from 'highcharts/modules/xrange';

xrange(Highcharts);

const XrangeMock = ({clear, resultPercent}) => {
  const value = 0.2;

  const options = {
    chart: {
      type: 'xrange',
      backgroundColor: '#fff',
      height: 70,
      margin: [-2, 0, 0, 0],
      spacing: [0, 0, 0, 0],
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
      // height: 90,
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
        partialFill: value, //
        dataLabels: {
          enabled: true,
        },
        color: "#d6d6d6", //background color
      }],
      label: {
        enabled: true,
        onArea: false,
        useHTML: true,
      },
      name: 'test',
      partialFill: {
        fill: value < 0.2 ? "#ff5b60" : value < 0.7 ? "#ffc372" : "#00db9d" //graph color
      }
    }]
  }

  return(
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  )
}

export default XrangeMock;