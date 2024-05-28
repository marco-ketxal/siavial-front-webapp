import axios from "axios";
import config from "react-global-configuration";
import { CATALOGO_OBTENER_MARCAS_MODELO } from "../types";


export function catalogoMarcaModelo(){
	return async (dispatch)=>{
		let res = await axios.get(`${config.get("urlAPI")}/catalog/car/brands`)
			.then((response)=>{
				dispatch({
					type: CATALOGO_OBTENER_MARCAS_MODELO, 
					payload: response.data
				})
				return response;
			})
			.catch((error)=>{
				console.log(error);
				return error.response;
			})
			return res;
	}
}