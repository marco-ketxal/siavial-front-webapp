import {
	CATALOGO_OBTENER_MARCAS_MODELO
} from '../types';


const initialCatalog = [];

export default function datosCatalogo(state = initialCatalog , action ){
	switch(action.type){
		case CATALOGO_OBTENER_MARCAS_MODELO:
			state = action.payload
			return state;
		default:
			return state;
	}
}