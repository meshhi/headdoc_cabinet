import { Typography, Grid } from "@mui/material"
import AppointmentsGauge from "../diagrams/AppointmentsGauge"
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import InfoLine from "./indicator_helpers/InfoLine";
import { useSelector } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
import ErrorMsg from "./indicator_helpers/ErrorMsg";
import NoDataMsg from "./indicator_helpers/NoDataMsg";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { Box } from "@mui/material";
import { Button } from "@mui/material";

const AppointmentsPage = ({clear, handleOpen}) => {
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
      <Typography sx={{'display': 'flex', 'justifyContent': 'space-between'}} variant="h5" component="div">
        Записались дистанционно
        <Button id="1" size="small" onClick={handleOpen}>Подробно</Button>
      </Typography>
      
      <Typography variant="h5" component="div">
        {currentMoName}
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8} sx={{ 'height': 400 }} justifyContent="center" alignItems="center">    
        {
          !isLoading 
            ? error 
              ? <Box sx={{ 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center', 'height': '100%'}}><ErrorMsg errorTitle="Ошибка при загрузке данных" errorContent={error}/></Box>
              : appointments.length 
                ? <AppointmentsGauge clear={clear} resultPercent={resultPercent}/>
                : <Box sx={{ 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center', 'height': '100%'}}><NoDataMsg errorTitle="Нет данных" errorContent="За указанную дату отсутствуют данные в БД"/></Box>
            : <Box sx={{ 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center', 'height': '100%'}}><CircularProgress/></Box>
        } 
        </Grid>
        <Grid container item xs={12} md={4} direction="column" justifyContent="center" alignItems="center">      
          <Typography sx={{'fontHeight': 100}} variant="h5" component="div">
            {resultPercent.toFixed(0)}%
          </Typography>
          <Typography variant="h5" component="div">
            {
              percentDiff > 0 
                ? <Box sx={{color: "green"}}>
                    <KeyboardDoubleArrowUpIcon />
                    +{percentDiff.toFixed(2)}%
                  </Box>
                : percentDiff < 0
                  ? <Box sx={{color: "red"}}>
                      <KeyboardDoubleArrowDownIcon />
                      {percentDiff.toFixed(2)}%
                    </Box>
                  : <Box sx={{color: "orange"}}>
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