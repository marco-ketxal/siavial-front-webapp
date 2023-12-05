import {React, Fragment, useEffect } from 'react';
import { Grid ,  useMediaQuery , Typography , Container , Button , Avatar} from '@mui/material';
import Navbar  from "../../components/Navbar/Navbar";
import {useNavigate , useLocation } from 'react-router-dom';
import {  useSelector, useDispatch} from 'react-redux';
import { actualizarIdVehiculo } from '../../redux/actions/solicitudActions';
import './vehiculo.scss'


function VehiculoSeleccionar() {
    let history = useNavigate();
    let location = useLocation();
    const cliente = useSelector(state => state.Cliente)
    const dispatch = useDispatch();
    const reduxActualizarVehiculo = (idVehiculo) => dispatch(actualizarIdVehiculo(idVehiculo))
    const matches = useMediaQuery("(max-width:768px)");
    
    const handleClickServicio = (idVehiculo) =>{
        reduxActualizarVehiculo(idVehiculo)
        history('/ubicacion');
    }

    return (
        <Fragment>
            <Navbar />
            <Grid>
            <Container maxWidth="md" style={{padding: "20px" }}> 
                <Typography className="text-title-page mt-1">
                    {cliente.vehiculos.length ? "Seleccionar vehículo":""}
                </Typography>
                <Grid container align= 'center' className="mt-1">
                        {cliente.vehiculos.map((vehi, index) => (
                            <Grid 
                                    item xs={ matches ? 12:5}
                                    align= 'center' 
                                    key={index} 
                                    className="card-vehiculo mt-2" 
                                    onClick={()=>{handleClickServicio(vehi._id)}} 
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
                {
                    cliente.vehiculos.length === 0 && (
                        <Grid className="mt-3" align= 'center'>
                            <Button 
                                onClick={()=>history.push('/vehiculoregistrar',location.state)} 
                                variant="contained" 
                                color="primary" 
                                size="large"  
                                className="btn-rojo"> 
                                    agregar vehículo
                            </Button>
                        </Grid>
                    )
                }
            </Container>
            </Grid>
        </Fragment>
    )
}


export default  VehiculoSeleccionar;