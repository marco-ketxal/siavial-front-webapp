import React, { useState } from 'react';
import { 
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  Typography
} from '@mui/material';
import Lottie from "react-lottie";
import animationData from "../assets/animations/rating.json";
import { useNavigate } from 'react-router-dom';


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
    console.log(rating)
    history('/home', { replace: true });
    onClose();
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

        <Button onClick={handleSubmit} color="primary">
          Enviar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
