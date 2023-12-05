import {React, Fragment, useEffect } from 'react';
import { Grid , useMediaQuery} from '@mui/material';
import Navbar  from "../../components/Navbar/Navbar";
import FormDatosPersonales from '../../components/Formularios/FormDatosPersonales';
import { useSelector} from 'react-redux';
import './MiCuenta.scss';

function MiCuenta() {

    const matches = useMediaQuery("(max-width:768px)");
    const cliente = useSelector(state => state.Cliente)
    
    useEffect(()=>{
        
    },[cliente.datosPersonales])

    return (
        <Fragment>
            <Navbar />
            <Grid>
                <Grid style={{padding: matches ? '30px':'60px'}}>
                    <FormDatosPersonales/>
                </Grid> 
            </Grid>
        </Fragment>
    )
}


export default  MiCuenta;