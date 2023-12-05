import React , { useState } from "react";
import {
	Grid, 
	Dialog,
	DialogTitle,
	Slide,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button
} from "@mui/material";
import Lottie from "react-lottie";
import animationPayment from "../../utils/animations/pago.json";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: animationPayment,
	rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
};


const ModalDecision =({openModal, setOpenModal, funcionDecision , title, message})=>{

	const [open, setOpen] = useState(openModal);

  const handleClose = () => {
    setOpen(false);
		setOpenModal(false);
  };

	const handleConfirm = () =>{
		funcionDecision();
		handleClose();
	}

	const handleCancel = () =>{
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
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
						<Grid container align="center" >
									<Grid item xs={12}>
											<Lottie
													options={defaultOptions}
													height={100}
													width={100}
											/>
									</Grid>
							</Grid>
          <DialogContentText >
						{message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
					<Button onClick={handleCancel}>Cancelar</Button>
          <Button onClick={handleConfirm}>Confirmar</Button>
        </DialogActions>
      </Dialog>
	)
}

export default ModalDecision;