import {React, Fragment} from 'react';
import { Grid , useMediaQuery , IconButton , Icon} from '@mui/material';
import Navbar  from "../../components/Navbar/Navbar";
import FormDatosPago from '../../components/Formularios/FormDatosPago';
import { useNavigate , useLocation } from 'react-router-dom';

function PagoDetalle() {
    const matches = useMediaQuery("(max-width:768px)");
    let history = useNavigate();
    let location = useLocation();

    return (
        <Fragment>
            <Navbar/>
            <Grid align='left'>
            <IconButton onClick={()=>history('/pagos')}>
                <Icon  className="fa fa-arrow-left back-arrow-icon "/>
            </IconButton>
            </Grid>
            <Grid style={{padding: matches ? '10px':'100px', marginTop: matches ? '-15px':'-100px'}}>
                <FormDatosPago idPago={location.state.id}/>
            </Grid>
        </Fragment>
    )
}

export default  PagoDetalle;