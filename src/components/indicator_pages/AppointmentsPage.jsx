import { Typography, Grid } from "@mui/material"
import AppointmentsGauge from "../diagrams/AppointmentsGauge"
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import InfoLine from "./indicator_helpers/InfoLine";

const AppointmentsPage = ({clear}) => {

  return(
    <>
      <InfoLine indicatorNumber="1.2.6.1" tooltipText="Процент дистанционной записи ко врачу"/>
      <Typography variant="h5" component="div">
        Записались дистанционно
      </Typography>
      <AppointmentsGauge clear={clear}/>
    </>
  )
}

export default AppointmentsPage;