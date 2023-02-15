import { Typography, Grid, Container, Button, List, ListItem, Box } from "@mui/material"
import DoctorsSemdBar from "../diagrams/DoctorsSemd/DoctorsSemdBar";
import DoctorsSemdBarSum from "../diagrams/DoctorsSemd/DoctorsSemdBarSum";
import InfoLine from "./indicator_helpers/InfoLine";
import { useEffect, useState } from "react";
import { TransitionGroup } from 'react-transition-group';
import Collapse from '@mui/material/Collapse';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import XrangeMock from "../diagrams/diagrams_mock/XrangeMock";
import { Fade } from '@mui/material';

const XrangeList = () => {
  return(
  <>
    <Box>
      <XrangeMock></XrangeMock>
    </Box>
    <Box>
      <XrangeMock></XrangeMock>
    </Box>
  </>
  )
}

const DoctorsSemdPage = ({clear, handleOpen}) => {
  const [isReveal, setReveal] = useState(false);

  const handleRevealClick = () => {
    setReveal((prev) => !prev);
  }


  const handleCollapseEnd = () => {
    console.log('collapsed end')
  };



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
        <Box sx={{ 
          height: isReveal ? 'auto' : 0,
          transition: 'all 1s ease' 
          }}>
          <Fade in={isReveal}>
            <Box>
              <XrangeMock></XrangeMock>
            </Box>
          </Fade>
          <Fade in={isReveal}>
            <Box>
              <XrangeMock></XrangeMock>
            </Box>
          </Fade>


        </Box>
      </Grid>
    </>
  )
}

export default DoctorsSemdPage;

{/* <DoctorsSemdBar clear={clear}/> */}