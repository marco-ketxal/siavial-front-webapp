import { combineReducers } from "redux";
import dataCliente from "./clienteReducer";
import datosSolicitud from "./solicitudReducer";
import datosProveedor from './proveedorReducer';
import datosCatalogo from "./catalogoReducer";

export default combineReducers({
    Cliente: dataCliente,
    Solicitud: datosSolicitud,
    Proveedor: datosProveedor,
    CatalogoAuto: datosCatalogo
});
