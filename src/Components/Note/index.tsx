import { Card, CardContent, CardMedia, Typography  } from '@mui/material';
import { AccessTime, Person } from '@mui/icons-material';

interface PropsInfoRecipeI {
  cookingMinutes: number;
  preparationMinutes: number;
  readyInMinutes: number;
  servings: number;
};

const Note = ({cookingMinutes,
  preparationMinutes,
  readyInMinutes,
  servings
  } : PropsInfoRecipeI) => {
  return (
    <Card sx={{ maxWidth: 345, mx: 'auto' }} style={{ top: 20, position: 'sticky', marginTop: -20 }}>
      <CardMedia
        component='img'
        height='140'
        image='/shopping-bag.jpg'
        alt=''
      />
      <CardContent>
        {cookingMinutes ? <Typography
          variant='body2'
          color='text.secondary'
          sx={{display: 'flex', alignItems: 'center', mb: 1 }}>
          <AccessTime sx={{ mr: 1 }} />Cooking: {cookingMinutes} mins
        </Typography> : null}
        {preparationMinutes ? <Typography
          variant='body2'
          color='text.secondary'
          sx={{display: 'flex', alignItems: 'center', mb: 1 }}>
          <AccessTime sx={{ mr: 1 }} />Prep: {preparationMinutes} mins
        </Typography> : null}
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{display: 'flex', alignItems: 'center', mb: 1 }}>
          <AccessTime sx={{ mr: 1 }} />Ready in: {readyInMinutes} mins
        </Typography>
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{display: 'flex', alignItems: 'center', mb: 1 }}>
          <Person sx={{ mr: 1 }} />Servings: {servings}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Note;
