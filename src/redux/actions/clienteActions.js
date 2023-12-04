import axios  from 'axios'
import config from "react-global-configuration";
import { CLIENTE_LOGIN,
        CLIENTE_REGISTRO,
        CLIENTE_ACTUALIZAR_DATOS_PERSONALES,
        CLIENTE_ACTUALIZAR_VEHICULOS,
        CLIENTE_ACTUALIZAR_PAGOS,
        CLIENTE_ACTUALIZAR,
        CLIENTE_GUARDAR_FOTO_PERFIL,
        CLIENTE_GUARDAR_FOTO_VEHICULO,
        RESTABLECER_CONTRASENA,
        OBTENER_HISTORIAL_SERVICIOS,
        CLIENTE_OBTENER_POR_ID_FIREBASE,
        LOG_OUT,
        CLIENTE_CONEKTA_CREAR,
        CLIENTE_CONEKTA_ELIMINAR_FORMA_PAGO,
        CLIENTE_CONEKTA_AGREGAR_FORMA_PAGO,
    } from "../types"
    import { logOut } from "../../services/firebase/auth";

  // Accions
	export function clienteLogin(email, password ) {
        console.log('HOLAAA')
        console.log('URL = ', config.get("urlAPI"))
    return async (dispatch) => {
        console.log('URL = ', config.get("urlAPI"))
        let res = await axios.post(`${config.get("urlAPI")}/customer/login`, {email,password})
            .then((response) => {
                dispatch({ type: CLIENTE_LOGIN, payload: response.data })
                return response;
            })
            .catch((error) => {
                console.log(error);
                return error.response;
            })
        return res;
		}
	}

	export function clienteRegistro(email, password ) {
    return async (dispatch) => {
        let res = await axios.post(`${config.get("urlAPI")}/customer/singIn`, {email,password})
            .then((response) => {
                dispatch({ type: CLIENTE_REGISTRO, payload: response.data })
                return response;
            })
            .catch((error) => {
                console.log(error);
                return error.response;
            })
        return res;
				}
	}

	export function actualizarClienteDatosPersonales(datosPersonales) {
        return {
            type: CLIENTE_ACTUALIZAR_DATOS_PERSONALES,
            payload: datosPersonales
        }
    }

    export function actualizarVehiculos(vehiculos) {
        return {
            type: CLIENTE_ACTUALIZAR_VEHICULOS,
            payload: vehiculos
        }
    }

    export function actualizarPagos(pagos) {
        return {
            type: CLIENTE_ACTUALIZAR_PAGOS,
            payload: pagos
        }
    }

    export function actualizarCliente(cliente) {
        return async (dispatch) => {
            let res = await axios.put(`${config.get("urlAPI")}/customer/update/${cliente.id}`, cliente)
            .then((response)=>{
                dispatch({ type: CLIENTE_ACTUALIZAR, payload: response.data });
                return response;
            })
            .catch((error) => {
                console.log(error);
                return error.response;
            })
            return res;
        }
    }


    export function guardarFotoPerfil(data) {
        return async (dispatch) => {
            let  res = await axios.post(`${config.get("urlAPI")}/customer/save/fileS3`,data)
            .then((response) =>{
                dispatch({ type: CLIENTE_GUARDAR_FOTO_PERFIL, payload: response.data });
                return response;
            })
            .catch((error) => {
                console.log(error);
                return error.response;
            })
            return res;
        };
    }

    export function guardarFotoVehiculo(data) {
        return async (dispatch) => {
            let  res = await axios.post(`${config.get("urlAPI")}/customer/save/fileS3`,data)
            .then((response) =>{
                dispatch({ type: CLIENTE_GUARDAR_FOTO_VEHICULO, payload: response.data });
                return response;
            })
            .catch((error) => {
                console.log(error);
                return error.response;
            })
            return res;
        };
    }

    export function reestablecerContrasenaEmail(email) {
        return async (dispatch) => {
            let res = await axios.post(`${config.get("urlAPI")}/customer/email/recover-password/${email}`, { email })
            .then((response) =>{
                dispatch({ type: RESTABLECER_CONTRASENA, payload: response.data });
                return response;
            })
            .catch((error) => {
                console.log(error);
                return error.response;
            })
            return res;
        };
    }

    export function obtenerHistotialServicios(idCliente) {
        return async (dispatch) => {
            let res = await axios.get(`${config.get("urlAPI")}/solicitud/obtener/cliente/${idCliente}`)
            .then((response) =>{
                dispatch({ type: OBTENER_HISTORIAL_SERVICIOS, payload: response.data });
                return response;
            })
            .catch((error) => {
                console.log(error);
                return error.response;
            })
            return res;
        };
    }

    export function obtenerClienteIdFirebase(id) {
        return async (dispatch) => {
            let res = await axios.get(`${config.get("urlAPI")}/customer/get/firebase/${id}`)
                .then((response) => {
                    dispatch({ type: CLIENTE_OBTENER_POR_ID_FIREBASE, payload: response.data })
                    return response;
                })
                .catch((error) => {
                    console.log(error);
                    return error.response;
                })
            return res;
        }
    }

    export function cerrarSesion() {
        let isCorrect = false;
        return async (dispatch) => {
            const response = await logOut();
            if (response === true) {
                isCorrect = true;
                dispatch({ type: LOG_OUT });
            }
            return isCorrect;
        };
    }

    export function crearClienteConekta(clienteConekta) {
        return async (dispatch) => {
            let res = await axios.post(`${config.get("urlAPI")}/conekta/customer/create`,clienteConekta)
                .then((response) => {
                    dispatch({ type: CLIENTE_CONEKTA_CREAR, payload: response.data })
                    return response;
                })
                .catch((error) => {
                    console.log(error);
                    return error.response;
                })
            return res;
        }
    }

    export function eliminarFormaPagoConekta(data) {
        return async (dispatch) => {
            let res = await axios.post(`${config.get("urlAPI")}/conekta/payment/delete`,data)
                .then((response) => {
                    dispatch({ type: CLIENTE_CONEKTA_ELIMINAR_FORMA_PAGO, payload: response.data })
                    return response;
                })
                .catch((error) => {
                    console.log(error);
                    return error.response;
                })
            return res;
        }
    }

    export function agregarFormaPagoConekta(data) {
        return async (dispatch) => {
            let res = await axios.post(`${config.get("urlAPI")}/conekta/payment/add`,data)
                .then((response) => {
                    dispatch({ type: CLIENTE_CONEKTA_AGREGAR_FORMA_PAGO, payload: response.data })
                    return response;
                })
                .catch((error) => {
                    console.log(error);
                    return error.response;
                })
            return res;
        }
    }

    
