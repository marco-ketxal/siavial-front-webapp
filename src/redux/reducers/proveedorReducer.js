import { 
	PROVEEDOR_OBTENER_POR_ESTADO_SERVICIO, 
	} from "../types"


const initialState = {
	data:[]
}

export  default function datosProveedor(state=initialState, action){
	switch(action.type){
			case PROVEEDOR_OBTENER_POR_ESTADO_SERVICIO: 
					return {
						...state,
						data: action.payload	,
					}
		default:
			return state;
	}
}