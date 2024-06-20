import React, { useState } from 'react';
import { 
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  Typography,
  Grid
} from '@mui/material';
import Lottie from "react-lottie";
import animationData from "../assets/animations/rating.json";
import { useNavigate } from 'react-router-dom';

const phoneNumber = '3328303109';
const urlEncuesta = 'https://forms.office.com/pages/responsepage.aspx?id=JC5A3gk6VkeiP3Gb4iDnGRZyfKXEjCZDkWGOMLJxcpxUOEhCT1lBTFRMUzBUUkdXWldRVlZVRFlSQS4u'


const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
};

export default function ServiceRatingModal({ open, onClose, onSubmit }) {
  const [rating, setRating] = useState(0);
  const history = useNavigate();

  const handleRatingChange = (event, newRating) => {
    setRating(newRating);
  };

  const handleSubmit = () => {
    onSubmit();
    window.open(urlEncuesta, '_blank');
    history('/home', { replace: true });
    onClose();
  };

  const handleFactura = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent('Hola , necesito la factura de mi servicio')}`;
    window.open(url, '_blank');
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle align='center'>Califica nuestro servicio</DialogTitle>
      <Lottie
            options={defaultOptions}
            height={200}
            width={200}
        />
      <DialogContent>
      <Typography>Tu calificación nos ayuda a seguir mejorando.</Typography>
        <Rating
          style={{marginTop:'1rem'}}
          name="service-rating"
          value={rating}
          onChange={handleRatingChange}
          size="large"
        />
      </DialogContent>
      <DialogActions>
        <Grid container spacing={1}>
          <Grid item  xs={6} align='left'>
            <Button onClick={handleSubmit} color="primary" variant='contained'>
              HACER ENCUESTA
            </Button>
          </Grid>
          <Grid item xs={6} align='right'>
              <Button onClick={handleFactura} color="secondary" variant='contained'>
                SOLICITAR FACTURA
              </Button>
          </Grid>
        </Grid>

      

        
      </DialogActions>
    </Dialog>
  );
}
