import { Typography, Grid } from "@mui/material"
import DoctorsSemdBar from "../diagrams/DoctorsSemd/DoctorsSemdBar";
import DoctorsSemdBarSum from "../diagrams/DoctorsSemd/DoctorsSemdBarSum";
import InfoLine from "./indicator_helpers/InfoLine";
import { Button } from "@mui/material";
import { useState } from "react";
import { TransitionGroup } from 'react-transition-group';
import Collapse from '@mui/material/Collapse';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

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
      <Grid container sx={{width: "100%"}} direction="column" justifyContent="center" alignItems="center">
        {
          isReveal
            ? <ArrowDropUpIcon sx={{cursor: "pointer"}} onClick={handleRevealClick}/>
            : <ArrowDropDownIcon sx={{cursor: "pointer"}} onClick={handleRevealClick}/>
        }
        <TransitionGroup>
          {
            isReveal 
              ? <Collapse><DoctorsSemdBar clear={clear}/></Collapse>
              : false
          }
        </TransitionGroup>
      </Grid>
    </>
  )
}

export default DoctorsSemdPage;