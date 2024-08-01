import { React, Fragment, useState } from 'react';
import { Grid, Typography, Container, Button, Icon, useMediaQuery, Dialog, Card, CardContent } from '@mui/material';
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Loading from "../../components/Loading/Loading";
import ModalDecision from '../../components/Modal/ModalDecision'
import ModalError from '../../components/Modal/ModalError'
import { actualizarIdMetodoPago, actualizarEstatus } from '../../redux/actions/solicitudActions';
import {
    /*     solicitudCrearBD, 
        enviarSolicitud,  */
    crearOrdenConekta,
    emailEnviarPago
} from '../../redux/actions/solicitudActions'

function PagoSeleccionar() {

    let history = useNavigate();
    let location = useLocation();
    const cliente = useSelector(state => state.Cliente)
    const solicitud = useSelector(state => state.Solicitud)
    const matches = useMediaQuery("(max-width:768px)");
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openModalError, setOpenModalError] = useState(false);
    const [indexPaymentSelected, setIndexPaymentSelected] = useState(0);
    const [selectedCard, setSelectedCard] =useState(null); 
    const dispatch = useDispatch();
    const reduxActualizarMetodoPago = (idMetodoPago) => dispatch(actualizarIdMetodoPago(idMetodoPago))
    const reduxActualizarEstatus = (estatus) => dispatch(actualizarEstatus(estatus))
    /* const bdCrearSolicitud = async (solicitud) => dispatch(solicitudCrearBD(solicitud)) */
    const conektaCrearOrden = async (solicitud) => dispatch(crearOrdenConekta(solicitud))
    const sendPaymentEmail = (data) => dispatch(emailEnviarPago(data));
    /* const backEnviarSolicitud = (solicitud) => dispatch(enviarSolicitud(solicitud)) */

    const handleClose = () => {
        setOpen(false);
    }

    const handlePagar = (idMetodoPago) => {
        
        reduxActualizarMetodoPago(idMetodoPago);
        reduxActualizarEstatus('En Proceso');
        setOpenModal(true);
    }


    const clickPagar = async () => {
        setOpen(true);
        setTimeout(async () => {
            setOpen(false);
            conektaEnviarOrden();
            /*  backEnviarSolicitud(solicitud); */
        }, 3000);
    }

    const closeModalError = () => {
        setOpenModalError(true);
    }

    const conektaEnviarOrden = async () => {
        let orden = {
            currency: "MXN",
            customer_info: {
                customer_id: cliente.idConekta,
                antifraud_info: {
                    paid_transactions: 4
                }
            },
            line_items: [{
                name: `Servicio de Paso de ${solicitud.tipoServicio}`,
                unit_price: solicitud.monto,
                quantity: 1,
                antifraud_info: {
                    trip_id: "12345",
                    driver_id: "driv_1231",
                    ticket_class: "economic",
                    pickup_latlon: "23.4323456,-123.1234567",
                    dropoff_latlon: "23.4323456,-123.1234567"
                }
            }],
            charges: [{
                payment_method: {
                    type: "card",
                    token_id: 'tok_test_visa_4242' //cliente.metodosPago[0].token_id
                }
            }]
        }
        let res = await conektaCrearOrden(orden)
        //console.log(' res = ', res);
        /* if(res.data.error){
            setOpenModalError(true);
            await sendEmailPayment("not_paid")
        }else{
           /*  await bdCrearSolicitud( solicitud ).then(response =>{
                    sendEmailPayment("paid" , response.data.folio)
            })
            history('/tracking');
        } */
       //Definir cuando es correcto o
        history('/pagocorrecto');
    }

    const sendEmailPayment = async (paid, folio) => {

        let data = {
            "name": cliente.datosPersonales.nombre,
            "email": cliente.email,
            "service": solicitud.tipoSolicitud,
            folio,
            "date": Date.now(),
            "last4": cliente.metodosPago[indexPaymentSelected].last4,
            "monto": solicitud.monto,
            "paymentStatus": paid
        }
        sendPaymentEmail(data)
    }





    return (
        <Fragment>
            <Navbar />
            <Grid>
                <Container maxWidth="md" style={{ padding: "20px" }}>
                    <Typography className="text-title-page mt-1">
                        Seleccionar tarjeta
                    </Typography>
                    <Grid
                        margin={2}
                        align='center'
                        spacing={{ md: 0.5 }}>
                        {cliente.metodosPago?.map((pago, index) => (
                            <Grid
                                item xs={matches ? 12 : 4}
                                align='center'
                                key={index}
                                className={`card-pago mt-2 mb-2 ${index === indexPaymentSelected ? 'card-pago-selected' : ''}`}
                                onClick={()=>{
                                    setIndexPaymentSelected(index)
                                    setSelectedCard(pago)}}
                                
                            >
                                <Grid container align='center'  >
                                    <Grid item xs={2} >
                                        <Icon className="fa fa-credit-card icon-tarjeta mt-1" />
                                    </Grid>
                                    <Grid item align="left" xs={10}>
                                        <Typography className="mt-1" style={{ fontSize: "14px", color: "white" }}>
                                            Terminación: <b>************{pago.last4}</b>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        ))}

                        <Card sx={{ borderRadius: '20px' }}>
                            <CardContent>
                                <Typography className="text-title-page mt-1" >
                                    Resumen de Servicio
                                </Typography><br />
                                <Typography sx={{ mb: 1.5 }} color="text.secondary" align='center'>
                                    <b> Descripción: {solicitud.tipoSolicitud}</b>
                                </Typography><hr />
                                <Typography sx={{ mb: 1.5 }} color="text.secondary" align='center'>
                                    <b> Proveedor: {solicitud.nombreProveedor}</b>
                                </Typography><hr />
                                <Typography sx={{ mb: 1.5 }} color="text.secondary" align='center'>
                                    <b>Tarifa: ${solicitud.monto} MXN </b><sub>(IVA incluido)</sub>
                                </Typography><hr />
                            </CardContent>
                        </Card><br/>
                    </Grid>
                    <Button 
							variant="contained" 
							color="primary" 
							size="large"  
							type="submit"
							className="btn-rojo"
                            onClick={() => { handlePagar(selectedCard.id) }}
                            //onClick={() => history('/pagocorrecto', { state: location.state })}
                            > 
								Pagar 
					</Button><br/><br/>                    
                    <Button 
							variant="contained" 
							size="large"
                            color="inherit"  
							type="submit"
							className="btn-rojo"     
                            onClick={() => history('/home', { state: location.state })}> 
								Cancelar 
					</Button>

                    {
                        cliente.metodosPago.length === 0 && (
                            <Grid className="mt-3" align='center'>
                                <Button
                                    onClick={() => history('/pagoregistrar', { state: location.state })}
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    className="btn-rojo">
                                    agregar tarjeta
                                </Button>
                            </Grid>
                        )
                    }
                </Container>
            </Grid>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth disableBackdropClick>
                <Loading message="Estamos buscando las mejores opciones para ti...." />
            </Dialog>

            {
                openModal && (
                    <ModalDecision
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        funcionDecision={clickPagar}
                        title={"Confirmación de pago"}
                        message={"Confirmar el pago de mi servicio ?"}
                    />
                )
            }

            {
                openModalError && (
                    <ModalError
                        openModal={openModalError}
                        setOpenModal={setOpenModalError}
                        funcionDecision={closeModalError}
                        mensaje={"No hemos podido realizar el pago , favor de validar tú información"}
                    />
                )
            }
        </Fragment>
    )
}


export default PagoSeleccionar;