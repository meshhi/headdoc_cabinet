import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useEffect } from 'react';
import dateConverter from '../../utils/dateConverter';
import { Typography } from '@mui/material';

export default function Tile({curDate, setDate, children}) {
  const dispatch = useDispatch();

  const changeDateHandlerDecrease = (event) => {
    dispatch(setDate(curDate - 604800000));
  }

  const changeDateHandlerInrease = (event) => {
    dispatch(setDate(curDate + 604800000));
  }

  return (
    <Card sx={{ minWidth: 275, }}>
      <CardContent>
        {children}
      </CardContent>
      <CardActions sx={{'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center'}}>
        <ChevronLeftIcon onClick={changeDateHandlerDecrease} sx={{
          cursor: "pointer", 
          '&:hover': {
            backgroundColor: 'grey',
          }
        }}/>
        <Typography variant="button">{dateConverter.dateToStr(curDate)}</Typography>
        <ChevronRightIcon onClick={changeDateHandlerInrease} sx={{
          cursor: "pointer", 
          '&:hover': {
            backgroundColor: 'grey',
          }
        }}/>
      </CardActions>
    </Card>
  );
}