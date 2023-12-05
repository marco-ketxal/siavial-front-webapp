import React , { useState } from "react";
import {
	Dialog,
	DialogTitle,
	Slide,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const ModalError =({openModal, setOpenModal, funcionDecision , mensaje})=>{

	const [open, setOpen] = useState(openModal);

  const handleClose = () => {
    setOpen(false);
		setOpenModal(false);
  };

	const handleConfirm = () =>{
		funcionDecision();
		handleClose();
	}


	return (
		<Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
				align='center'
      >
        <DialogTitle>{"Mensaje de ERROR !!"}</DialogTitle>
        <DialogContent>
          <DialogContentText >
						{mensaje}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm}>Aceptar</Button>
        </DialogActions>
      </Dialog>
	)
}

export default ModalError;