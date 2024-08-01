import { React, Fragment } from 'react';
import { Grid, 
    Container, 
    Button, 
    Card, 
    CardHeader, 
    CardMedia, 
    CardContent, 
    CardActions, 
    Typography } from '@mui/material';
import Navbar from "../../components/Navbar/Navbar";
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

function PagoCorrecto() {

    const solicitud = useSelector(state => state.Solicitud)
    let history = useNavigate();

    return (
        <Fragment>
            <Navbar />
            <Grid>
                <Container maxWidth="md" style={{ padding: "20px" }} align="center">
                    <br />
                    <Card sx={{ maxWidth: 345 }}>
                        <CardHeader />
                        <Typography  variant="h5" style={{color:"#4caf50"}} >
                            <b>Pago exitoso!</b>
                        </Typography><br />
                        <CardMedia
                            component="img"
                            sx={{ width: 160 }}
                            image="https://assets-siavial-admin.s3.amazonaws.com/pagado.png"
                        />
                        <CardContent>
                            <Typography variant="body3" color="text.secondary" >
                                Servicio de {solicitud.tipoSolicitud} en camino
                            </Typography>
                            <Typography  align='left'>
                                Folio: {solicitud.folio}
                            </Typography><br />
                            <Typography  align='left'>
                                Operador: 
                            </Typography><br />
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
                        onClick={() => history('/tracking')}>
                        Ver mi Servicio
                    </Button>
                </Container>
            </Grid>
        </Fragment>
    )
}

export default PagoCorrecto;