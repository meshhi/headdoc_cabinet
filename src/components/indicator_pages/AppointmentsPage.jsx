import { Typography } from "@mui/material"
import AppointmentsGauge from "../diagrams/AppointmentsGauge"

const AppointmentsPage = () => {

  return(
    <>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        1.2.6.1
      </Typography>
      <Typography variant="h5" component="div">
        Записались дистанционно
      </Typography>
      <AppointmentsGauge />
    </>
  )
}

export default AppointmentsPage;