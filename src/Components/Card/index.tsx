import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { RecipeI } from '../../common/types';
import { styled } from '@mui/material';

const fallbackImage = 'https://spoonacular.com/recipeImages/18079-240x150.jpg';

const RightAlignedButton = styled(Button)({
  marginLeft: "auto"
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

export default function RecipeReviewCard({id, title, image, summary}: RecipeI) {
  return (
    <Card>
      <CardHeader
        sx={{height: 92}}
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title={`${title}`}
      />
      <CardMedia
        component="img"
        height="194"
        image={image || fallbackImage}
        alt={title}
      />
      <CardContent>
        <Summary
          variant="body2"
          color="text.secondary"
          dangerouslySetInnerHTML={{__html: summary}}>
        </Summary>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <RightAlignedButton size="small">Learn More</RightAlignedButton>
      </CardActions>
    </Card>
  );
}