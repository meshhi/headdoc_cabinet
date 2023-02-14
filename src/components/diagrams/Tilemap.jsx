import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import highChartsTilemap from 'highcharts/modules/tilemap';
import highChartsHeatmap from 'highcharts/modules/heatmap'
import highchartsMore from 'highcharts/highcharts-more';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointments, fetchMoList } from '../../store/slices/ActionCreators';
import dateConverter from '../../utils/dateConverter';
import { moMap } from '../../utils/moMap'
import Snackbar from '../indicator_pages/indicator_helpers/Snackbar'

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

  // generate data for tilemap diagram
  const moListChoose = useSelector(state => {
    const moList = state.moList.moList
      .filter(mo => mo.id === 417 || mo.parent === 417)
      .map(mo => {
          for (let item of moMap) {
            if (item.id === mo.id) {
              return item;
            }
          }
        }
      )

    // count values for appointments
    const returnAppointmentsMo = () => {
      if (state.appointments.appointments.length == 0) {
        return moList.map(mo => {
            mo.value = -1;
            return mo
          }
        );
      }

      const appointmentsMo = moList.map(mo => {
        for (let appointmentRecord of state.appointments.appointments) {
          if (mo.id === appointmentRecord.mo.id) {
            mo.value = Number(appointmentRecord.percent.toFixed(2));
            break;
          }
        }
        return mo;
      })

      return appointmentsMo;
    }

    // count values for doctor semds
    const returnDoctorsSemd = () => {
      if (state.appointments.appointments.length == 0) {
        return moList.map(mo => {
            mo.value = -1;
            return mo
          }
        );
      }
      
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

    // count values for ms stat
    const returnSemdsMS = () => {
      if (state.appointments.appointments.length == 0) {
        return moList.map(mo => {
            mo.value = -1;
            return mo
          }
        );
      }

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

  const [isSnack, setIsSnack] = useState(false)

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

  useLayoutEffect(() => {
    if (appointments.length) {
      setIsSnack(false);
    } else {
      setIsSnack(true);
    }
  }, [appointments])

  const linkRef = useRef(null);


  const options = {
    chart: {
        type: 'tilemap',
        inverted: false,
        height: (9 / 16 * 100) + '%',
        // width: 1000,
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
      <Snackbar mustBeOpen={isSnack}/>
    </>
  )
};

export default TileMap;