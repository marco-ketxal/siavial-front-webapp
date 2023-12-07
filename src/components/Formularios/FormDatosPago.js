import React , { useEffect, useState }from "react";
import {  Grid , TextField , Dialog ,useMediaQuery , Button , Select , Container , MenuItem , Typography , FormControl , InputLabel , FormHelperText , Icon} from "@mui/material";
import './Formularios.scss';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {useNavigate , useLocation} from 'react-router-dom';
import { useDispatch , useSelector} from 'react-redux';
import { actualizarPagos , actualizarCliente , crearClienteConekta , eliminarFormaPagoConekta , agregarFormaPagoConekta} from '../../redux/actions/clienteActions';
import ModalDecision from '../Modal/ModalDecision'
import LoadingPago from '../LoadingPago/LoadingPago';
import * as conektaUtil from "../../utils/conekta";


function FormDatosPago ({idPago}){

	const matches = useMediaQuery("(max-width:768px)");
	let history = useNavigate();
	let location = useLocation();
	const dispatch = useDispatch();
	const reduxActualizarPagos = async(pagos) => dispatch(actualizarPagos(pagos))
	const conektaCrearCliente = async(clienteConekta) => dispatch(crearClienteConekta(clienteConekta))
	const conektaEliminarFormaPago = async(formaPago) => dispatch(eliminarFormaPagoConekta(formaPago))
	const conektaAgregarFormaPago = async(formaPago) => dispatch(agregarFormaPagoConekta(formaPago))
	const cliente = useSelector(state => state.Cliente)
	const dbCrearActualizar = async(data ) => dispatch(actualizarCliente(data))
	const [openModal , setOpenModal] = useState(false);
	const [openModalGuardar , setOpenModalGuardar]= useState(false);
	const [open, setOpen] = useState(false);

useEffect(()=>{
	dbCrearActualizar(cliente);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	console.log('idPago = ', idPago)
},[cliente.idConekta])

useEffect(()=>{
	dbCrearActualizar(cliente);
	// eslint-disable-next-line react-hooks/exhaustive-deps
},[cliente.metodosPago])
	

const validationSchema = Yup.object({
		titular: Yup.string().required('Requerido'),
		mes: Yup.string().required('Requerido'),
		anio: Yup.string().required('Requerido')
})

const handleClose =()=>{
	setOpen(false);
}


const creaActualizaClienteConekta=async(token)=>{
	let clienteConekta={
			name:`${cliente.datosPersonales.nombre} ${cliente.datosPersonales.apellidoPaterno} ${cliente.datosPersonales.apellidoMaterno}`,
			email: cliente.email,
			phone: cliente.celular,
			payment_sources:[{
				type:"card",
				token_id: token
			}]
	}
	if(cliente.idConekta==='' || cliente.idConekta===undefined){
		//Crear cliente en conekta
		await conektaCrearCliente(clienteConekta);
	}else{
		// Agregar nuevo Método de Pago
		const objPayment={
			idCustomer:cliente.idConekta,
			payment:{
				type:"card",
				token_id: conektaUtil.tokenCard,
			}
		}
		await dbCrearActualizar(cliente);
		await conektaAgregarFormaPago(objPayment)
	}
}

const generarTokenTarjeta=async(values)=>{
	try{
		var cardData = {
			"card": {
				"number": values.tarjeta,
				"name": values.titular,
				"exp_year": values.anio,
				"exp_month": values.mes,
				"cvc": values.cvv,
				"type":"card"
			}
		}
		await conektaUtil.tokenizerCard(cardData)
	
	}catch(error){
		console.log("Error al generar token de tarjeta ", error)
		return '';
	}
}

const handleConfirmarGuardado =async ()=>{
	if(conektaUtil.tokenCard !== ''){
		await creaActualizaClienteConekta(conektaUtil.tokenCard);
		if(location.state !== undefined){ 
			history('/pagoseleccionar',location.state);
		}else{
			history('/pagos');
		}
	}else{
		console.log('Error al guardar la forma de pago')
	}
}

const formik = useFormik({
	initialValues: {
		titular: idPago !== undefined ? cliente?.metodosPago[idPago]?.name:'',
		tarjeta: idPago !== undefined ? cliente.metodosPago[idPago]?.last4:'',
		mes: idPago !== undefined ? cliente.metodosPago[idPago]?.exp_month:'',
		anio: idPago !== undefined ? cliente.metodosPago[idPago]?.exp_year:'',
		cvv: '',
	},
	onSubmit: async  values => {
			if(idPago === undefined){
					await generarTokenTarjeta(values);
					setOpenModalGuardar(true);
			}else{
				setOpenModal(true);
			}
	},
	validationSchema,
	validate: values => {

		if(idPago === undefined){
				let errors = {}
				if(!values.tarjeta) {
					errors.tarjeta = "Requerido"
				}

				if(isNaN(values.tarjeta)) {
						errors.tarjeta = "Sólo se aceptan números"
				}

				if(values.tarjeta.toString().length < 16 ||  values.tarjeta.toString().length > 17) {
						errors.tarjeta = "El número de tarjeta debe ser de 16 dígitos"
				}
			
				if(isNaN(values.cvv)) {
						errors.cvv = "Sólo se aceptan números"
				}
				if(values.cvv.toString().length < 3 || values.cvv.toString().length > 4) {
						errors.cvv = "Debe de tener 3 o 4 dígitos."
				}
					return errors;
			}
	}
})

const handleEliminarPago = () =>{
	let newCliente = {...cliente};
	let pagoConekta={
		idCustomer: newCliente.idConekta,
		idPayment : newCliente.metodosPago[idPago].id
	}
	conektaEliminarFormaPago(pagoConekta);
	newCliente.metodosPago.splice(idPago,1);
	reduxActualizarPagos(newCliente.metodosPago); 
	dbCrearActualizar(newCliente);
	history('/pagos')
}

const handleChange = (e) => {
	const { name, value } = e.target;
	formik.setFieldValue(name, value)
}


	return (
		<React.Fragment>
			<form onSubmit={formik.handleSubmit}>
			<Grid>
            <Container maxWidth="md" style={{padding: "10px" }}> 
                <Typography className="text-title-page ">Datos de pago</Typography>
                    <Grid container spacing={3} className="mt-05">
                        <Grid item xs={matches ? 12:6}> 
                            <TextField  
															disabled = {idPago === null ? false : true}
															label="Titular de la Tarjeta" 
															fullWidth={true} 
															variant="outlined" 
															name="titular"
															value={formik.values.titular}
															error={formik.touched.titular && formik.errors.titular ? true : false} 
															onChange={formik.handleChange} 
															onBlur={formik.handleBlur}
															helperText={formik.touched.titular && formik.errors.titular ? formik.errors.titular : ''}
														/> 
                        </Grid>
                        <Grid item xs={matches ? 12:6}>
                            <TextField
															disabled = {idPago === null ? false : true}
															label="Número de Tarjeta" 
															fullWidth={true} 
															variant="outlined"  
															name="tarjeta"
															value={formik.values.tarjeta}
															error={formik.touched.tarjeta && formik.errors.tarjeta ? true : false} 
															onChange={formik.handleChange} 
															onBlur={formik.handleBlur}
															helperText={formik.touched.tarjeta && formik.errors.tarjeta ? formik.errors.tarjeta : ''}
														/> 
                        </Grid>
                        <Grid item xs={12 }> 
                            <Typography  > Vencimiento </Typography>
                        </Grid>
                    <Grid item xs={6}>
                        <FormControl 
													disabled = {idPago === null ? false : true}
													fullWidth
													variant="outlined"
													error={formik.touched.mes && formik.errors.mes ? true : false}
												>
                            <InputLabel>Mes</InputLabel> 
                            <Select 
																fullWidth 
																label="Mes" 
																name="mes"
																variant="outlined" 
																value={formik.values.mes} 
																defaultValue="01"
																onChange={(e)=>handleChange(e)}
																onBlur={formik.handleBlur}
														>
                                <MenuItem value="01">Enero</MenuItem>
                                <MenuItem value="02">Febrero</MenuItem>
                                <MenuItem value="03">Marzo</MenuItem>
                                <MenuItem value="04">Abril</MenuItem>
                                <MenuItem value="05">Mayo</MenuItem>
                                <MenuItem value="06">Junio</MenuItem>
                                <MenuItem value="07">Julio</MenuItem>
                                <MenuItem value="08">Agosto</MenuItem>
                                <MenuItem value="09">Septiembre</MenuItem>
                                <MenuItem value="10">Octubre</MenuItem>
                                <MenuItem value="11">Noviembre</MenuItem>
                                <MenuItem value="12">Diciembre</MenuItem>
                            </Select>
														<FormHelperText>{formik.touched.mes && formik.errors.mes ? formik.errors.mes : ''}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} >
                        <FormControl 
														disabled = {idPago === null ? false : true}
														fullWidth
														variant="outlined"
														error={formik.touched.anio && formik.errors.anio ? true : false}
												>
                            <InputLabel>Año</InputLabel>
														<Select 
																fullWidth 
																label="Año" 
																name="anio"
																variant="outlined" 
																value={formik.values.anio} 
																onChange={(e)=>handleChange(e)}
																onBlur={formik.handleBlur}
														>
                                <MenuItem value="22">2022</MenuItem>
                                <MenuItem value="23">2023</MenuItem>
                                <MenuItem value="24">2024</MenuItem>
                                <MenuItem value="25">2025</MenuItem>
                                <MenuItem value="26">2026</MenuItem>
                                <MenuItem value="27">2027</MenuItem>
                                <MenuItem value="28">2028</MenuItem>
                                <MenuItem value="29">2029</MenuItem>
                                <MenuItem value="30">2030</MenuItem>
                                <MenuItem value="31">2031</MenuItem>
                                <MenuItem value="32">2032</MenuItem>
                            </Select>
														<FormHelperText>{formik.touched.anio && formik.errors.anio ? formik.errors.anio : ''}</FormHelperText>
                        </FormControl>
												
                    </Grid>
										{
											idPago === null  && (	
												<Grid item xs={matches ? 7:3 }>
													<Typography  > Código de Seguridad </Typography>
													<TextField  
														className="mt-1"   
														label="CVV" 
														fullWidth={true} 
														variant="outlined"
														name="cvv" 
														type="password"
														value={formik.values.cvv}
														error={formik.touched.cvv && formik.errors.cvv ? true : false} 
														onChange={formik.handleChange} 
														onBlur={formik.handleBlur}
														helperText={formik.touched.cvv && formik.errors.cvv ? formik.errors.cvv : ''}
													/> 
											</Grid>
											) 
										}
                </Grid>
								<Grid  container className="mt-2">
									<Icon  className="fa fa-lock ssl_icon"/>
									<Typography style={{color:'gray' , padding:'4px'}}>SSL Pago Seguro</Typography>
							</Grid>
							<Grid>
								<Typography style={{color:'gray' , fontSize:'12px'}}>Proteger tu información es lo más importante para nosotros.</Typography>
							</Grid>
							<Grid>
								<Typography style={{color:'gray' , fontSize:'12px'}}>Todas nuestras transacciones estan cifradas. </Typography>
							</Grid>
                <Grid className="mt-3" align= 'center'>
                    <Button 
                        variant="contained" 
                        color="primary" 
												type="submit"
                        size="large"  
                        className="btn-rojo"> 
												{ idPago ===  null ? "Guardar":"Eliminar"}
                    </Button>
                </Grid>
            </Container>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth disableBackdropClick>
                <LoadingPago message="Estamos realizando el pago...."/>
            </Dialog>
            </Grid>
				{
					openModal && (
						<ModalDecision 
							openModal={openModal} 
							setOpenModal={setOpenModal}
							funcionDecision={handleEliminarPago}
							title={"Mensaje de confirmación"}
							message={"Seguro que desea eliminar este forma de pago ?"}
					/>
					)
				}
			{/* 	{
					showLoading && <Loading/>
				} */}
					{
						openModalGuardar && (
						<ModalDecision 
							openModal={openModalGuardar} 
							setOpenModal={setOpenModalGuardar}
							funcionDecision={handleConfirmarGuardado}
							mensaje={"Desea agregar nueva tarjeta ?"}
				/>
				)
			}
				
		</form>
		
		</React.Fragment>
		
		)

}

export default  FormDatosPago;