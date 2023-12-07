import {React, Fragment} from 'react';
import { Grid , IconButton , Icon} from '@mui/material';
import Navbar  from "../../components/Navbar/Navbar";
import FormDatosPago from '../../components/Formularios/FormDatosPago';
import { useNavigate , useLocation} from 'react-router-dom';


function PagoRegistrar() {
    
    let history = useNavigate();
    const location = useLocation();

    const handleBack =()=>{
        if(location.state !== null){  //id de servicios
            history('/pagoseleccionar', {state: location.state});
        }else{  
            history('/pagos');
        }
    }

    return (
        <Fragment>
            <Navbar/>
            <Grid align='left'>
                <IconButton onClick={handleBack}>
                    <Icon  className="fa fa-arrow-left back-arrow-icon"/>
                </IconButton>
            </Grid>
            <Grid style={{padding: '10px'}}>
                <FormDatosPago idPago={location.state}/>
            </Grid>
        </Fragment>
    )
}

export default  PagoRegistrar;