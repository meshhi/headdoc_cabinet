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
import { useSelector, useDispatch } from 'react-redux';
import { fetchMoMeddocs, fetchDoctorMeddocs } from "../../store/slices/ActionCreators";
import dateConverter from "../../utils/dateConverter";
import { createSelector } from '@reduxjs/toolkit';

const DoctorsSemdPage = ({clear, handleOpen}) => {
  const [isReveal, setReveal] = useState(false);
  const {diagram2} = useSelector(state => state.diagramDates);

  // const selectMeddocsSelector = state => state.meddocs;

  // const selectMeddocsPercent = createSelector(selectMeddocsSelector, (meddocs) => {
  //   return meddocs.moMeddocs.semd_percent;
  // });

  // const meddocsSumPercent = selectMeddocsPercent();


  // const selectMeddocsSpecialities = createSelector(selectMeddocsSelector, (meddocs) => {
  //   return meddocs.moMeddocs.specialities;
  // });

  // const specialities = selectMeddocsSpecialities();

  const { meddocsSumPercent, specialities } = useSelector(state => (
    {
      meddocsSumPercent: state.meddocs.moMeddocs.semd_percent ? state.meddocs.moMeddocs.semd_percent : 0,
      specialities: state.meddocs.moMeddocs.specialities ? state.meddocs.moMeddocs.specialities : [],
    })
  );

  const returnSpecialitiesList = (specialities) => {
    const result = [];
    for (let [key, value] of Object.entries(specialities)) {
      result.push({key, value});
    }

    return result;
  }

  console.log(meddocsSumPercent);
  console.log(specialities);

  const { moList, currentMoId } = useSelector(state => state.moList);

  const dispatch = useDispatch();

  const handleRevealClick = () => {
    setReveal((prev) => !prev);
  }

  const handleCollapseEnd = () => {
    console.log('collapsed end')
  };

  useEffect(() => {
    const reqData = {
      moId: currentMoId,
      date: dateConverter.dateToStrForRequest(diagram2),
    }

    dispatch(fetchMoMeddocs(reqData));
  }, [currentMoId, diagram2])

  return(
    <>
      <InfoLine indicatorNumber="1.2.6.2" tooltipText="Процент передачи СЭМД врачами"/>
      <Typography sx={{'display': 'flex', 'justifyContent': 'space-between'}} variant="h5" component="div">
        Доля врачей, у которых не менее 2 СЭМД
        <Button id="2" size="small" onClick={handleOpen}>Подробно</Button>
      </Typography>

      <DoctorsSemdBarSum clear={clear} percent={meddocsSumPercent}/>

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
            {
              console.log(specialities)
            }
          {
            specialities
            ? returnSpecialitiesList(specialities).map(item =>     
            <Fade in={isReveal}>
              <Box> 
                <XrangeMock></XrangeMock>
              </Box>
            </Fade>
            )
            : false
          }
        </Box>
      </Grid>
    </>
  )
}

export default DoctorsSemdPage;

{/* <DoctorsSemdBar clear={clear}/> */}