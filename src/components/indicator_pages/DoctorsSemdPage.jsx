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
import ErrorMsg from "./indicator_helpers/ErrorMsg";
import NoDataMsg from "./indicator_helpers/NoDataMsg";
import { CircularProgress } from "@mui/material";
import { useLayoutEffect } from "react";


const DoctorsSemdPage = ({clear, handleOpen}) => {
  const [isReveal, setReveal] = useState(false);
  const { diagram2 } = useSelector(state => state.diagramDates);
  const state = useSelector(state => state);
  const [noDataFlag, setNoDataFlag] = useState(false);

  const {isLoading: isLoadingMeddocs, error: errorMeddocs} = useSelector(state => state.meddocs);

  const selectMeddocsSelector = state => state.meddocs;

  const selectMeddocsPercent = createSelector(selectMeddocsSelector, meddocs => meddocs.moMeddocs.semd_percent);
  const meddocsSumPercent = selectMeddocsPercent(state);

  const selectMeddocsSpecialities = createSelector(selectMeddocsSelector, meddocs => meddocs.moMeddocs.specialities);
  const specialities = selectMeddocsSpecialities(state);

  const { moList, currentMoId } = useSelector(state => state.moList);

  const dispatch = useDispatch();

  useEffect(() => {
    const reqData = {
      moId: currentMoId,
      date: dateConverter.dateToStrForRequest(diagram2),
    }
    dispatch(fetchMoMeddocs(reqData));
  }, [currentMoId, diagram2])

  useLayoutEffect(() => {
    if (!isLoadingMeddocs && !errorMeddocs && !meddocsSumPercent) {
      setNoDataFlag(true);
    } else {
      setNoDataFlag(false);
    }
  }, [isLoadingMeddocs, errorMeddocs, meddocsSumPercent])

  const DiagramsTempl = ({clear, isReveal, specialities, meddocsSumPercent}) => {
    const handleRevealClick = () => {
      setReveal((prev) => !prev);
    }
  
    const handleCollapseEnd = () => {
      console.log('collapsed end')
    };

    function useForceUpdate(){
      const [value, setValue] = useState(0); // integer state
      return () => setValue(value => value + 1); // update state to force render
      // A function that increment 👆🏻 the previous state like here 
      // is better than directly setting `setValue(value + 1)`
    }

    const forceUpdate = useForceUpdate();

    const returnSpecialitiesList = (specialities) => {
      const result = [];
      for (let [key, value] of Object.entries(specialities)) {
        result.push({...value, specId: key});
      }
      return result;
    }

    useEffect(() => forceUpdate(), []);

    return(
      <>
        <DoctorsSemdBarSum clear={clear} percent={meddocsSumPercent ? meddocsSumPercent : 0} openModal={handleOpen}/>
        <Grid container sx={{width: "100%"}} direction="column" justifyContent="center" alignItems="center">
          {
            isReveal
              ? <ArrowDropUpIcon sx={{cursor: "pointer"}} onClick={handleRevealClick}/>
              : <ArrowDropDownIcon sx={{cursor: "pointer"}} onClick={handleRevealClick}/>
          }
          <Box sx={{ 
            height: isReveal ? 'auto' : 0,
            width: '100%',
            transition: 'all 1s ease' 
            }}>
            {
              specialities
              ? returnSpecialitiesList(specialities)
                .slice(0, 5)
                .map(item =>     
                <Fade key={item.specId} in={isReveal}>
                  <Box> 
                    <XrangeMock clear={clear} specialityId={item.specId} percent={item.percent} title={item.title} openModal={handleOpen}></XrangeMock>
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

  return(
    <>
      <InfoLine indicatorNumber="1.2.6.2" tooltipText="Процент передачи СЭМД врачами"/>
      <Typography sx={{'display': 'flex', 'justifyContent': 'space-between'}} variant="h5" component="div">
        Доля врачей, у которых не менее 2 СЭМД
        <Button id="2" size="small" onClick={handleOpen} disabled={noDataFlag}>Подробно</Button>
      </Typography>
      {
        !isLoadingMeddocs 
          ? errorMeddocs
            ? <Box sx={{ 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center', 'height': '100%'}}><ErrorMsg errorTitle="Ошибка при загрузке данных" errorContent={errorMeddocs}/></Box>
            : meddocsSumPercent && specialities
              ? <DiagramsTempl clear={clear} isReveal={isReveal} specialities={specialities} meddocsSumPercent={meddocsSumPercent}></DiagramsTempl>
              : <Box sx={{ 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center', 'height': '100%'}}><NoDataMsg errorTitle="Нет данных" errorContent="На указанную дату процент 0"/></Box>
          : <Box sx={{ 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center', 'height': '100%'}}><CircularProgress/></Box>
      }
    </>
  )
}

export default DoctorsSemdPage;

{/* <DoctorsSemdBar clear={clear}/> */}