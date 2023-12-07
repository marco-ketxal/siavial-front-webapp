import { Fragment } from "react";
import './LoadingPago.scss';
import {
    DialogContent,
    Typography,
    Grid,
    Container,
    DialogActions
} from "@mui/material";
import Lottie from "react-lottie";
import animationData from "../../utils/animations/pago.json";

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
};

export default function LoadingPago({ message }) {
    return (
        <Fragment>

            <DialogContent className="loading-container">

            <Container maxWidth="xs">
                
                <Grid container justify="center">
                    <Lottie
                        options={defaultOptions}
                        height={200}
                        width={330}
                    />
                    <Grid item xs={12}>
                        <Typography variant="h6" align="center" className="text">
                            {
                                message ?
                                    message
                                :
                                "Subiendo foto, este proceso puede tomar unos segundos."
                            }
                        </Typography>
                    </Grid>
                </Grid>
                
            </Container>
            
                <DialogActions></DialogActions>
            </DialogContent>

        </Fragment>
    )
}