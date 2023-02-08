import { Typography, Grid } from "@mui/material"
import DoctorsSemdBar from "../diagrams/DoctorsSemd/DoctorsSemdBar";
import DoctorsSemdBarSum from "../diagrams/DoctorsSemd/DoctorsSemdBarSum";
import InfoLine from "./indicator_helpers/InfoLine";
import { Button } from "@mui/material";
import { useState } from "react";
import { TransitionGroup } from 'react-transition-group';

const DoctorsSemdPage = ({clear, handleOpen}) => {
  const [isReveal, setReveal] = useState(false);

  const handleRevealClick = () => {
    setReveal((prev) => !prev);
  }

  return(
    <>
      <InfoLine indicatorNumber="1.2.6.2" tooltipText="Процент передачи СЭМД врачами"/>
      <Typography sx={{'display': 'flex', 'justifyContent': 'space-between'}} variant="h5" component="div">
        Доля врачей, у которых не менее 2 СЭМД
        <Button id="2" size="small" onClick={handleOpen}>Подробно</Button>
      </Typography>
      <DoctorsSemdBarSum clear={clear}/>
      <Button onClick={handleRevealClick}>Reveal details</Button>
      {/* <TransitionGroup> */}
        {isReveal 
          ? <DoctorsSemdBar clear={clear}/>
          : false
        }
      {/* </TransitionGroup> */}

    </>
  )
}

export default DoctorsSemdPage;