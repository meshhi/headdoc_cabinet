import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';

export default function Tile({handleOpen, tileType, children, curDate, setDate}) {
  const dispatch = useDispatch();

  const changeDateHandler = (event) => {
    dispatch(setDate('GRAPHIC date CHANGED'));
  }

  return (
    <Card sx={{ minWidth: 275, }}>
      <CardContent>
        {children}
      </CardContent>
      <CardActions>
        <Button id={tileType} size="small" onClick={handleOpen}>Подробно</Button>
        <div>{curDate}</div>
        <Button onClick={changeDateHandler}>change date</Button>
      </CardActions>
    </Card>
  );
}