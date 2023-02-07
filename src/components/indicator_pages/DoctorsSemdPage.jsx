import { Typography, Grid } from "@mui/material"
import DoctorsSemdBar from "../diagrams/DoctorsSemd/DoctorsSemdBar";
import DoctorsSemdBarSum from "../diagrams/DoctorsSemd/DoctorsSemdBarSum";
import InfoLine from "./indicator_helpers/InfoLine";
import { Button } from "@mui/material";

const DoctorsSemdPage = ({clear, handleOpen}) => {

  return(
    <>
      <InfoLine indicatorNumber="1.2.6.2" tooltipText="Процент передачи СЭМД врачами"/>
      <Typography sx={{'display': 'flex', 'justifyContent': 'space-between'}} variant="h5" component="div">
        Доля врачей, у которых не менее 2 СЭМД
        <Button id="2" size="small" onClick={handleOpen}>Подробно</Button>
      </Typography>
      <DoctorsSemdBarSum clear={clear}/>
      <DoctorsSemdBar clear={clear}/>
    </>
  )
}

export default DoctorsSemdPage;