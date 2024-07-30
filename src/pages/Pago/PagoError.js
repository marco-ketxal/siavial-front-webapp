import { React, Fragment } from 'react';
import { Grid, Container, Button, Card, CardHeader, CardMedia, CardContent, CardActions, Typography } from '@mui/material';
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate, useLocation } from 'react-router-dom';

function PagoError() {

    let history = useNavigate();
    let location = useLocation();

    return (
        <Fragment>
            <Navbar />
            <Grid>
                <Container maxWidth="md" style={{ padding: "20px" }} align="center">
                    <br />
                    <Card sx={{ maxWidth: 345 }}>
                        <CardHeader />
                        <Typography  variant="h5" style={{color:"#d32f2f"}} >
                            <b>Pago Rechazado</b>
                        </Typography><br />
                        <CardMedia
                            component="img"
                            sx={{ width: 160 }}
                            image="https://assets-siavial-admin.s3.amazonaws.com/rechazado.png"
                        />
                        <CardContent>
                            
                            <Typography align='center'>
                            <b>Favor de validar tu</b>
                            </Typography>
                            <Typography  align='center'>
                            <b>Información de pago</b>
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                        </CardActions>
                    </Card><br />
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        className="btn-rojo"
                        onClick={() => history('/home', { state: location.state })}> 
                        Regresar
                    </Button>
                </Container>
            </Grid>
        </Fragment>
    )
}

export default PagoError;