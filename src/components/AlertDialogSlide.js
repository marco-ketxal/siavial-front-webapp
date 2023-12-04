import * as React from 'react';
import {
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Typography
} from '@mui/material';
import Lottie from "react-lottie";
import animationData from "../assets/animations/cancel.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({show, handle, callback}) {
  const [open, setOpen] = React.useState(show);


  const handleClose = () => {
    setOpen(false);
    handle(false);
  };

  const handleConfirm = () => {
    callback();
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
        <DialogTitle align='center' style={{color: '#cb5303'}}>{"¿Seguro que desea cancelar el servicio?"}</DialogTitle>
        <DialogContent>
        <Lottie
            options={defaultOptions}
            height={250}
            width={250}
          /> 
          <DialogContentText id="alert-dialog-slide-description">
          <Typography id="modal-modal-description" sx={{ mt: 2 }}  variant='caption'>
            Esta acción generará los siguientes cargos por cancelación:
            <li> 50% del banderazo</li>
            <li> 10% del total del servicio</li>
            <li> Gastos administrativos </li>
          </Typography> 
          <Typography variant='h5' style={{marginTop:'1rem'}}>Devolución: <b style={{color: '#cb5303'}}>$2,972</b></Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm}>Si</Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}