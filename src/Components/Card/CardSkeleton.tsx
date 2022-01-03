import React from 'react';
import { Card, CardContent, Skeleton, Typography } from '@mui/material';

const CardSkeleton = ({ summary }: { summary?: boolean }) => (
  <Card sx={{ height: summary ? 462 : 322 }}>
    <Skeleton sx={{ height: 190 }} animation='wave' variant='rectangular' />
    <CardContent>
      <React.Fragment>
        <Typography sx={{ mb: 1 }} component='div' variant='h5'>
          <Skeleton />
        </Typography>
        {summary &&
          <>
            {[0,1,2,3,4].map(i => <Skeleton key={i} animation='wave' height={10} style={{ marginBottom: 6 }} />)}
            <Skeleton animation='wave' height={10} width='80%' />
          </>
        }
      </React.Fragment>
    </CardContent>
  </Card>
);

export default CardSkeleton;
