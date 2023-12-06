import {React, Fragment} from 'react';
import { Grid , useMediaQuery , IconButton , Icon} from '@mui/material';
import Navbar  from "../../components/Navbar/Navbar";
import FormDatosAuto from '../../components/Formularios/FormDatosAuto';
import { useNavigate , useLocation } from 'react-router-dom';
import './vehiculo.scss'

function VehiculosDetalle() {
    const matches = useMediaQuery("(max-width:768px)");
    let history = useNavigate();
    let location = useLocation();

    return (
        <Fragment>
            <Navbar/>
            <Grid align='left'>
            <IconButton onClick={()=>history('/vehiculos')}>
                <Icon  className="fa fa-arrow-left back-arrow-icon"/>
            </IconButton>
            </Grid>
            <Grid style={{padding: matches ? '30px':'100px', marginTop: matches ? '-15px':'-100px'}}>
                <FormDatosAuto idVehiculo={location.state.id}/> 
            </Grid>
        </Fragment>
    )
}

export default  VehiculosDetalle;