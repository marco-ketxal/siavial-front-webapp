import { 
	SOLICITUD_ACTUALIZAR_TIPOSERVICIO, 
	SOLICITUD_ACTUALIZAR_ID_VEHICULO,
	SOLICITUD_PROVEEDOR_SELECCIONADO,
	SOLICITUD_ACTUALIZAR_ID_CLIENTE,
	SOLICITUD_ACTUALIZAR_ID_METODOPAGO,
	SOLICITUD_ACTUALIZAR_STATUS,
	SOLICITUD_CREAR_DB,
	SOLICITUD_ACTUALIZAR_DB,
	SOLICITUD_ENVIAR,
	SOLICITUD_CONEKTA_CREAR_ORDEN,
	SOLICITUD_ENVIAR_EMAIL_PAGO
	} from "../types"


const initialState = {
	id:'',
	folio:'',
  estatus: '',
  tipoSolicitud: '',
	claveSolicitud: '',
	iconoServicio: '',
  comentarios: '',
	monto:0,
	recorrido:{
		direccionInicio:'',
		horaInicio:'',
		tiempoEstimado:0
	},
	factura:{
		idMetodoPago:'',
	},
	idCliente:'',
	idVehiculo:'',
	idProveedor:'' 
}

export  default function datosSolicitud(state=initialState, action){
	switch(action.type){
			case SOLICITUD_ACTUALIZAR_ID_CLIENTE: 
				return {
					...state,
					idCliente: action.payload,
				}
			case SOLICITUD_ACTUALIZAR_TIPOSERVICIO: 
					return {
						...state,
						tipoSolicitud: action.payload.tipoServicio,
						claveSolicitud: action.payload.claveSolicitud,
						iconoServicio: action.payload.iconoServicio,
					}
			case SOLICITUD_ACTUALIZAR_ID_VEHICULO: 
					return {
						...state,
						idVehiculo: action.payload,
					}
			case SOLICITUD_PROVEEDOR_SELECCIONADO: 
				return {
					...state,
					idProveedor: action.payload.id,
					monto: parseInt(action.payload.monto, 10),
					recorrido:{
						...state.recorrido,
						tiempoEstimado: action.payload.tiempoEstimado
					}
				
				}
			case SOLICITUD_ACTUALIZAR_ID_METODOPAGO: 
				return {
					...state,
					factura:{
						...state.factura,
						idMetodoPago: action.payload,
					}
			}
			case SOLICITUD_ACTUALIZAR_STATUS: 
				return {
					...state,
					estatus: action.payload
				}
			case SOLICITUD_CREAR_DB: 
				return {
					...state,
					id: action.payload.message,
					folio: action.payload.folio				
				}
			case SOLICITUD_ACTUALIZAR_DB: 
				return {
					...state,
					id: action.payload.message
				}
			case SOLICITUD_ENVIAR:
			case SOLICITUD_ENVIAR_EMAIL_PAGO:
			case SOLICITUD_CONEKTA_CREAR_ORDEN:
            return state;
		default:
			return state;
	}
}