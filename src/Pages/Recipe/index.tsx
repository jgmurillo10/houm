import { useParams } from "react-router-dom";
import {
  fetchRecipe,
  fetchRelatedRecipes,
  resetRecipe,
  selectRecipe,
  selectStatus,
  selectRelatedRecipes,
} from '../../features/recipes/recipeSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useEffect } from "react";
import { Box, styled, Typography, Grid, Avatar, Skeleton } from "@mui/material";
import { RecipeExtendedI, RecipeI } from "../../common/types";
import Note from './../../Components/Note';
import Card from './../../Components/Card';
import RecipeList from './../../Components/RecipeList';

interface Props {
  theme?: any;
  image: string;
}

const RecipeImage = styled((props => <div {...props}></div>))(({ theme, image } : Props) => ({
  height: 500,
  objectFit: 'cover',
  left: '0',
  backgroundImage: `
  linear-gradient(
    1turn,
    #000 0,
    rgba(0, 0, 0, 0.5) 25%,
    rgba(0, 0, 0, 0.2) 50%,
    transparent 75%,
    transparent 100%
  ),
    url(${image})
  `,
  backgroundSize: 'cover',
  borderRadius: '0 0 20px 20px',
  margin: '0 -16px',
  [theme.breakpoints.up('sm')]: {
    margin: '0 -24px',
  },
  [theme.breakpoints.up('md')]: {
    borderRadius: '0 0 40px 40px',
  }
}));

const RecipeHeading = styled(Typography)({
  alignItems: 'flex-end',
  color: 'white',
  display: 'flex',
  height: 400,
  position: 'absolute',
  top: -450,
});

const RecipeDescription = styled('div')(({ theme }) => ({
  '& a': {
    textDecoration: 'none'
  },
  padding: theme.spacing(3)
}));

const Recipe = () => {
  const { recipeId } = useParams();
  const recipe = useAppSelector(selectRecipe) as RecipeExtendedI;
  const status = useAppSelector(selectStatus);
  const relatedRecipes = useAppSelector(selectRelatedRecipes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (recipeId) {
      window.scrollTo(0, 0);
      dispatch(fetchRecipe(recipeId));
      dispatch(fetchRelatedRecipes(recipeId));
    }

    return () => {
      dispatch(resetRecipe());
    }
  }, [dispatch, recipeId])

  if (status === 'loading' || !recipe) {
    return (
      <>
        <Skeleton sx={{ height: 500 }} animation="wave" variant="rectangular" />
        <Skeleton sx={{ height: 900, mt: 8 }} animation="wave" variant="rectangular" />
      </>
    );
  }

  return (
    <Box sx={{ pb: 8 }}>
      <RecipeImage image={recipe.image} />
      <div style={{ position: 'relative' }}>
        <RecipeHeading variant="h3">
          {recipe.title}
        </RecipeHeading>
      </div>

      <Grid
        container
        justifyContent="flex-start"
        rowSpacing={3}
        columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Note
              cookingMinutes={recipe.cookingMinutes}
              preparationMinutes={recipe.preparationMinutes}
              readyInMinutes={recipe.readyInMinutes}
              servings={recipe.servings}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8}>
              {/* TODO(jgmurillo10): Remove sanitize html to avoid security risks. */}
              <RecipeDescription dangerouslySetInnerHTML={{__html: recipe.summary}} sx={{ my: 4 }} />
              <Box sx={{ p: 3 }}>
                <Typography variant="h4" component="h2" sx={{ my: 2}}>
                  Ingredients
                </Typography>
                {recipe.extendedIngredients.map((ingredient:any, i:number) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar
                      alt={ingredient.name}
                      src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                      sx={{ mr: 2 }} />
                    {ingredient.originalString}
                  </Box>
                ))}
              </Box>
              {
                recipe.instructions && <Box sx={{ p: 3 }}>
                  <Typography variant="h4" component="h2"sx={{ my: 2 }}>
                    Instructions
                  </Typography>
                  <RecipeList items={recipe.analyzedInstructions[0].steps} />
                </Box>
              }

          </Grid>
      </Grid>
      <Typography variant="h4" component="h2" sx={{ my: 2}}>
        Related recipes
      </Typography>
      <Grid
        container
        justifyContent="flex-start"
        rowSpacing={3}
        columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
          {relatedRecipes.map((randomRecipe:RecipeI) =>
            <Grid key={randomRecipe.id} item xs={12} sm={6} md={6} lg={4}>
              <Card
                id={randomRecipe.id}
                title={randomRecipe.title}
                summary={randomRecipe.summary}
              />
            </Grid>
          )}
      </Grid>
    </Box>
  );
};

export default Recipe;
