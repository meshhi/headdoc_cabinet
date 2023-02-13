import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useRef } from 'react';
import highChartsTilemap from 'highcharts/modules/tilemap';
import highChartsHeatmap from 'highcharts/modules/heatmap'
import highchartsMore from 'highcharts/highcharts-more';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointments, fetchMoList } from '../../store/slices/ActionCreators';
import dateConverter from '../../utils/dateConverter';
import { moMap } from '../../utils/moMap'

highchartsMore(Highcharts);
highChartsHeatmap(Highcharts);
highChartsTilemap(Highcharts);

const TileMap = ({clear, setCurrentMo, indicator}) => {
  const dispatch = useDispatch();
  const {mapDate} = useSelector(state => state.diagramDates)

  // basis state to render map detalization
  const {moList, isLoading, error} = useSelector(state => state.moList);
  const {appointments, isLoading: isLoadingAppointments, error: errorAppointments} = useSelector(state => state.appointments)
  const currentMo = useSelector(state => {
    const currentMoId = state.moList.currentMoId;
    const currentMoName = state.moList.currentMoName;
    return {label: currentMoName, id: currentMoId };
  });

  const regex = new RegExp('".*"');
  const moListChoose = useSelector(state => {
    const moList = state.moList.moList
      .filter(mo => mo.id === 417 || mo.parent === 417)
      .map(mo => {
          for (let item of moMap) {
            if (item.id === mo.id) {
              return item;
            }
          }

          // return {
          //   'hc-a2': mo.name.match(regex),
          //   // 'hc-a2': moNameReduced,
          //   // 'hc-a2': mo.name.slice(-10),
          //   name: mo.name,
          //   // region: 'West',
          //   id: mo.id,
          //   // x: coordController.x,
          //   // y: coordController.y,
          //   value: -1,
          // }
        }
      )

    const returnAppointmentsMo = () => {
      const appointmentsMo = moList.map(mo => {
        for (let appointmentRecord of state.appointments.appointments) {
          if (mo.id === appointmentRecord.mo.id) {
            mo.value = Number(appointmentRecord.percent.toFixed(2));
            break;
          }
        }
        return mo;
      })

      console.log(appointmentsMo);

      return appointmentsMo;
    }

    const returnDoctorsSemd = () => {
      const appointmentsMo = moList.map(mo => {
        for (let appointmentRecord of state.appointments.appointments) {
          if (mo.id === appointmentRecord.mo.id) {
            mo.value = appointmentRecord.percent - 100;
            break;
          }
        }
        return mo;
      })

      return appointmentsMo;
    }

    const returnSemdsMS = () => {
      const appointmentsMo = moList.map(mo => {
        for (let appointmentRecord of state.appointments.appointments) {
          if (mo.id === appointmentRecord.mo.id) {
            mo.value = appointmentRecord.percent - 100;
            break;
          }
        }
        return mo;
      })

      return appointmentsMo;
    }

    switch(indicator) {
      case(1):
        return returnAppointmentsMo()
      case(2):
        return returnDoctorsSemd()
      case(3):
        return returnSemdsMS()
      default:
        return returnAppointmentsMo()
    }
  });

  useEffect(() => {
    clear();
    dispatch(fetchMoList());
    dispatch(fetchAppointments({
      date: dateConverter.dateToStrForRequest(mapDate),
    }));
  }, []);

  useEffect(() => {
    clear();
    dispatch(fetchAppointments({
      date: dateConverter.dateToStrForRequest(mapDate),
    }));
  }, [mapDate]);

  const linkRef = useRef(null);


  const options = {
    chart: {
        type: 'tilemap',
        inverted: false,
        height: '100%',
        // width: '200%'
    },

    accessibility: {
        description: 'Map of Arkhangelsk region indicators',
        point: {
            valueDescriptionFormat: '{xDescription}, indicator {point.value}.'
        }
    },

    title: {
      enabled: false,
      text: null
    },
    legend: false,
    // subtitle: {
    //     text: 'Source:<a href="https://simple.wikipedia.org/wiki/List_of_U.S._states_by_population">Wikipedia</a>'
    // },

    xAxis: {
        visible: false
    },

    yAxis: {
        visible: false
    },

    colorAxis: {
        dataClasses: [{
          from: -1,
          to: -1,
          color: '#c9c9c9',
          name: 'Нет данных'
        },
        {
            from: 0,
            to: 50,
            color: '#ff0000',
            name: '0-50%'
        }, {
            from: 50,
            to: 80,
            color: '#fff600',
            name: '51-80%'
        }, {
            from: 80,
            to: 100,
            color: '#19ff00',
            name: '81-100%'
        },]
    },

    tooltip: {
        headerFormat: '',
        pointFormat: '<b> {point.name} {point.value}%</b>'
    },

    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                format: '{point.hc-a2}',
                color: '#000000',
                style: {
                    textOutline: false
                }
            },
            events: {
              click: (event) => {
                dispatch(setCurrentMo({id: event.point.options.id, name: event.point.options.name}))
                linkRef.current.click()
              }
            }
        }
    },

    series: [{
        name: '',
        data: moListChoose,
        // data: moMap,
        cursor: 'pointer',
    }]
}

  return(
    <>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />  
      <Link to="/details" ref={linkRef}></Link>
    </>
  )
};

export default TileMap;