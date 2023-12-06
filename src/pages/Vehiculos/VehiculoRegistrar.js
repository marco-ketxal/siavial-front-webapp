import {React, Fragment} from 'react';
import { Grid , useMediaQuery , IconButton , Icon} from '@mui/material';
import Navbar  from "../../components/Navbar/Navbar";
import FormDatosAuto from '../../components/Formularios/FormDatosAuto';
import { useNavigate , useLocation} from 'react-router-dom';
import './vehiculo.scss'


function VehiculoRegistrar() {
    
    const matches = useMediaQuery("(max-width:768px)");
    let history = useNavigate();
    const location = useLocation();

    const handleBack =()=>{
        if(location.state !== undefined){  //id de servicios
            history('/vehiculoseleccionar', {state:location.state});
        }else{  
            history('/vehiculos');
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
            <Grid style={{padding: matches ? '30px':'120px'}}>
                <FormDatosAuto idServicio={location.state}/>
            </Grid>
        </Fragment>
    )
}

export default  VehiculoRegistrar;