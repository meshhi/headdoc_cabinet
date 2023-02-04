import { Skeleton } from '@mui/material';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

export default function TileSkeleton() {
  return (
    <Card sx={{ minWidth: 275, }}>
      <CardContent>
        <Skeleton variant="rectangular" width={210} height={118} />
      </CardContent>
      <CardActions>
        <Skeleton variant="rectangular" width={210} height={118} />
      </CardActions>
    </Card>
  );
}
