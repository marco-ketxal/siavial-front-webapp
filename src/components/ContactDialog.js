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

  const handleConfirm = () => {
    setOpen(false);
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
        <DialogTitle align='center' style={{color: '#cb5303'}}>{"Contactar a operador"}</DialogTitle>
        <DialogContent>
        <Lottie
            options={defaultOptions}
            height={350}
            width={200}
          /> 
        </DialogContent>
        <DialogActions>
          <Grid container spacing={6}>
            <Grid item  xs={6} >
              <Button  variant="contained" onClick={handleConfirm}>CONTACTAR</Button>
            </Grid>
            <Grid item  xs={6} >
              <Button onClick={handleClose} variant="outlined" >CANCELAR</Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}