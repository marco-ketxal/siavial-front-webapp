import {React, Fragment } from 'react';
import { Grid , useMediaQuery ,Typography , Container , Button , Avatar} from '@mui/material';
import Navbar  from "../../components/Navbar/Navbar";
import {useNavigate ,useLocation} from 'react-router-dom';
import {  useSelector} from 'react-redux';
import './vehiculo.scss'

function Vehiculos() {
    let history = useNavigate();
    const location = useLocation();
    const cliente = useSelector(state => state.Cliente)
    const matches = useMediaQuery("(max-width:768px)");
    
    const handleClickServicio = (index) =>{
        if(location.state === undefined || location.state === null){ //no ha seleccionado un servicio
            history('/vehiculodetalle',{
                state: {
                  id: index,
                }
              });
        }else{
            history('/ubicacion');
        }
    }

    return (
        <Fragment>
            <Navbar />
            <Grid>
            <Container maxWidth="md" style={{padding: "40px" }}> 
                <Typography className="text-title-page mt-1 mb-3">
                    Mís vehículos
                </Typography>

                {/* Lista de Vehiculos */}
                <Grid container align= 'center' className="mt-1" >
                        {cliente.vehiculos?.map((vehi, index) => (
                            <Grid 
                                item xs={ matches ? 12:5}
                                align= 'center' 
                                key={index} 
                                className="card-vehiculo mt-1" 
                                onClick={()=>handleClickServicio(index)} 
                            >
                                <Grid container align= 'center' >
                                    <Grid item xs={3} >
                                        <Avatar 
                                            className="icon-servicio mt-1"
                                            src={vehi.foto} 
                                        />
                                    </Grid>
                                    <Grid item align = "left" xs={8}>
                                        <Typography className="mt-1" style={{fontSize: "14px"}}>
                                            <b>{vehi.marca} {vehi.modelo}</b> 
                                        </Typography>
                                        <Typography  style={{fontSize: "14px"}}>
                                            Color: {vehi.color} 
                                        </Typography>
                                        <Typography  style={{fontSize: "14px"}}>
                                            Placas: <b>{vehi.placa}</b>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        ))}
                </Grid>

                
                <Grid  className="mt-3" align= 'center'>
                    <Button 
                        onClick={()=>history('/vehiculoregistrar',{state: location.state})} 
                        variant="contained" 
                        color="primary" 
                        size="large"  
                        fullWidth={true}
                        className="btn-rojo"> 
                            agregar vehículo
                    </Button>
                </Grid>
            
            
            </Container>
            </Grid>
        </Fragment>
    )
}


export default  Vehiculos;