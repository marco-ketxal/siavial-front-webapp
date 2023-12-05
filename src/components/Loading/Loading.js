import { useState } from "react";
import './Loading.scss';
import {
    Grid,
    Dialog,
} from '@mui/material';
import Lottie from "react-lottie";
import animationData from "../../utils/animations/loading3.json";

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
};

    function Loading() {
    const [open, setOpen] = useState(true);


    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            PaperProps={{
                style: {
                    backgroundColor: "transparent",
                    boxShadow: "none"
                },
            }}
            >
            <Grid container align="center" className="loading-container">
                <Grid item xs={12}>
                    <Lottie
                        options={defaultOptions}
                        height={200}
                        width={330}
                    />
                </Grid>
            </Grid>
        </Dialog>
    );
}

export default  Loading;