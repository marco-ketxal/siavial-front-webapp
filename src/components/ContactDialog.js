import * as React from 'react';
import {
  Button , 
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide
} from '@mui/material';
import Lottie from "react-lottie";
import animationData from "../assets/animations/contact.json";
import {
  CloseButton,
  CloseIcon,
} from "./Modal/SubirImagen/ModalSubirImagen.styles";


const phoneNumber = '3328303109';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ContactDialog({show, handle}) {
  const [open, setOpen] = React.useState(show);


  const handleClose = () => {
    setOpen(false);
    handle(false);
  };

  const handleWhatsapp = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent('Hola , necesito información de mi servicio')}`;
    window.open(url, '_blank');
  };

  const handleCall = () => {
    // Redirige a la URL con el esquema tel:
    window.location.href = `tel:${phoneNumber}`;
  };


  return (
    <div>
      <Dialog
      id="alert-dialog-slide"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
      
        <Grid align='right'>
            <CloseButton onClick={handleClose}>
                <CloseIcon className="fas fa-times" />
            </CloseButton>
        </Grid>
        <DialogTitle align='center' style={{color: '#cb5303'}}>{"Atención a Clientes"}</DialogTitle>
        <DialogContent>
        <Lottie
            options={defaultOptions}
            height={350}
            width={200}
          /> 
        </DialogContent>
        <DialogActions>
          <Grid container spacing={2}>
            <Grid item  xs={6} >
              <Button  variant="contained" onClick={handleCall}>LLAMAR</Button>
            </Grid>
            <Grid item  xs={6} >
              <Button onClick={handleWhatsapp} variant="outlined" > WHATSAPP</Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}
