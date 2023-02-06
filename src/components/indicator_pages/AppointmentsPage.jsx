import { Typography, Grid } from "@mui/material"
import AppointmentsGauge from "../diagrams/AppointmentsGauge"
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import InfoLine from "./indicator_helpers/InfoLine";
import { useSelector } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';

const AppointmentsPage = ({clear}) => {
  const {appointments, isLoading, error} = useSelector(state => state.appointments);
  const {currentMoId, currentMoName} = useSelector(state => ({currentMoId: state.moList.currentMoId, currentMoName: state.moList.currentMoName}));
  const resultPercent = useSelector(state => {
    const curMoAppointment = state.appointments.appointments
    .filter(appointment => appointment.mo.id === currentMoId);

    return curMoAppointment.length 
      ? curMoAppointment[0].percent
      : 0
  });

  return(
    <>
      <InfoLine indicatorNumber="1.2.6.1" tooltipText="Процент дистанционной записи ко врачу"/>
      <Typography variant="h5" component="div">
        Записались дистанционно
      </Typography>
      <Typography variant="h5" component="div">
        {currentMoName}
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8}>      
        {
          !isLoading 
            ? <AppointmentsGauge clear={clear} resultPercent={resultPercent}/>
            : <CircularProgress />
        }
        </Grid>
        <Grid item xs={12} md={4}>      
          <Typography variant="h5" component="div">
            {resultPercent.toFixed(0)}
          </Typography>
        </Grid>


      </Grid>
    </>
  )
}

export default AppointmentsPage;