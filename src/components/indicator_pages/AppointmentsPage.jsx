import { Typography, Grid } from "@mui/material"
import AppointmentsGauge from "../diagrams/AppointmentsGauge"
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const AppointmentsPage = ({clear}) => {

  return(
    <>
      <Grid>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          1.2.6.1
        </Typography>
        <Tooltip title="Delete">
          <InfoOutlinedIcon/>
        </Tooltip>
      </Grid>
      <Typography variant="h5" component="div">
        Записались дистанционно
      </Typography>
      <AppointmentsGauge clear={clear}/>
    </>
  )
}

export default AppointmentsPage;