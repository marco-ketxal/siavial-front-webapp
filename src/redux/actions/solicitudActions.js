import axios  from 'axios'
import config from "react-global-configuration";

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

  // Accions
    export function actualizarIdCliente(idCliente) {
        return {
            type: SOLICITUD_ACTUALIZAR_ID_CLIENTE,
            payload: idCliente
        }
    }
	export function actualizarTipoServicio(tipoServicio , claveSolicitud) {
        return {
            type: SOLICITUD_ACTUALIZAR_TIPOSERVICIO,
            payload: {tipoServicio, claveSolicitud}
        }
    }

    export function actualizarIdVehiculo(idVehiculo) {
        return {
            type: SOLICITUD_ACTUALIZAR_ID_VEHICULO,
            payload: idVehiculo
        }
    }

    export function actualizarProveedorSeleccionado(proveedor) {
        return {
            type: SOLICITUD_PROVEEDOR_SELECCIONADO,
            payload: proveedor
        }
    }

    export function actualizarIdMetodoPago(idMetodoPago) {
        return {
            type: SOLICITUD_ACTUALIZAR_ID_METODOPAGO,
            payload: idMetodoPago
        }
    }

    export function actualizarEstatus(estatus) {
        return {
            type: SOLICITUD_ACTUALIZAR_STATUS,
            payload: estatus
        }
    }

     // Accions
	export  function solicitudCrearBD(solicitud ) {
        return async (dispatch) => {
            let res = await axios.post(`${config.get("urlAPI")}/solicitud/crear`, {solicitud})
                .then((response) => {
                    dispatch({ type: SOLICITUD_CREAR_DB, payload: response.data })
                    return response;
                })
                .catch((error) => {
                    console.log(error);
                    return error.response;
                })
            return res;
            }
    }

    export function solicitudActulizarDB(solicitud ) {
        return async (dispatch) => {
            let res = await axios.put(`${config.get("urlAPI")}/solicitud/actualizar/${solicitud.id}`, {solicitud})
                .then((response) => {
                    dispatch({ type: SOLICITUD_ACTUALIZAR_DB, payload: response.data })
                    return response;
                })
                .catch((error) => {
                    console.log(error);
                    return error.response;
                })
            return res;
            }
    }


    export function enviarSolicitud(solicitud ) {
        return  async (dispatch) => {
            let res =  await axios.get(`${config.get("urlBackend")}/solicitud/test`)
                .then((response) => {
                    dispatch({ type: SOLICITUD_ENVIAR, payload: response.data })
                    return response;
                })
                .catch((error) => {
                    console.log(error);
                    return error.response;
                })
            return res;
            }
    }

    export function crearOrdenConekta(data) {
        return async (dispatch) => {
            let res = await axios.post(`${config.get("urlAPI")}/conekta/order/create`,data)
                .then((response) => {
                    dispatch({ type: SOLICITUD_CONEKTA_CREAR_ORDEN, payload: response.data })
                    return response;
                })
                .catch((error) => {
                    console.log(error);
                    return error.response;
                })
            return res;
        }
    }


    export function emailEnviarPago(data) {
        return async (dispatch) => {
            let res = await axios.post(`${config.get("urlAPI")}/conekta/payment/sendEmail`,data)
                .then((response) => {
                    dispatch({ type: SOLICITUD_ENVIAR_EMAIL_PAGO, payload: response.data })
                    return response;
                })
                .catch((error) => {
                    console.log(error);
                    return error.response;
                })
            return res;
        }
    }

