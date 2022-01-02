import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { RecipeI } from '../../common/types';
import { styled } from '@mui/material';
import { Link } from "react-router-dom";

const fallbackImage = 'https://spoonacular.com/recipeImages/18079-240x150.jpg';

const RightAlignedButton = styled(Button)({
  marginLeft: "auto"
});

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

export function CardLoading({ summary }: { summary?: boolean }) {
  return (
    <Card sx={{ height: summary ? 462 : 322 }}>
      <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      <CardContent>
        <React.Fragment>
          <Typography sx={{ mb: 1 }} component="div" variant="h5">
            <Skeleton />
          </Typography>
          {summary &&
            <>
              {[0,1,2,3,4].map(i => <Skeleton key={i} animation="wave" height={10} style={{ marginBottom: 6 }} />)}
              <Skeleton animation="wave" height={10} width="80%" />
            </>
          }
        </React.Fragment>
      </CardContent>
    </Card>
  )
}

export default function RecipeReviewCard({id, title, image, summary}: RecipeI) {
  const [cardImage, setCardImage] = useState(image || fallbackImage);
  const handleOnError = () => { setCardImage(fallbackImage) };

  return (
    <Card>
      <CardActionArea component={Link} to={`/recipes/${id}`}>
        <CardMedia
          onError={handleOnError}
          component="img"
          height="194"
          image={cardImage}
          alt={title}
        />
        <CardContent>
        <WrappedTitle gutterBottom variant="h5">
          {title}
        </WrappedTitle>
        {summary &&
          <Summary
            variant="body2"
            color="text.secondary"
            dangerouslySetInnerHTML={{__html: summary}}>
          </Summary>
        }
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <RightAlignedButton size="small">Learn More</RightAlignedButton>
      </CardActions>
    </Card>
  );
}
