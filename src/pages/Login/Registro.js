import React , { useState } from 'react';
import {  Typography , 
    Grid, 
    TextField , 
    Button , 
    IconButton , 
    Icon, 
    useMediaQuery,
    InputAdornment
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility'; 
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Loading from "../../components/Loading/Loading";
import { useDispatch } from 'react-redux';
import { clienteRegistro } from "../../redux/actions/clienteActions"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function Registro() {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showModal , setShowModal] = useState(false);
    const dispatch = useDispatch()
    const SignIn = async (email,password) => dispatch(clienteRegistro(email,password))
    const notify = (error) => toast.error(error);
    let history = useNavigate();
    const matches = useMediaQuery("(max-width:768px)");

    const validationSchema = Yup.object({
        email: Yup.string().required('Requerido'),
        password: Yup.string().required('Requerido'),
        confirm: Yup.string().required('Requerido'),
    })

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirm: ''
        },
        onSubmit: async values => {
            if(values.password===values.confirm){
                setShowModal(true);
                let res= await SignIn( values.email , values.password );
                setShowModal(false);
                if(res.status === 200){
                    history('/login',{state: {
                        origin:'signin'}})
                }else{
                    notify(res.data.message);
                }
                
            }else{
                notify('Las contraseñas no coinciden');
            }
        },
        validationSchema,
        validate: values => {


        }
    })


    return (
        <React.Fragment>
        <form onSubmit={formik.handleSubmit}>
            <Grid  className="img-background" >
                <Grid  style={{padding: "20px"}}>
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
                    <Grid align= 'center' item xs={10} >  
                        <Grid className="mt-1"> 
                            <Typography className="texto-subtitulo-small">
                                    Servicios Integrales de Asistencia Vial
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid  align= 'left' className="mt-1"> 
                    <IconButton onClick={()=>history("/login")}>
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
                                style={{width:  matches ? '100%':'50%'}}
                                variant="outlined"  
                                label="Correo Electrónico" 
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
                        <Grid item xs={12}>
                            <TextField 
                                className = "textfield-white mt-2" 
                                variant="outlined"  
                                label="Confirmar contraseña" 
                                style={{width:  matches ? '100%':'50%'}}
                                name="confirm" 
                                type={showConfirm ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            style={{color:'white'}}
                                            onClick={()=>{setShowConfirm(!showConfirm)}}
                                            onMouseDown={()=>{setShowConfirm(!showConfirm)}}
                                            edge="end"
                                        >
                                        {showConfirm ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    )
                                }}
                                value={formik.values.confirm}
                                error={formik.touched.confirm && formik.errors.confirm ? true : false} 
                                onChange={formik.handleChange} onBlur={formik.handleBlur} 
                                helperText={formik.touched.confirm && formik.errors.confirm ? formik.errors.confirm : ''}
                            />
                        </Grid>
                        {/* Boton de registrarse */}
                        <Grid item xs={12} className="mt-4" align= 'center'>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                size="large"
                                type="submit"  
                                className="btn-rojo"> 
                                    Registrarme
                            </Button>
                        </Grid>
                    {/*  <Grid container spacing={4} className="mt-5">
                        <Grid align= 'center'  item xs={6} >  
                            <Typography className="texto-small" type={{cursor:'pointer'}}>
                                Registro con <b>FACEBOOK</b>
                            </Typography>
                        </Grid>
                        <Grid align= 'center' item xs={6} >  
                            <Typography className="texto-small" type={{cursor:'pointer'}}>
                                Registro con  <b>GOOGLE</b>
                            </Typography>
                        </Grid>
                    </Grid> */}
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


export default  Registro;