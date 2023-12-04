import React , { useEffect, useState } from 'react';
import {  Typography , 
    Grid, 
    TextField , 
    Button , 
    IconButton , 
    Icon , 
    useMediaQuery , 
    InputAdornment,
} from '@mui/material';
import { useNavigate , useLocation} from 'react-router-dom';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility'; 
import * as Yup from 'yup';
import { useFormik } from 'formik';
/* import Loading from "../components/Loading/Loading"; */
import { useDispatch } from 'react-redux';
import  {clienteLogin}  from "../../redux/actions/clienteActions";  
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {logIn} from "../../services/firebase/auth"
import "./Login.scss"


function Login() {

    let history = useNavigate();
    const location = useLocation();
    const matches = useMediaQuery("(max-width:768px)");
    const [showPassword, setShowPassword] = useState(false);
    const [showModal , setShowModal] = useState(false);
    const dispatch = useDispatch()
    const Login = (email,password) => dispatch(clienteLogin(email,password))
    const notify = (error) => toast.error(error);
    const notifySuccess = (message) => toast.success(message);
 

    const validationSchema = Yup.object({
        email: Yup.string().email("Formato inválido").required('Requerido'),
        password: Yup.string().required('Requerido'),
    })


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            setShowModal(true);
            let res= await Login( values.email , values.password );
            if(res.status === 200){
                await logIn(values.email, values.password)
                history("/tracking")
            }else{
                notify(res.data.message);
            }
            setShowModal(false);
        },
        validationSchema,
        validate: values => {

        }
    })

    useEffect(()=>{
        switch(location.state)
        {
            case 'signin':
                notifySuccess("Usuario registrado correctamente")
                break;
            case 'recoverpassword':
                notifySuccess('Revisa tu correo para recupear tu contraseña');
                break;
            default:
                break;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    

    return (
        <React.Fragment>
        <form onSubmit={formik.handleSubmit}>
            <Grid  className="img-background" >
                <Grid style={{padding: "20px"}}>
                <Grid container spacing={2}>
                    <Grid item xs={2} >  
                        {/* Logo de Siavial */}
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
                        <Grid className="mt-1"> 
                            <Typography className="texto-subtitulo-small">
                                    Servicios Integrales de Asistencia Vial
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                    <Grid  align= 'left' className="mt-1"> 
                        <IconButton onClick={()=>window.open("https://siavial.com",'_parent')}>
                            <Icon color="primary" className="fas fa-chevron-left icon-arrow"/>
                        </IconButton>
                    </Grid>


                    <Grid  align= 'center' > 
                        <Typography className="texto-titulo-large">
                            <b>Bienvenido</b>
                        </Typography>
                    </Grid>

                    <Grid  container align= 'center' className="mt-2"> 
                        <Grid item xs={12}>
                        <Typography className="texto-small" >
                            Estamos cerca en esos malos momentos, somos una plataforma de asistencia vial. 
                        </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                className = "textfield-white mt-2" 
                                variant="outlined"  
                                label="Correo Electrónico" 
                                style={{width:  matches ? '100%':'50%'}}
                                name="email" 
                                value={formik.values.email}
                                error={formik.touched.email && formik.errors.email ? true : false} 
                                onChange={formik.handleChange} onBlur={formik.handleBlur} 
                                helperText={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                className = "textfield-white mt-2" 
                                variant="outlined"  
                                label="Contraseña" 
                                style={{width:  matches ? '100%':'50%'}}
                                name="password" 
                                type={showPassword ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            style={{color:'white'}}
                                            onClick={()=>{setShowPassword(!showPassword)}}
                                            onMouseDown={()=>{setShowPassword(!showPassword)}}
                                            edge="end"
                                        >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    )
                                }}
                                value={formik.values.password}
                                error={formik.touched.password && formik.errors.password ? true : false} 
                                onChange={formik.handleChange} onBlur={formik.handleBlur} 
                                helperText={formik.touched.password && formik.errors.password ? formik.errors.password : ''}
                            />
                        </Grid>

                     {/* Boton de registrarse */}
                    
                    <Grid item xs={12} className="mt-4" align= 'center'>
                        <Button 
                            /* onClick={()=>handleClickSesion()}   */
                            variant="contained" 
                            color="primary" 
                            size="large"  
                            type="submit"
                            className="btn-rojo"> 
                                <b> Iniciar Sesión </b>
                        </Button>
                    </Grid>

                     {/* Ya tienes cuenta */}
                    <Grid container spacing={6} className="mt-2">
                        <Grid  item xs={6} align= 'center' > 
                            <Typography className="texto-small">
                                Aún no tienes cuenta ? <span> <b onClick={()=>history.push("/registro")}> Regístrate</b></span>
                            </Typography>
                        </Grid>

                        <Grid  item xs={6} align= 'center' > 
                            <Typography onClick={()=>history.push("/recoverpassword")} className="texto-small">
                                Olvide mi contraseña
                            </Typography>
                        </Grid>

                    </Grid>

                    </Grid>
                </Grid>
                
                <ToastContainer 
                    position="top-center"
                    autoClose={2500}
                />
            </Grid>
            {/* {
                showModal && <Loading/>
            } */}
        </form>
        </React.Fragment>
    )
}


export default  Login;