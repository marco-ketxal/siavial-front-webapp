import React , { useEffect, useState  }from "react";
import {  FormControl , Grid , TextField , useMediaQuery , Button , Avatar , Typography , Select, MenuItem, InputLabel} from "@mui/material";
import './Formularios.scss';
import ModalSubirImagen from "../Modal/SubirImagen/ModalSubirImagen";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {useNavigate , useLocation} from 'react-router-dom';
import { useDispatch , useSelector} from 'react-redux';
import { actualizarVehiculos , actualizarCliente , guardarFotoVehiculo} from '../../redux/actions/clienteActions';
import ModalDecision from '../Modal/ModalDecision'
import Loading from "../Loading/Loading";
import car from "../../assets/images/icon-car.png";

function FormDatosAuto ({idVehiculo}){

	const matches = useMediaQuery("(max-width:768px)");
	let history = useNavigate();
	let location = useLocation();
	const [imageModal, setImageModal] = useState(false);
	const dispatch = useDispatch();
	const reduxActualizarVehiculos = (vehiculos) => dispatch(actualizarVehiculos(vehiculos))
	const guardarFoto = (data) => dispatch(guardarFotoVehiculo(data))
	const cliente = useSelector(state => state.Cliente)
	const catalogoCar = useSelector(state=> state.CatalogoAuto)
	const dbCrearActualizar = (data ) => dispatch(actualizarCliente(data))
	const [openModal , setOpenModal] = useState(false);
	const [fotoVehiculo , setFotoVehiculo] = useState('');
	const [showLoading , setShowLoading] = useState(false);
	const [brands , setBrands ]=useState(null);
	const [models,setModels]=useState(null);

	useEffect(()=>{

		const transformBrans = catalogoCar.map((item)=>{
			return({
				id: item.id,
				brand: item.brand
			})
		})

		const transformModels = catalogoCar.map(({models:{id,description}})=>{
			return({
				id: id,
				name: description
			})

		})

		setBrands(transformBrans)
		setModels(transformModels)
	},[])

	


	async function onReceiveFile(file) {
		setFotoVehiculo(file);
		setImageModal(false);
	}

	const saveFileS3 =async ()=>{
		let data = {
				id: cliente.id,
				fileName: `foto-vehiculo-${idVehiculo !== undefined ? idVehiculo : cliente.vehiculos.length}`,
				extension: "png",
				base64: fotoVehiculo,
		}; 

		setShowLoading(true)
		let res = await guardarFoto(data);
		if(res.status === 200){
			setShowLoading(false)
			return res.data;
		}else{
			console.log(" error al guardar foto del vehiculo = ", res);
		}
		
		setShowLoading(false)
}

	const clickCargarImagen = () =>{
		setImageModal(true);
	}

const validationSchema = Yup.object({
		marca: Yup.string().required('Requerido'),
		modelo: Yup.string().required('Requerido'),
		version: Yup.string().required('Requerido'),
		anio: Yup.string().required('Requerido'),
		color: Yup.string().required('Requerido'),
		placa: Yup.string().required('Requerido'),
})

const formik = useFormik({
	initialValues: {
			marca: idVehiculo !== undefined ? cliente.vehiculos[idVehiculo].marca:'',
			modelo: idVehiculo !== undefined ? cliente.vehiculos[idVehiculo].modelo:'',
			version: idVehiculo !== undefined ? cliente.vehiculos[idVehiculo].version:'',
			anio: idVehiculo !== undefined ? cliente.vehiculos[idVehiculo].anio:'',
			color: idVehiculo !== undefined ? cliente.vehiculos[idVehiculo].color:'',
			placa: idVehiculo !== undefined ? cliente.vehiculos[idVehiculo].placa:'',
	},
	onSubmit: async  values => {
			//Guardar foto en S3
			let URLFoto='';
			if(fotoVehiculo !== '' ){
				URLFoto=await saveFileS3();
			}
			if(idVehiculo === undefined){
					dbCrearActualizar(bindNewProperties(values,URLFoto));
					if(location.state !== undefined){
						history('/vehiculoseleccionar',{ state: location.state});
					}else{
						history('/vehiculos');
					}
			}else{
					dbCrearActualizar(bindUpdateProperties(values, idVehiculo , URLFoto));
					if(idVehiculo === undefined){
						history('/vehiculoseleccionar',{ state: location.state});
					}else{
						history('/vehiculos');
					}
			}
	},
	validationSchema,
	validate: values => {

	}
})

const handleEliminarVehiculo = () =>{
	let newCliente = {...cliente};
	newCliente.vehiculos.splice(idVehiculo,1);
	reduxActualizarVehiculos(newCliente.vehiculos);
	dbCrearActualizar(newCliente)
	history('/vehiculos')
}

const bindUpdateProperties = (data, id , URLFoto) => {

		let newCliente = {...cliente};
		newCliente.vehiculos[id].marca=data.marca;
		newCliente.vehiculos[id].modelo=data.modelo;
		newCliente.vehiculos[id].version=data.version;
		newCliente.vehiculos[id].anio=data.anio;
		newCliente.vehiculos[id].color=data.color;
		newCliente.vehiculos[id].placa=data.placa;
		newCliente.vehiculos[id].foto=URLFoto === ''? newCliente.vehiculos[id].foto : URLFoto;
		reduxActualizarVehiculos(newCliente.vehiculos);
		return newCliente;
}  

const bindNewProperties = (vehiculo , URLFoto) => {
		let newCliente  = {...cliente}; 
		let autoTemplate ={
			marca: '',
			modelo: '',
			version: '',
			anio: '',
			color: '',
			placa: '',
			foto: ''
		}
		let vehiculoNuevo = autoTemplate;
		vehiculoNuevo.marca = vehiculo.marca;
		vehiculoNuevo.modelo = vehiculo.modelo;
		vehiculoNuevo.version = vehiculo.version;
		vehiculoNuevo.anio = vehiculo.anio;
		vehiculoNuevo.color = vehiculo.color;
		vehiculoNuevo.placa = vehiculo.placa;
		vehiculoNuevo.foto = URLFoto;
		newCliente.vehiculos.push(vehiculoNuevo);
		reduxActualizarVehiculos(newCliente.vehiculos); 
		return  newCliente;
}


	return (
		<React.Fragment>
			<form onSubmit={formik.handleSubmit}>
			<Grid container spacing={2} >
			<Grid item xs={12} align='center' className="mb-1">
							<Avatar 
								className="form-avatar"
								src={fotoVehiculo !== '' ? fotoVehiculo:  idVehiculo !== undefined ? cliente.vehiculos[idVehiculo].foto: car} 
							  onClick={()=>{clickCargarImagen()}} 
							/>
						<Typography>Foto vehículo</Typography>
					</Grid>
					<Grid item xs={matches ? 12:6}>
						<FormControl fullWidth>
						<InputLabel id="demo-simple-select-label">Marca</InputLabel>
						<Select
									name="marca" 
									label="Marca" 
									variant="outlined" 
									fullWidth
									value={formik.values.marca}
									error={formik.touched.marca && formik.errors.marca ? true : false} 
									onChange={formik.handleChange} 
									onBlur={formik.handleBlur}
									helperText={formik.touched.marca && formik.errors.marca ? formik.errors.marca : ''}
						>
							{
								brands && (
									brands.map((brand)=>{
										return(
										<MenuItem value={brand.id}>{brand.brand}</MenuItem>
										)
									})
								)
							}
						</Select>
						</FormControl>
					</Grid>
					<Grid item xs={matches ? 12:6}>
						<FormControl fullWidth>
						<InputLabel id="demo-simple-select-label2">Modelo</InputLabel>
						<Select
									name="modelo" 
									label="Tipo" 
									variant="outlined" 
									fullWidth
									value={formik.values.modelo}
									error={formik.touched.modelo && formik.errors.modelo ? true : false} 
									onChange={formik.handleChange} 
									onBlur={formik.handleBlur}
									helperText={formik.touched.modelo && formik.errors.modelo ? formik.errors.modelo : ''}
						>
							{
								models && (
									models.map((models)=>{
										return(
										<MenuItem value={models.id}>{models.name}</MenuItem>
										)
									})
								)
							}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={6}>
						<TextField
									name="version" 
									label="Versión" 
									variant="outlined" 
									fullWidth
									value={formik.values.version}
									error={formik.touched.version && formik.errors.version ? true : false} 
									onChange={formik.handleChange} 
									onBlur={formik.handleBlur}
									helperText={formik.touched.version && formik.errors.version ? formik.errors.version : ''}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
									name="anio" 
									label="Modelo(Año)" 
									variant="outlined" 
									fullWidth
									value={formik.values.anio}
									error={formik.touched.anio && formik.errors.anio ? true : false} 
									onChange={formik.handleChange} 
									onBlur={formik.handleBlur}
									helperText={formik.touched.anio && formik.errors.anio ? formik.errors.anio : ''}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
									name="color" 
									label="Color" 
									variant="outlined" 
									fullWidth
									value={formik.values.color}
									error={formik.touched.color && formik.errors.color ? true : false} 
									onChange={formik.handleChange} 
									onBlur={formik.handleBlur}
									helperText={formik.touched.color && formik.errors.color ? formik.errors.color : ''}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
								name="placa" 
								label="# de placas" 
								variant="outlined" 
								fullWidth
								value={formik.values.placa}
								error={formik.touched.placa && formik.errors.placa ? true : false} 
								onChange={formik.handleChange} 
								onBlur={formik.handleBlur} 
								helperText={formik.touched.placa && formik.errors.placa ? formik.errors.placa : ''}
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

					{
						idVehiculo !== undefined && (
							<Grid item xs={12} className="mt-1" align='center'>
								<Button 
										variant="contained" 
										color="secondary" 
										size="large"  
										onClick={()=>{setOpenModal(true)}}
										className="btn-rojo"> 
												Eliminar vehículo 
								</Button>
          	</Grid>
						)
					}

				

			</Grid>

			<ModalSubirImagen 
            openModal={imageModal} 
            handleClose={() => setImageModal(false)}
            callback={onReceiveFile} 
			/>
			{
				openModal && (
					<ModalDecision 
						openModal={openModal} 
						setOpenModal={setOpenModal}
						funcionDecision={handleEliminarVehiculo}
						title={"Mensaje de conirmación"}
						message={"Seguro que desea eliminar el vehículo ?"}
				/>
				)
			}

			{
					showLoading && <Loading/>
			}
			
		</form>
		
		</React.Fragment>
		
		)

}

export default  FormDatosAuto;