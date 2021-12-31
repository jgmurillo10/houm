import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material';
import { HeroI } from '../../common/types';
import { Link } from 'react-router-dom';

const HeroImage = styled('img')(({ theme }) => ({
  clipPath: 'circle(100.6% at 50% 43%)',
  height: 200,
  maxHeight: 200,
  objectFit: 'cover',
  transition: 'clip-path 300ms ease',
  width: '100%',
  [theme.breakpoints.up('md')]: {
    height: 300,
    maxHeight: 300,
  },
  '&:hover': {
    clipPath: 'circle(35% at 50% 43%)',
  }
}));

const Hero = ({ title, primary, secondary }: HeroI) => (
  <Grid
    sx={{ display: 'flex', alignItems: 'center', my: 6 }}
    container
    justifyContent="flex-start"
    rowSpacing={3}
    columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
    <Grid item xs={12} md={6} alignItems="center">
      <Typography variant="h2" component="h1" gutterBottom>
        {title}
      </Typography>
      <Button
        sx={{ mr: 4, mb: 2}}
        href={primary.url}
        variant="contained">
        {primary.text}
      </Button>
      <Button
        component={Link}
        to={secondary.url}
        sx={{ mb: 2 }}
        variant="outlined">
        {secondary.text}
      </Button>
    </Grid>
    <Grid item xs={12} md={6}>
      <HeroImage src="/recipe_hero.jpg" alt="Recipe" />
    </Grid>
  </Grid>
);

export default Hero;
