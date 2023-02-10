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

  const coordController = {
    x: -1,
    y: -1,
  }
  const regex = new RegExp('".*"');
  const moListChoose = useSelector(state => {

    const moList = state.moList.moList
      .filter(mo => mo.id === 417 || mo.parent === 417)
      .map(mo => {
          coordController.x++;

          if (coordController.x + 1 === 11) {
            coordController.x = -1;
            coordController.y++;
          }

          return {
            'hc-a2': mo.name.match(regex),
            // 'hc-a2': mo.name.slice(-10),
            name: mo.name,
            // region: 'West',
            id: mo.id,
            x: coordController.x,
            y: coordController.y,
            // value: 202,
          }
        }
      )

      debugger
      switch(indicator) {
        case(1):
          const appointmentsMo = moList.map(mo => {
            for (let appointmentRecord of state.appointments.appointments) {
              if (mo.id === appointmentRecord.mo.id) {
                mo.value = appointmentRecord.percent;
              }
              return mo;
            }
          })
          console.log(appointmentsMo)
          return appointmentsMo;
        case(2):
          return
        case(3):
          return
        default:
          return
      }

    
  });

  useEffect(() => {
    clear();
    dispatch(fetchMoList());
    dispatch(fetchAppointments({
      date: dateConverter.dateToStrForRequest(mapDate),
    }));
  }, []);

  const linkRef = useRef(null);


  const options = {
    chart: {
        type: 'tilemap',
        inverted: true,
        height: '100%'
    },

    accessibility: {
        description: 'A tile map represents the states of the USA by population in 2016. The hexagonal tiles are positioned to geographically echo the map of the USA. A color-coded legend states the population levels as below 1 million (beige), 1 to 5 million (orange), 5 to 20 million (pink) and above 20 million (hot pink). The chart is interactive, and the individual state data points are displayed upon hovering. Three states have a population of above 20 million: California (39.3 million), Texas (27.9 million) and Florida (20.6 million). The northern US region from Massachusetts in the Northwest to Illinois in the Midwest contains the highest concentration of states with a population of 5 to 20 million people. The southern US region from South Carolina in the Southeast to New Mexico in the Southwest contains the highest concentration of states with a population of 1 to 5 million people. 6 states have a population of less than 1 million people; these include Alaska, Delaware, Wyoming, North Dakota, South Dakota and Vermont. The state with the lowest population is Wyoming in the Northwest with 584,153 people.',
        point: {
            valueDescriptionFormat: '{xDescription}, population {point.value}.'
        }
    },

    title: {
      enabled: false,
      text: 'МО карта'
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
            from: 0,
            to: 50,
            color: '#3f50b5',
            name: ''
        }, {
            from: 51,
            to: 80,
            color: '#FFC428',
            name: '1M - 5M'
        }, {
            from: 81,
            to: 300,
            color: '#FF7987',
            name: '5M - 20M'
        }, {
            from: 100,
            color: '#FF2371',
            name: '> 20M'
        }]
    },

    tooltip: {
        headerFormat: '',
        pointFormat: '<b> {point.name}</b> is <b>{point.value}</b>'
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
                console.log(event.point)
                dispatch(setCurrentMo({id: event.point.options.id, name: event.point.options.name}))
                linkRef.current.click()
              }
            }
        }
    },

    series: [{
        name: '',
        data: moListChoose,
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