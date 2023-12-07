import {React, Fragment } from 'react';
import { Grid , Typography , Container , Button , Icon , useMediaQuery} from '@mui/material';
import Navbar  from "../../components/Navbar/Navbar";
import {useNavigate ,useLocation} from 'react-router-dom';
import {  useSelector} from 'react-redux';
import './Pago.scss'

function Pagos() {
    let history = useNavigate();
    const matches = useMediaQuery("(max-width:768px)");
    const location = useLocation();
    const cliente = useSelector(state => state.Cliente)

    
    const handleClickPago = (index) =>{
        if(location.state === undefined || location.state === null){ //no ha seleccionado un servicio
            history('/pagodetalle',{state: {
                id: index,
              }});
        }else{
            history('/tracking');
        }
    }

    return (
        <Fragment>
            <Navbar />
            <Grid>
            <Container maxWidth="md" style={{padding: "20px" }}> 
                <Typography className="text-title-page mt-1">
                    Mís formas de pago
                </Typography>
                <Grid container align= 'center' className="mt-2">
                        {cliente.metodosPago?.map((pago, index) => (
                            <Grid 
                                item xs={matches ? 12:4}
                                align= 'center' 
                                key={index} 
                                className="card-pago mt-2 mb-2" 
                                onClick={()=>handleClickPago(index)} 
                            >
                            <Grid container align= 'center'>
                                <Grid item xs={2} >
                                    <Icon  className="fa fa-credit-card icon-tarjeta mt-1"/>
                                </Grid>
                                <Grid item align = "left" xs={10}>
                                    <Typography className="mt-1" style={{fontSize: "14px" , color:"white"}}>
                                        Terminación: <b>************{pago.last4}</b> 
                                    </Typography>
                                </Grid>
                            </Grid>
                            </Grid>
                        ))}
                </Grid>

                
                <Grid  className="mt-4" align= 'center'>
                    <Button 
                        onClick={()=>history('/pagoregistrar',{state: location.state})} 
                        variant="contained" 
                        color="primary" 
                        size="large"  
                        fullWidth={true}
                        className="btn-rojo"> 
                            agregar tarjeta
                    </Button>
                </Grid>
            </Container>
            </Grid>
        </Fragment>
    )
}

export default  Pagos;