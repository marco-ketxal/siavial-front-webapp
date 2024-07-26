import {
  DirectionsRenderer,
  GoogleMap,
  useJsApiLoader,
  Marker,
} from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { 
  Typography,
  Box,
  Grid,
  TextField,
  InputAdornment,
  Avatar,
  Rating
} from "@mui/material";
import AlertDialogSlide from "../../components/AlertDialogSlide";
import ServiceRatingModal from "../../components/ServiceRatingModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import NumbersIcon from '@mui/icons-material/Numbers';
import InfoIcon from '@mui/icons-material/Info';
import PinIcon from '@mui/icons-material/Pin';
import MapIcon from '@mui/icons-material/Map';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import Lottie from "react-lottie";
import animationData from "../../assets/animations/map_loading.json";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ContactDialog from "../../components/ContactDialog";
import "./Tracking.scss"
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import { id } from "date-fns/locale";


let USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
};

const customPolylineOptions = {
  strokeColor: '#cb5301', 
  strokeOpacity: 0.6,
  strokeWeight: 8,
};

const mapStyles = [
  {
    featureType: "poi",// road
    elementType: "labels",
    stylers: [
      {
        visibility: "off", // Oculta las etiquetas de los POI

      }
    ],
  },

   // Estilo para los elementos del paisaje
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [
      {
        color: "#eaeaea", // Color gris claro para el paisaje
      },
    ],
  },

  // Estilo para los nombres de las calles
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#666666", // Color gris oscuro para los nombres de las calles
      },
    ],
  },
  
];


export default function Tracking() {
  const [ directions, setDirections] = useState(null);
  const [ distance , setDistance ]= useState(null);
  const [ distanceValue , setDistanceValue ]= useState(null);
  const [ duration , setDuration ]= useState(null);
  const [ userLocation, setUserLocation] = useState(null);
  const [ zone, setZone] = useState(null);
  const [ amount, setAmount] = useState(null);
  const [ taargetDate , setTargetDate ]=useState(null);
  const [ timeLeft, setTimeLeft] = useState(null);
  const [ showDialog, setShowDialog] = useState(null);
  const [ showContactDialog, setShowContactDialog] = useState(null);
  const [ startService , setStartService] = useState(false);
  const [ stepIndex, setStepIndex] = useState(-1);
  const [ endService, setEndService] = useState(false);
  const [ showNotifyClose , setShowNotifyClose ]= useState(true);
  const [ showInfo , setShowInfo ] = useState(false);
  const [ userAdress , setUserAddress ] = useState('');
  const [isShowLocation, setIsShowLocation] = useState(true);
  const notifyInfo = (message) => toast.info(message, {
    icon:'',
    className: 'custom-toast',
  });
  const durationCounterMinutes = 1;
  const minRoute = 100;
  const maxRoute = 580;
  const history = useNavigate();
  const solicitud = useSelector(state => state.Solicitud)

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_CUSTOM_VARIABLE,
  });

//Iniciar ubicación del cliente 
useEffect(() => {
  //console.log(' solicitud = ', solicitud)
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsShowLocation(false)
        const { latitude, longitude } = position.coords;
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
            if (status === 'OK') {
              setUserAddress(results[0].formatted_address);
            }
          });
        setUserLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error('Error al obtener la geolocalización:', error);
        alert(`Error al obtener la geolocalización `+ error?.message)
      }
    );
  } else {
    console.error('La geolocalización no es compatible en este navegador.');
    alert('La geolocalización no es compatible en este navegador.')
  }
},[])

useEffect(()=>{
  if(userLocation){
    calculateRoute();
  }
},[userLocation])

// Inciar el tiempo de cancelación
useEffect(() => {
  if(startService){
    const contadorInterval = setInterval(() => {
      const now = new Date().getTime();
      const tiempoRestante = taargetDate - now;
      setTimeLeft(tiempoRestante);
      if (tiempoRestante <= 0) {
        clearInterval(contadorInterval);
      }
    }, 1000);
    return () => {
      clearInterval(contadorInterval);
    };
  }
}, [taargetDate, startService]);

// Avanzar a las direcciones
useEffect(() => {
  if(startService){
    if(!directions) return ;
    setStepIndex(0);
    const interval = setInterval(() => {
      setStepIndex(1);
    }, 1000);
    return () => clearInterval(interval);
  }
}, [directions, startService]);

// Evento para avanzar en steps
useEffect(() => {
    if(!directions) return ;
    updateSteps(stepIndex)
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [stepIndex]);

useEffect(() => {
  if(!directions) return ;
  if(distanceValue <= 100 && showNotifyClose) {
    notifyInfo("Tu servicio esta muy cerca. "); 
    setShowNotifyClose(false)
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [directions, duration]);

const updateSteps=async(stepIndex)=>{
  if(stepIndex >= directions.routes[0].overview_path.length){
    setEndService(true)
  }else{
    await updateRoute(stepIndex) 
  }
}

const getFormattedTime = () => {
  const minutes = Math.floor(timeLeft / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  return ` ${minutes}:${seconds}`;
};

async function calculateRoute() {
    // eslint-disable-next-line no-undef
    const directionService = new google.maps.DirectionsService();
    const res = Math.floor(Math.random() * (maxRoute - minRoute) + minRoute)/35000;
    const sign = Math.random() >= 0.5 ? 1 : 0;
    const destination = `${userLocation.lat} , ${userLocation.lng}`;
    let origin;
    if(sign){
      origin = `${userLocation.lat+res} , ${userLocation.lng+res}`
    }else{
      origin = `${userLocation.lat-res} , ${userLocation.lng-res}`
    }

    const results = await directionService.route({
      origin,
      destination,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });

    setDirections(results);
    setDistance(results.routes[0]?.legs[0]?.distance?.text)
    setDistanceValue(results.routes[0]?.legs[0]?.distance?.value)
    setDuration(results.routes[0]?.legs[0]?.duration?.text)
    let distance = results.routes[0]?.legs[0]?.distance?.value;
    setZone(calculateZone(distance/1000));
    // Calcular el tiempo de cancelacion 
    let date = new Date().getTime() + durationCounterMinutes * 60 * 1000;
    setTargetDate(date)
    setTimeLeft(date - new Date().getTime());
    setShowInfo(true)
}

async function updateRoute(stepIndex) {
  // eslint-disable-next-line no-undef
  const directionService = new google.maps.DirectionsService();
  const current = directions.routes[0].overview_path[stepIndex];
  const origin = {lat: current.lat(), lng: current.lng()}
  const destination = {lat: userLocation.lat, lng: userLocation.lng}

  const results = await directionService.route({
    origin,
    destination,
    // eslint-disable-next-line no-undef
    travelMode: google.maps.TravelMode.DRIVING,
  });
  setDirections(results);
  setDistance(results.routes[0]?.legs[0]?.distance?.text)
  setDistanceValue(results.routes[0]?.legs[0]?.distance?.value)
  setDuration(results.routes[0]?.legs[0]?.duration?.text)
}

function cancelService(){
  setDirections(null)
  //window.location.reload();
  setStartService(false);
  setShowNotifyClose(true);
  setTimeLeft(null)
  history('/home', { replace: true });
}

function calculateZone(kms){
  if(kms<=15){
    setAmount(1180.66)
    return 'A'
  }else if(kms>15 && kms<=20){
    setAmount(1180.66)
    return 'B'
  }else if(kms >20 && kms<=30){
    setAmount(1180.66)
    return 'C'
  }else{
    setAmount(5599.35)
    return 'FORANEO'
  }

}

const handleMarkerDragEnd = (e) => {
  setUserLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  const geocoder = new window.google.maps.Geocoder();
  geocoder.geocode({ location: { lat: e.latLng.lat(), lng: e.latLng.lng() } }, (results, status) => {
    if (status === 'OK') {
      setUserAddress(results[0].formatted_address);
    }
  });
};

const onClickMarket = (e) => {
  if(!directions){
    setUserLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() })
  }
};

const clickStartService=()=>{
  setStartService(true);
  setShowInfo(true)
  notifyInfo("Servicio en camino... ");
}

const renderButtons =()=>{
  if (directions){
    if(startService ){
      if(endService){
        return null;
      }else{
        return <button
            className="button-5"
            onClick={()=>{setShowDialog(true)}}
            disabled ={ timeLeft >0 ? false: true}
            >
            Cancelar servicio { timeLeft >0 ? getFormattedTime():null}
        </button>
        }
    } else{
      return <button
              className="button-5"
              onClick={clickStartService}
              >
              Iniciar Servicio
          </button>
    }
  }else{
    return <button
        className="button-5"
        onClick={calculateRoute}
        >
        Compartir ubicación
    </button>
  }
}

const onClickUIfooter =()=>{
  setShowInfo(!showInfo)
}

const renderUIFooter =()=>{
  if(endService) return null;
      return (
        <Box className="ui-info" onClick={onClickUIfooter}
        sx={{  
          bottom:  showInfo ? '0px':'-150px' ,
        }}>
              <Accordion defaultExpanded className="accordion" onClick={onClickUIfooter}>
                      <AccordionSummary
                      expandIcon={<ExpandLessRoundedIcon fontSize="large" color="primary"/>}
                      aria-controls="panel1-content"
                      id="panel1-footer"
                    >
                    </AccordionSummary>
                    <AccordionDetails>
            {showInfo && (
              <Grid container spacing={1} >
              <Grid item xs={3}>
                <Grid container >
                  <Grid item xs={12}> <HomeRepairServiceIcon fontSize="large" color="primary"/></Grid>
                  <Grid item xs={12}><Typography variant="caption">Servicio</Typography></Grid>
                  <Grid item xs={12}><Typography><b>{solicitud.tipoSolicitud}</b></Typography></Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <Grid container >
                  <Grid item xs={12}> <NumbersIcon fontSize="large" color="primary"/></Grid>
                  <Grid item xs={12}><Typography variant="caption">No. Servicio</Typography></Grid>
                  <Grid item xs={12}><Typography><b>{solicitud.folio}</b></Typography></Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <Grid container >
                  <Grid item xs={12}> <MapIcon fontSize="large" color="primary"/></Grid>
                  <Grid item xs={12}><Typography variant="caption">Distancia</Typography></Grid>
                  <Grid item xs={12}><Typography><b>{distance}</b></Typography></Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <Grid container >
                  <Grid item xs={12}> <AccessTimeFilledIcon fontSize="large" color="primary"/></Grid>
                  <Grid item xs={12}><Typography variant="caption">Tiempo </Typography></Grid>
                  <Grid item xs={12}><Typography><b>{duration}</b></Typography></Grid>
                </Grid>
              </Grid>
              </Grid>
            ) 
          }
          </AccordionDetails>
          </Accordion>
        </Box>
      )
}

const onClickCallOperator =()=>{
  setShowContactDialog(!showContactDialog)
}

const renderUIHeader =()=>{
  if(endService) return null;
      return (
        <Box className="ui-info-header" >
          {
              startService ? (
              <Grid >
                <Typography variant="subtitle2" align="center">Información del operador</Typography>
                <Grid container spacing={2}  >
                  <Grid item xs={2}>
                        <Avatar alt="Avatar" 
                            src={solicitud.fotoProveedor} 
                            className="ui-avatar-provider"
                        />
                  </Grid>
                  <Grid item xs={8} >
                    <Grid container > 
                      <Grid item xs={12}><Typography variant="label"><b>{solicitud.nombreProveedor} </b></Typography></Grid>
                      <Grid item xs={12}><Typography  variant="caption">Nombre del Operador: </Typography></Grid>
                      <Grid item xs={12}> <Rating
                        size="small"
                        value={4} readOnly
                      /></Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={2}  >
                    <Grid container style={{marginLeft: '-10px'}}> 
                      <Grid item xs={12}> <WhatsAppIcon 
                                onClick={onClickCallOperator}
                                fontSize="large" 
                                color="primary"
                                />
                      </Grid>
                      <Grid item xs={12}><Typography style={{fontSize:'10px'}}>Contactar</Typography></Grid>
                    </Grid>
                    </Grid>
              </Grid>

              </Grid>
              ):(
                <Grid>
                  <Typography variant="body">¿En dónde se encuentra tu <b>auto</b>?</Typography>
                  <TextField 
                    className="ui-address-user"
                    id="outlined-basic" 
                    variant="outlined"  
                    value={userAdress}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <TimeToLeaveIcon  fontSize="large" color="primary"/>
                        </InputAdornment>
                      ),
                    }}
                    size="small"
                    margin="normal"
                  />

              </Grid>
              )
          }
            
        </Box>)
}


const renderMarkers = () => {
  if (!directions) return null;
  return [
    <Marker
      key="origin"
      position={directions.routes[0].legs[0].start_location}
      icon={{
        url:solicitud.iconoServicio,
        scaledSize: new window.google.maps.Size(50, 50),
      }}
    />,
    <Marker
      key="destination"
      position={directions.routes[0].legs[0].end_location}
      icon={{
        url: 'https://icons.iconarchive.com/icons/elegantthemes/beautiful-flat/256/Car-icon.png',
        scaledSize: new window.google.maps.Size(50, 50),
      }}
    />,
  ];
};

  return (
    <Grid style={{ width: "100%", height: "100%" }}>
      {renderUIHeader()}
      { isLoaded ? (
        <>  
        {
          isShowLocation &&
            <Lottie
            options={defaultOptions}
            height={400}
            width={400}
            style={{zIndex:2, position: 'fixed'}}
          /> 
        }
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: showInfo ? "70%":"82%"}}
            center={userLocation}
            zoom={19}
            onClick={onClickMarket }
            options={{
              disableDefaultUI: true,
              styles: mapStyles,
            }}
            /*  options={{
              disableDefaultUI: true,
            }} */

          >
            {
              directions &&   
              ( <DirectionsRenderer 
                directions={directions} 
                options={{
                  polylineOptions: customPolylineOptions,
                  suppressMarkers: true
                }}
                />
              )
            } 

            { userLocation  && 
                  (   <Marker 
                    position={userLocation} 
                    /*  icon={{
                      url: 'https://icons.iconarchive.com/icons/graphicloads/colorful-long-shadow/256/Basket-icon.png',
                      scaledSize: new window.google.maps.Size(50, 50),
                    }} */
                    draggable={directions ? false:true}
                    onDragEnd={handleMarkerDragEnd}
                  />
                  )
            }
            {renderMarkers()}
            {renderButtons()}
            {renderUIFooter()}
            {
              showDialog &&
              <AlertDialogSlide 
                show ={showDialog}
                handle = {setShowDialog}
                callback={cancelService}
              />
            }
            {
              showContactDialog &&
              <ContactDialog 
                show ={showContactDialog}
                handle = {setShowContactDialog}
              />
            }

            {
              endService &&
              <ServiceRatingModal 
                open ={endService}
                onClose = {setEndService}
                onSubmit={cancelService}
              />
            }
          </GoogleMap>
        </>
      ) : (<div><span> {isLoaded} Cargando..</span></div>)}

        <ToastContainer
            position="top-right"
            autoClose={1500}
            hideProgressBar
        />
    </Grid>
  );
}
