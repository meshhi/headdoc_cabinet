import { Typography, Grid } from "@mui/material"
import SemdsMSColumn from "../diagrams/SemdsMSColumn";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Tooltip from '@mui/material/Tooltip';
import InfoLine from "./indicator_helpers/InfoLine";

const SemdsMSPage = ({clear}) => {

  return(
    <>
      <InfoLine indicatorNumber="1.2.6.3" tooltipText="Межведомственная передача СЭМД"/>
      <Typography variant="h5" component="div">
      Доля СЭМД в рамках обеспечения межведомственного взаимодействия
      </Typography>
      <SemdsMSColumn clear={clear}/>
    </>
  )
}

export default SemdsMSPage;