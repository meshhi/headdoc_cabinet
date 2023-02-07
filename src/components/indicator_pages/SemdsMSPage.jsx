import { Typography, Grid } from "@mui/material"
import SemdsMSColumn from "../diagrams/SemdsMSColumn";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Tooltip from '@mui/material/Tooltip';
import InfoLine from "./indicator_helpers/InfoLine";
import { Button } from "@mui/material";

const SemdsMSPage = ({clear, handleOpen}) => {

  return(
    <>
      <InfoLine indicatorNumber="1.2.6.3" tooltipText="Межведомственная передача СЭМД"/>
      <Typography sx={{'display': 'flex', 'justifyContent': 'space-between'}} variant="h5" component="div">
        Доля СЭМД в рамках межведомственного обеспечения
        <Button id="3" size="small" onClick={handleOpen}>Подробно</Button>
      </Typography>
      <SemdsMSColumn clear={clear}/>
    </>
  )
}

export default SemdsMSPage;