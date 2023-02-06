import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMore from "highcharts/highcharts-more";
import solidGauge from "highcharts/modules/solid-gauge";
import { useEffect } from 'react';

highchartsMore(Highcharts);
solidGauge(Highcharts);

const AppointmentsGauge = ({clear, resultPercent}) => {

  useEffect(() => {
    clear();
  }, [])

  const options = {
    chart: {
      type: 'solidgauge',
      backgroundColor: '#fff',
      // spacingBottom: 3,
      // height: "50%",
      // width: "100%",
      // marginRight: 30,
      // marginBottom: 30,
      // reflow: true
      reflow: true,
    },
  
    title: null,

    pane: {
      // center: ['50%', '50%'],
      // size: '100%',
      // startAngle: -90,
      // endAngle: 90,
      background: {
        backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
        innerRadius: '60%',
        outerRadius: '100%',
        shape: 'arc'
      }
    },
    exporting: {
      enabled: false
    },
  
    tooltip: {
      enabled: false
    },
    // xAxis: {
    //   min: 0,
    //   max: 50,
    // },
  
    // the value axis
    yAxis: {
      stops: [
        [0.1, '#ff0015'], //
        [0.5, '#ffe713'], //
        [0.9, '#009425'] //
      ],
      lineWidth: 0,
      tickWidth: 0,
      minorTickInterval: null,
      tickAmount: 2,
      // title: {
      //   y: -70
      // },
      // labels: {
      //   y: 16
      // },
      min: 0,
      max: 100,
      labels: {
        enabled: false,
      }
      // title: {
      //   text: ''
      // }
    },
  
    plotOptions: {
      solidgauge: {
        dataLabels: {
          enabled: false,
          y: 0,
          borderWidth: 0,
          useHTML: true
        }
      }
    },

  
    series: [{
      name: null,
      data: [resultPercent],
      // dataLabels: {
      //   format:
      //     '<div style="text-align:center">' +
      //     '<span style="font-size:25px">{y}</span><br/>' +
      //     '<span style="font-size:12px;opacity:0.4">%</span>' +
      //     '</div>'
      // },
      tooltip: {
        valueSuffix: ' %'
      }
    }]
  };

  return(
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  )
};

export default AppointmentsGauge;