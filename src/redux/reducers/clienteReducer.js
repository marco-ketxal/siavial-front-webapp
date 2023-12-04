import { 
	CLIENTE_LOGIN , 
	CLIENTE_REGISTRO,
	CLIENTE_ACTUALIZAR_DATOS_PERSONALES,
	CLIENTE_ACTUALIZAR_VEHICULOS,
	CLIENTE_ACTUALIZAR_PAGOS,
	CLIENTE_ACTUALIZAR,
	CLIENTE_GUARDAR_FOTO_PERFIL,
	CLIENTE_GUARDAR_FOTO_VEHICULO,
	OBTENER_HISTORIAL_SERVICIOS,
	CLIENTE_OBTENER_POR_ID_FIREBASE,
	LOG_OUT,
	CLIENTE_CONEKTA_CREAR,
	CLIENTE_CONEKTA_ELIMINAR_FORMA_PAGO,
	CLIENTE_CONEKTA_AGREGAR_FORMA_PAGO
	} from "../types"


const initCliente = {
	id:'',
  email: '',
  celular: '',
  datosPersonales: {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    genero: '',
    fechaNacimiento: '',
    rfc: '',
    fotoPerfil: ''
  },
  metodosPago: [],
  vehiculos: [],
	servicios:[],
	uidFirebase:'',
	idConekta:''
}

export  default function dataCliente(state=initCliente, action){
	switch(action.type){
			case CLIENTE_OBTENER_POR_ID_FIREBASE:
			case CLIENTE_LOGIN: 
			return {
				...state= action.payload,
				id: action.payload._id,
				email: action.payload.email
			}
			case CLIENTE_ACTUALIZAR: 
			case CLIENTE_REGISTRO: 
					return state;
			case CLIENTE_ACTUALIZAR_DATOS_PERSONALES:
				return {
					...state,
					datosPersonales:{
						...state.datosPersonales,
						nombre: action.payload.nombre,
						apellidoPaterno: action.payload.paterno,
						apellidoMaterno: action.payload.materno,
						genero: action.payload.genero,
						fechaNacimiento: action.payload.date,
						rfc: action.payload.rfc,
						celular:action.payload.celular
					}
				}
		case CLIENTE_ACTUALIZAR_VEHICULOS:
			return {
				...state,
				vehiculos: action.payload,
			}
		case CLIENTE_ACTUALIZAR_PAGOS:
			return {
				...state,
				metodosPago: action.payload,
			}
		case OBTENER_HISTORIAL_SERVICIOS:
			return {
				...state,
				servicios: action.payload,
			}
		case CLIENTE_GUARDAR_FOTO_PERFIL:
				return {
						...state,
						datosPersonales:{
							...state.datosPersonales,
							fotoPerfil: action.payload,
						}
				}
		case CLIENTE_GUARDAR_FOTO_VEHICULO:
			return state;
		case LOG_OUT:
			return {
					...state,
					id: "",
			};
		case CLIENTE_CONEKTA_CREAR:
			return {
				...state,
				idConekta: action.payload.idCustomer,
				metodosPago: action.payload.payment_sources.data
			}
		case CLIENTE_CONEKTA_ELIMINAR_FORMA_PAGO:
			return state;
		case CLIENTE_CONEKTA_AGREGAR_FORMA_PAGO:
			return {
				...state,
				metodosPago: [...state.metodosPago, action.payload],
			}
		default:
			return state;
	}
}