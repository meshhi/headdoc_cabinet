import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function Tile({handleOpen, tileType, children, curDate, setDate}) {
  const dispatch = useDispatch();

  const changeDateHandler = (event) => {
    dispatch(setDate('GRAPHIC date CHANGED'));
  }

  const changeDateHandlerDecrease = (event) => {
    console.log(curDate);

    dispatch(setDate('GRAPHIC date CHANGED'));
  }

  const changeDateHandlerInrease = (event) => {
    dispatch(setDate('GRAPHIC date CHANGED'));
  }

  return (
    <Card sx={{ minWidth: 275, }}>
      <CardContent>
        {children}
      </CardContent>
      <CardActions>
        <Button id={tileType} size="small" onClick={handleOpen}>Подробно</Button>
        <ChevronLeftIcon onClick={changeDateHandlerDecrease} sx={{
          cursor: "pointer", 
          '&:hover': {
            backgroundColor: 'grey',
          }
        }}/>
        <div>{new Date(curDate).toDateString()}</div>
        <ChevronRightIcon onClick={changeDateHandlerInrease} sx={{
          cursor: "pointer", 
          '&:hover': {
            backgroundColor: 'grey',
          }
        }}/>
        <Button onClick={changeDateHandler}>change date</Button>
      </CardActions>
    </Card>
  );
}