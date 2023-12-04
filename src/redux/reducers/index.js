import { combineReducers } from "redux";
import dataCliente from "./clienteReducer";
import datosSolicitud from "./solicitudReducer";
import datosProveedor from './proveedorReducer';

export default combineReducers({
    Cliente: dataCliente,
    Solicitud: datosSolicitud,
    Proveedor: datosProveedor,
});
