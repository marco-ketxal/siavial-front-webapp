import React , { useState } from "react";
import {
	Dialog,
	DialogTitle,
	Slide,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
  Grid,
} from "@mui/material";
import Lottie from "react-lottie";
import animationData from "../../utils/animations/car.json";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
};


const ModalInformation =({openModal, setOpenModal, funcionDecision , mensaje})=>{

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
        disableBackdropClick
        disableEscapeKeyDown
      >
        <Grid container justify="center">
            <Lottie
                options={defaultOptions}
                height={200}
                width={330}/>
          </Grid>
        <DialogTitle>{"Mensaje de SIAVIAL"}</DialogTitle>
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

export default ModalInformation;