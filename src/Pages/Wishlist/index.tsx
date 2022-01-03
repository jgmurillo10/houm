import { selectRecipes } from '../../features/recipes/wishlistSlice';
import { useAppSelector } from '../../app/hooks';
import { Box, Button, Grid, Typography } from '@mui/material';
import Card from './../../Components/Card';
import { RecipeI } from '../../common/types';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const recipes = useAppSelector(selectRecipes);

  return (
    <Box sx={{ py: 6 }}>
      <Typography variant='h3' component='h2' gutterBottom>
        Wishlist
      </Typography>
      <Grid
        container
        justifyContent='flex-start'
        rowSpacing={3}
        columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
        {recipes.map((recipe:RecipeI) =>
          <Grid key={recipe.id} item xs={12} sm={6} md={6} lg={4}>
            <Card
              id={recipe.id}
              title={recipe.title}
              image={recipe.image}
              summary={recipe.summary}
            />
          </Grid>
          )}
      </Grid>
      {
        recipes.length === 0 ?
        <Box>
          <Typography sx={{ mt: 2 }} variant='h4' component='p' gutterBottom>
            You don't have any favorites recipes yet.
          </Typography>
          <Button component={Link} variant='contained' to='/trending'>Explore hot recipes</Button>
        </Box> : null
      }
    </Box>
  )
}

export default Wishlist;
