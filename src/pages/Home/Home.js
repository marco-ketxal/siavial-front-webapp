import React, {Fragment , useEffect } from 'react';
import { 	Slide, Container, Grid , Typography , useMediaQuery } from '@mui/material';
import Navbar  from "../../components/Navbar/Navbar";
import {useNavigate } from 'react-router-dom';
import CardServicio from '../../components/CardServicio/CardServicio';
import {  useSelector , useDispatch } from 'react-redux';
import { actualizarTipoServicio, actualizarIdCliente } from '../../redux/actions/solicitudActions';

function Home() {

    const matches = useMediaQuery("(max-width:768px)");
    let history = useNavigate();
    const cliente = useSelector(state => state.Cliente)
    const dispatch = useDispatch();
    const reduxActualizarTipoServicio = (servicio , clave) => dispatch(actualizarTipoServicio(servicio, clave))
    const reduxActualiarIdCliente = (idCliente)=> dispatch(actualizarIdCliente(idCliente))

    const data = [
        {
            id:1,
            urlImagen: "https://assets-siavial.s3.amazonaws.com/webapp/grua.jpg",
            clave: "GR",
            titulo:"Grúa",
            subtitulo: "Traslado de autos y camiones"
        },
        {
            id:2,
            urlImagen: "https://assets-siavial.s3.amazonaws.com/webapp/corriente.jpg",
            clave: "CR",
            titulo:"Paso de corriente",
            subtitulo: "Olvidaste apagar las luces de tu carro ?"
        },
        {
            id:3,
            urlImagen: "https://assets-siavial.s3.amazonaws.com/webapp/gasolina.jpg",
            clave: "GS",
            titulo:"Gasolina",
            subtitulo: "Te quedaste sin gasolina?"
        },
        {
            id:4,
            urlImagen: "https://assets-siavial.s3.amazonaws.com/webapp/cerrajero.jpg",
            clave: "CJ",
            titulo:"Cerrajero",
            subtitulo: "Te quedaste sin gasolina?"
        },
        {
            id:5,
            urlImagen: "https://assets-siavial.s3.amazonaws.com/webapp/cambio-llanta.jpg",
            clave: "CL",
            titulo:"Cambio de llanta",
            subtitulo: "Te quedaste sin gasolina?"
        },
        {
            id:6,
            urlImagen: "https://assets-siavial.s3.amazonaws.com/webapp/reparacion.jpg",
            clave: "RL",
            titulo:"Reparación de llanta",
            subtitulo: "Te quedaste sin gasolina?"
        },
        {
            id:7,
            urlImagen: "https://assets-siavial.s3.amazonaws.com/webapp/taller2.png",
            clave: "TR",
            titulo:"Servicio de taller",
            subtitulo: "Te quedaste sin gasolina?"
        },
        {
            id:8,
            urlImagen: "https://assets-siavial.s3.amazonaws.com/webapp/gestoria.jpg",
            clave: "GS",
            titulo:"Gestoría de siniestros",
            subtitulo: "Te quedaste sin gasolina?"
        },
    ];

    const handleClickSerivicio = (servicio) =>{
        reduxActualizarTipoServicio(servicio.titulo , servicio.clave);
        reduxActualiarIdCliente(cliente.id);
        history('/vehiculoseleccionar')
        
    }

    useEffect(()=>{

    },[])


    return (
        <Fragment>
            <Navbar />
            <Container>
                <Grid >
                    <Typography  variant="subtitle1" className="mt-2">
                        Servicios cerca de ti ...
                    </Typography>
                </Grid>
                <Slide direction="up"  in={true} mountOnEnter unmountOnExit >
                <Grid
                    container align= 'center' 
                    spacing={2} className='mt-1'
                    >
                    {
                        data.map((servicio, index) => (
                        <Grid 
                            item xs={matches ? 6:4}
                            key={index} 
                            onClick={()=>handleClickSerivicio(servicio)}
                            >
                            <CardServicio
                                key= {`card-serv-${servicio.id}`}
                                urlImage={servicio.urlImagen}
                                title={servicio.titulo}
                                description={servicio.subtitulo}
                                />
                        </Grid>
                        ))
                    }
                </Grid>

                </Slide>
               
            </Container>
        </Fragment>
    )
}


export default  Home;