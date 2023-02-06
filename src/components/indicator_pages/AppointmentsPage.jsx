import { Typography, Grid } from "@mui/material"
import AppointmentsGauge from "../diagrams/AppointmentsGauge"
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import InfoLine from "./indicator_helpers/InfoLine";
import { useSelector } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
import ErrorMsg from "./indicator_helpers/ErrorMsg";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { Box } from "@mui/material";

const AppointmentsPage = ({clear}) => {
  const {appointments, isLoading, error} = useSelector(state => state.appointments);
  const {currentMoId, currentMoName} = useSelector(state => ({currentMoId: state.moList.currentMoId, currentMoName: state.moList.currentMoName}));
  const {resultPercent, percentDiff} = useSelector(state => {
    const curMoAppointment = state.appointments.appointments
    .filter(appointment => appointment.mo.id === currentMoId);

    return curMoAppointment?.length 
      ? {resultPercent: curMoAppointment[0].percent, percentDiff: curMoAppointment[0].difference}
      : {resultPercent: 0, percentDiff: 0}
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
            ? error 
              ? <ErrorMsg errorTitle="Ошибка при загрузке данных" errorContent={error}/>
              : <AppointmentsGauge clear={clear} resultPercent={resultPercent}/>
            : <CircularProgress />
        }
        </Grid>
        <Grid container item xs={12} md={4} direction="column" justifyContent="space-evenly" alignItems="center">      
          <Typography variant="h5" component="div">
            {resultPercent.toFixed(0)}%
          </Typography>
          <Typography variant="h5" component="div">
            {
              percentDiff > 0 
                ? <Box sx={{color: "green"}}>
                    <KeyboardDoubleArrowUpIcon />
                    +{percentDiff.toFixed(2)}%
                  </Box>
                : <Box sx={{color: "red"}}>
                    <KeyboardDoubleArrowDownIcon />
                    {percentDiff.toFixed(2)}%
                  </Box>
            }
            
          </Typography>
        </Grid>


      </Grid>
    </>
  )
}

export default AppointmentsPage;