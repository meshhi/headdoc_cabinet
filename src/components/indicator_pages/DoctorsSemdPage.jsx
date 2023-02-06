import { Typography, Grid } from "@mui/material"
import DoctorsSemdBar from "../diagrams/DoctorsSemd/DoctorsSemdBar";
import DoctorsSemdBarSum from "../diagrams/DoctorsSemd/DoctorsSemdBarSum";
import InfoLine from "./indicator_helpers/InfoLine";

const DoctorsSemdPage = ({clear}) => {

  return(
    <>
      <InfoLine indicatorNumber="1.2.6.2" tooltipText="Процент передачи СЭМД врачами"/>
      <Typography variant="h5" component="div">
        Доля врачей, у которых не менее 2 СЭМД
      </Typography>
      <DoctorsSemdBarSum clear={clear}/>
      <DoctorsSemdBar clear={clear}/>
    </>
  )
}

export default DoctorsSemdPage;