import React from 'react';
import { Box, Button, Modal, Typography, styled } from '@mui/material';

const FooterWrapper = styled(Box)({
  textAlign: 'center',
});

const ModalWrapper = styled(Box)(({ theme }) => ({
  background: 'white',
  left: '50%',
  padding: theme.spacing(4),
  position: 'absolute',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
}));

const Footer = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <FooterWrapper sx={{ py: 24, mx: 2 }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <ModalWrapper>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Subscribe
          </Typography>
          <Typography id='modal-modal-description' sx={{ my: 2 }}>
            Fill out this form to keep up to date.
          </Typography>
          <Button variant='contained' onClick={handleClose}>Close</Button>
        </ModalWrapper>
      </Modal>
      <Typography variant='overline' component='h3' gutterBottom>
        Keep up to date with trending recipes, new features and discounts!
      </Typography>
      <Typography variant='h3' component='h2' gutterBottom>
        Subscribe to our newsletter
      </Typography>
      <Button
        sx={{ mr: 4, mb: 2}}
        onClick={handleOpen}
        variant='contained'>
        I'm in
      </Button>
    </FooterWrapper>
  );
}

export default Footer;
