import React , {  useState }from "react";
import {  Grid , TextField , useMediaQuery , Button ,Avatar , Typography , Select , MenuItem , InputLabel , FormControl , FormHelperText} from "@mui/material";
import './Formularios.scss';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import ModalSubirImagen from "../Modal/SubirImagen/ModalSubirImagen";
import RfcFacil from 'rfc-facil';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {useNavigate } from 'react-router-dom';
import { useDispatch , useSelector} from 'react-redux';
import { actualizarClienteDatosPersonales , actualizarCliente, guardarFotoPerfil } from '../../redux/actions/clienteActions';
import Loading from "../Loading/Loading";
import PhoneInput from '../PhoneInput';
import dayjs from 'dayjs';

function FormDatosPersonales (){

	const matches = useMediaQuery("(max-width:768px)");
	let history = useNavigate();
	const [imageModal, setImageModal] = useState(false);
	const dispatch = useDispatch();
	const reduxActualizarDatosPersonales = (data) => dispatch(actualizarClienteDatosPersonales(data))
	const cliente = useSelector(state => state.Cliente)
	const dbCrearActualizar = async(data ) => dispatch(actualizarCliente(data))
	const guardarFoto = async(data) => dispatch(guardarFotoPerfil(data))
	const [showLoading , setShowLoading] = useState(false);
	const [fotoPerfil , setFotoPerfil] = useState('');

	async function onReceiveFile(file) {
		setFotoPerfil(file);
		setImageModal(false);
	}


	const saveFileS3 =async ()=>{
		let data = {
				id: cliente.id,
				fileName: "foto-perfil",
				extension: "png",
				base64: fotoPerfil,
		}; 
		setShowLoading(true)
		await guardarFoto(data);
		setShowLoading(false)
}

	const clickCargarImagen = () =>{
			setImageModal(true);
	}

	const generarRFC = () => {
		
		const { nombre, paterno, materno, date } = formik.values
		if(	nombre !== '' && 
					paterno !== '' && 
					materno !== '' &&
					date !== null && date !==''){
					//Calcular el RFC
					const rfc = RfcFacil.forNaturalPerson({
						name: nombre,
						firstLastName: paterno,
						secondLastName: materno,
						day: date?.$d.getDate(),
						month: date?.$d.getMonth()+1,
						year: date?.$d.getFullYear()
					});
					//console.log(' getFullYear = ', date?.$d.getFullYear() )
				formik.setFieldValue("rfc", rfc)
				} 
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		formik.setFieldValue(name, value)
	}

	const symbols =/^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀ\s\-.]+$/

	const validationSchema = Yup.object({
			nombre: Yup.string().required('Requerido')
			.matches(symbols, 'Por favor ingresa un nombre válido'),
			paterno: Yup.string().required('Requerido')
			.matches(symbols, 'Por favor ingresa solo letras'),
			materno: Yup.string().required('Requerido')
			.matches(symbols, 'Por favor ingresa solo letras'),
			genero: Yup.string().required('Requerido'),
			rfc: Yup.string().required('Requerido'),
			date: Yup.date().nullable(),
	})

	const formik = useFormik({
		
		initialValues: {
				//inicializar valores
				nombre:  cliente.datosPersonales !== undefined ? cliente.datosPersonales.nombre:'',
				paterno: cliente.datosPersonales !== undefined ? cliente.datosPersonales.apellidoPaterno:'',
				materno: cliente.datosPersonales !== undefined ? cliente.datosPersonales.apellidoMaterno:'',
				genero: cliente.datosPersonales !== undefined ? cliente.datosPersonales.genero:'',
				rfc: cliente.datosPersonales !== undefined ? cliente.datosPersonales.rfc:'',
				date:  cliente.datosPersonales !== undefined ? dayjs(cliente.datosPersonales.fechaNacimiento):null, 
				celular: cliente.celular,
		},
		onSubmit: async values => {
					//Guardar foto en S3
					if(fotoPerfil !== '' ){
						await saveFileS3();
					}
					//Actualizar Redux
					reduxActualizarDatosPersonales(values);
					//Actualizar en Base de datos 
					let res= await dbCrearActualizar(bindNewProperties(values));
					if(res.status === 200){
							history('/home');
					}
					else{
							//console.log(" res = ", res);
					}
		},
		validationSchema,
		validate: values => {

			let errors = {}
			if(values.date===null){
				errors.date = "Requerido"
			}


		if(!values.celular) {
				errors.celular = "Requerido"
		} else if(values.celular.toString().length !== 10) {
				errors.celular = "El teléfono debe tener 10 caracteres"
		}

			return errors;
		}
	})

	const bindNewProperties = data => {
		let nuevoCliente = { ...cliente };
		nuevoCliente.datosPersonales.nombre = data.nombre;
		nuevoCliente.datosPersonales.apellidoPaterno = data.paterno;
		nuevoCliente.datosPersonales.apellidoMaterno = data.materno;
		nuevoCliente.datosPersonales.genero = data.genero;
		nuevoCliente.datosPersonales.fechaNacimiento = data.date;
		nuevoCliente.datosPersonales.rfc = data.rfc;
		nuevoCliente.celular = data.celular;
		return nuevoCliente;
	}

	return (
		<React.Fragment>
			<form onSubmit={formik.handleSubmit}>
			<Grid container spacing={2} className="mt-1">
					<Grid item xs={12} align='center' className="mb-1">
							<Avatar 
								alt="" 
								className="form-avatar"
								src={fotoPerfil !== '' ? fotoPerfil:cliente.datosPersonales.fotoPerfil}
								onClick={()=>{clickCargarImagen()}}
							/>
						<Typography>Foto de perfil</Typography>
					</Grid>
					<Grid item xs={matches ? 12:6}>
						<TextField
									name="nombre" 
									label="Escribe tu nombr(es)" 
									variant="outlined" 
									fullWidth
									value={formik.values.nombre}
									error={formik.touched.nombre && formik.errors.nombre ? true : false} 
									onChange={formik.handleChange} 
									onBlur={generarRFC} 
									helperText={formik.touched.nombre && formik.errors.nombre ? formik.errors.nombre : ''}
						/>
					</Grid>
					<Grid item xs={matches ? 12:6}>
						<TextField
									name="paterno" 
									label="Apellido paterno" 
									variant="outlined" 
									fullWidth
									value={formik.values.paterno}
									error={formik.touched.paterno && formik.errors.paterno ? true : false} 
									onChange={formik.handleChange} 
									onBlur={generarRFC} 
									helperText={formik.touched.paterno && formik.errors.paterno ? formik.errors.paterno : ''}
						/>
					</Grid>
					<Grid item xs={matches ? 12:6}>
						<TextField
									name="materno" 
									label="Apellido materno" 
									variant="outlined" 
									fullWidth
									value={formik.values.materno}
									error={formik.touched.materno && formik.errors.materno ? true : false} 
									onChange={formik.handleChange} 
									onBlur={generarRFC} 
									helperText={formik.touched.materno && formik.errors.materno ? formik.errors.materno : ''}
						/>
					</Grid>
					<Grid item xs={matches ? 6:3} align='left'>
						<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en'}>
							<MobileDatePicker
									name="date"
									label="Fecha nacimiento"
									inputVariant="outlined"
									disableFuture
									fullWidth
									openTo="year"
									views={['year', 'month', 'day']}
									format="DD/MM/YYYY"
									value={formik.values.date}
									error={formik.touched.date && formik.errors.date ? true : false} 
									onChange={value => formik.setFieldValue("date", value)} 
									onBlur={generarRFC}  
								/>
								<FormHelperText>{formik.touched.date && formik.errors.date ? formik.errors.date : ''}</FormHelperText>
						</LocalizationProvider>
					</Grid>	
					<Grid item xs={matches ? 6:3}>
							<FormControl 
								variant="outlined" 
								fullWidth 
								error={formik.touched.genero && formik.errors.genero ? true : false}
							>
							<InputLabel>Género</InputLabel>
							<Select
									name="genero" 
									label="Género" 
									variant="outlined" 
									fullWidth
									value={formik.values.genero} 
									onChange={(e)=>handleChange(e)}
									onBlur={formik.handleBlur}
								>
									<MenuItem value="Masculino">Masculino</MenuItem>
									<MenuItem value="Femenino">Femenino</MenuItem>
							</Select>
							<FormHelperText>{formik.touched.genero && formik.errors.genero ? formik.errors.genero : ''}</FormHelperText>
							</FormControl>
					</Grid>
					<Grid item xs={matches ? 12:6}>
						<TextField
								name="celular" 
								label="Teléfono" 
								variant="outlined" 
								fullWidth
								value={formik.values.celular}
								error={formik.touched.celular && formik.errors.celular ? true : false} 
								onChange={formik.handleChange} 
								onBlur={formik.handleBlur} 
								helperText={formik.touched.celular && formik.errors.celular ? formik.errors.celular : ''}
								InputProps={{
									inputComponent: PhoneInput,
							}}
						/>
					</Grid>
					<Grid item xs={matches ? 12:6}>
						<TextField disabled
								color="primary"
								name="rfc" 
								label="RFC" 
								variant="outlined" 
								fullWidth
								value={formik.values.rfc}
								error={formik.touched.rfc && formik.errors.rfc ? true : false} 
								onChange={formik.handleChange} 
								onBlur={formik.handleBlur} 
								helperText={formik.touched.rfc && formik.errors.rfc ? formik.errors.rfc : ''}
						/>
					</Grid>
					<Grid item xs={12} className="mt-1" align='center'>
							<Button 
									variant="contained" 
									color="primary" 
									size="large"  
									type="submit"
									className="btn-rojo"> 
											Guardar 
							</Button>
          </Grid>
			</Grid>

			<ModalSubirImagen 
					openModal={imageModal} 
					handleClose={() => setImageModal(false)}
					callback={onReceiveFile} 
			/>
			{
					showLoading && <Loading/>
			}
		</form>
		</React.Fragment>
		
		)

}

export default  FormDatosPersonales;