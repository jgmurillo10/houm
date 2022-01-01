import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const FooterWrapper = styled(Box)({
  textAlign: 'center',
});

const Footer = () => (
  <FooterWrapper sx={{ py: 24, mx: 2 }}>
    <Typography variant="overline" component="h3" gutterBottom>
      Keep up to date with trending recipes, new features and discounts!
    </Typography>
    <Typography variant="h3" component="h2" gutterBottom>
      Subscribe to our newsletter
    </Typography>
    <Button
      sx={{ mr: 4, mb: 2}}
      href="/"
      variant="contained">
      I'm in
    </Button>
  </FooterWrapper>
);

export default Footer;
