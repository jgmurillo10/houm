import React, { useState } from 'react';
import { Alert, Button, Card, CardActionArea, CardActions, CardContent, IconButton, Snackbar, Typography, styled } from '@mui/material';
import { RecipeI } from '../../common/types';
import { Link } from 'react-router-dom';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { toggleWishList, selectRecipes } from '../../store/recipes/wishlistSlice';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import CardSkeleton from './CardSkeleton';
import LazyCardImage from './LazyCardImage';

const fallbackImage = 'https://spoonacular.com/recipeImages/18079-240x150.jpg';

const WrappedTitle = styled(Typography)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const Summary = styled(Typography)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  position: 'relative',
  height: '10em',
  '&:before': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0), white 100%)'
  },
});

const RecipeReviewCard = ({id, title, image, summary}: RecipeI) => {
  const dispatch = useAppDispatch();
  const favoriteRecipes = useAppSelector(selectRecipes);
  const [cardImage, setCardImage] = useState(image || fallbackImage);
  const [open, setOpen] = useState(false);
  const faved = favoriteRecipes.find((recipe) => recipe.id === id);
  const handleOnError = () => { setCardImage(fallbackImage) };

  const handleAdd = () => {
    if (!faved) setOpen(true);
    dispatch(toggleWishList({ id, title, image, summary: '' }));
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card>
      <CardActionArea component={Link} to={`/recipes/${id}`}>
        {image && <LazyCardImage
          onError={handleOnError}
          component='img'
          height='194'
          image={cardImage}
          alt={title}
        />}

        <CardContent>
        <WrappedTitle gutterBottom variant='h5'>
          {title}
        </WrappedTitle>
        {/* TODO(jgmurillo10): Remove sanitize html to avoid security risks. */}
        {summary &&
          <Summary
            variant='body2'
            color='text.secondary'
            dangerouslySetInnerHTML={{__html: summary}}>
          </Summary>
        }
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites' onClick={handleAdd}>
          {faved ? <Favorite /> : <FavoriteBorder /> }
        </IconButton>
        <Button component={Link} to={`/recipes/${id}`}>Learn More</Button>
      </CardActions>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Recipe added to favorites!
        </Alert>
      </Snackbar>
    </Card>
  );
}

export { CardSkeleton };
export default RecipeReviewCard;
