import {React, Fragment } from 'react';
import { Grid , Typography , Container  , Icon, useMediaQuery , Avatar, Box} from '@mui/material';
import Navbar  from "../../components/Navbar/Navbar";
import {useNavigate } from 'react-router-dom';
import { useSelector  , useDispatch} from 'react-redux';
import {actualizarProveedorSeleccionado} from '../../redux/actions/solicitudActions'
import './Sorteo.scss';

function Sorteo() {
    const proveedores = useSelector(state => state.Proveedor.data)
    const solicitud = useSelector(state => state.Solicitud)
    const matches = useMediaQuery("(max-width:768px)");
    let history = useNavigate();
    let dispatch = useDispatch();
    const reduxActualizarSolicitud = (idProveedor) => dispatch(actualizarProveedorSeleccionado(idProveedor))
    const handleClickServicio= (proveedorSeleccionado) =>{
        let infoSeleccionado={
            id:proveedorSeleccionado._id,
            monto: parseInt(proveedorSeleccionado.amount, 10),
            tiempoEstimado: proveedorSeleccionado.time
        }
        reduxActualizarSolicitud(infoSeleccionado)
        history('/pagoseleccionar');
    }

    return (
        <Fragment>
        <Navbar />
        <Grid>
            <Container maxWidth="md" style={{padding: "20px" }}>
                <Typography className="text-title-page">
                    Servicios cerca de ti
                </Typography>
                <Grid className="mt-1">
                    <Typography style={{color:"#555555" , fontSize: "14px"}}>
                        <b>Servicio</b>: {solicitud.tipoSolicitud}
                    </Typography>
                </Grid>
                {/* Lista de Proveedores */}
                <Grid container align= 'center' >
                {
                proveedores && Array.isArray(proveedores) && proveedores.length > 0 ? (
                proveedores.map((prove, index) => (
                    <Grid 
                    item xs={matches ? 12 : 5}
                    key={index}
                    className="card-proveedor mt-1"
                    onClick={() => handleClickServicio(prove)}
                    >
                    <Grid container>
                        <Grid item xs={4} align="center">
                        <Avatar 
                            alt="" 
                            className="card-avatar mt-1"
                            src={prove.foto}
                        />
                        </Grid>
                        <Grid item xs={8} align="left">
                        <Typography className="card-title mt-1">
                            ${prove.amount} <span style={{fontSize: '12px'}}>MXN</span>
                        </Typography>
                        <Typography className="card-proveedor-descripcion">
                            Proveedor: <b>{prove.nombre}</b>
                        </Typography>
                        <Typography className="card-proveedor-gris">
                            Llega en: {prove.time} minutos
                        </Typography>
                        <Icon className="fas fa-star icon-ranking mb-2" />
                        <Icon className="fas fa-star icon-ranking mb-2" />
                        <Icon className="fas fa-star icon-ranking mb-2" />
                        <Icon className="fas fa-star icon-ranking mb-2" />
                        <Icon className="fas fa-star icon-ranking mb-2" />
                        </Grid>
                    </Grid>
                    </Grid>
                ))
                ) : (
                    <Box container className='mt-2' justifyContent='center' alignItems='center'>
                            <Typography  variant='h6' color="primary">
                                No hay servicios  cerca de tu ubicación
                            </Typography>
                            <Typography  variant='body1' color="gray">
                                Favor de intentar más tarder
                            </Typography>
                    </Box>
                )
            }
                </Grid>
            </Container>
        </Grid>
        </Fragment>
    )
}


export default  Sorteo;