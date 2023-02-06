import { Typography, Grid } from "@mui/material"
import SemdsMSColumn from "../diagrams/SemdsMSColumn";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Tooltip from '@mui/material/Tooltip';

const SemdsMSPage = ({clear}) => {

  return(
    <>
    <Grid>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        1.2.6.3
      </Typography>
      <Tooltip title="Delete">
        <InfoOutlinedIcon/>
      </Tooltip>
    </Grid>
      <Typography variant="h5" component="div">
      Доля СЭМД в рамках обеспечения межведомственного взаимодействия
      </Typography>
      <SemdsMSColumn clear={clear}/>
    </>
  )
}

export default SemdsMSPage;