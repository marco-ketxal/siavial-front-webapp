
import axios  from 'axios'
import config from "react-global-configuration";
import { 
    PROVEEDOR_OBTENER_POR_ESTADO_SERVICIO,
    } from "../types"

  // Accions
export function buscarProveedoresDisponibles(estado,servicio) {
    const params = {
        estado,
        servicio
    };
    return async (dispatch) => {
        let res = await axios.get(`${config.get("urlAPI")}/proveedor/obtenerPorEstadoServicio/`,{params})
        .then((response) =>{
            dispatch({ type: PROVEEDOR_OBTENER_POR_ESTADO_SERVICIO, payload: response.data });
            return response;
        })
        .catch((error) => {
            console.log(error);
            return error.response;
        })
        return res;
    };
}


