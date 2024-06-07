import React , { useEffect, useState } from 'react';
import {  Typography , 
    Grid, 
    TextField , 
    Button , 
    IconButton , 
    Icon , 
    useMediaQuery ,
} from '@mui/material';
import { useNavigate, useLocation} from 'react-router-dom';
import * as Yup from 'yup';
import Loading from "../../components/Loading/Loading";
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { reestablecerContrasenaEmail } from "../../redux/actions/clienteActions"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function RecoverPassword({callback}) {

    let history = useNavigate();
    const location = useLocation();
    const matches = useMediaQuery("(max-width:768px)");
    const [showModal , setShowModal] = useState(false);
    const dispatch = useDispatch()
    const EmailRecupear = async (email) => dispatch(reestablecerContrasenaEmail(email));
    const notify = (error) => toast.error(error);
    const notifySuccess = (message) => toast.success(message);

    const validationSchema = Yup.object({
        email: Yup.string().email("Formato inválido").required('Requerido'),
    })


    const formik = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: async values => {
            setShowModal(true);
            let res= await EmailRecupear( values.email , values.password );
            if(res.status === 200){
                history('/login',{state: {
                    origin:'recoverpassword'}})
            }else{
                notify(res.data.message);
            }
            setShowModal(false);
        },
        validationSchema,
        validate: values => {
            
        }
    })


    
    return (
        <React.Fragment>
        <form onSubmit={formik.handleSubmit}>
            <Grid  className="img-background" >
                <Grid style={{padding: "20px"}}>
                <Grid container spacing={2}>
                    <Grid item xs={2} >  
                        <Grid align= 'left' > 
                            <img 
                                src="https://assets-siavial.s3.amazonaws.com/general/logo.png" 
                                alt="" 
                                height="50px" 
                                width="35px"
                            />
                        </Grid>
                    </Grid>
                    <Grid align= 'center' item xs={12} >  
                        <Grid className="mt-1" > 
                            <Typography className="texto-subtitulo-small">
                                    Servicios Integrales de Asistencia Vial
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                    <Grid  align= 'left' className="mt-1"> 
                        <IconButton onClick={()=>history('/login')}>
                            <Icon color="primary" className="fas fa-chevron-left icon-arrow"/>
                        </IconButton>
                    </Grid>
                    <Grid align= 'center'  className="mt-2"> 
                        <Typography className="texto-titulo-large">
                            <b>Recuperación de Contraseña</b>
                        </Typography>
                    </Grid>
                    <Grid  container align= 'center' className="mt-2"> 
                        <Grid item xs={12}>
                        <Typography className="texto-small" >
                            Te enviaremos un correo electrónico para que puedas recuperar tu contraseña.
                        </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                className = "textfield-white mt-2" 
                                variant="outlined"  
                                label="Mi correo electrónico" 
                                style={{width:  matches ? '100%':'50%'}}
                                name="email" 
                                value={formik.values.email}
                                error={formik.touched.email && formik.errors.email ? true : false} 
                                onChange={formik.handleChange} onBlur={formik.handleBlur} 
                                helperText={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
                            />
                        </Grid>
                        <Grid item xs={12} className="mt-4" align= 'center'>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                size="large"  
                                type="submit"
                                className="btn-rojo"
                            > 
                                    Enviar
                            </Button>
                        </Grid>
              
                    <Grid  item xs={12} align= 'center' className="mt-4"> 
                        <Typography className="texto-subtitulo-small">
                            Ya recorde mi contraseña <span> <b onClick={()=>history("/login")}> Iniciar Sesión</b></span>
                        </Typography>
                    </Grid>
                    </Grid>
                </Grid>
                <ToastContainer 
                    position="top-center"
                    autoClose={2500}
                />
            </Grid>
            {
                showModal && <Loading/>
            }
        </form>
        </React.Fragment>
    )
}

export default  RecoverPassword;