import {
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
} from "@mui/material";
import 'react-toastify/dist/ReactToastify.css';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import Lottie from "react-lottie";
import animationData from "../../assets/animations/map_loading.json";
import "./Tracking.scss"
import { useNavigate  } from "react-router-dom";
import { buscarProveedoresDisponibles } from '../../redux/actions/proveedorActions';
import {  useDispatch , useSelector } from 'react-redux';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
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


export default function Location() {
	const dispatch = useDispatch();
  const [ userLocation, setUserLocation] = useState(null);
  const [ userAdress , setUserAddress ] = useState('');
  const [isShowLocation, setIsShowLocation] = useState(true);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_CUSTOM_VARIABLE,
  });
	const history = useNavigate();
	const solicitud = useSelector(state => state.Solicitud)
	const buscarProveedores = async (estado , servicio) => dispatch(buscarProveedoresDisponibles(estado, servicio))

//Iniciar ubicación del cliente 
useEffect(() => {
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
    setUserLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() })
};


const onClickShareLocation =async()=>{
	//console.log('compartir  ubicación', userLocation);
	await buscarProveedores("Guanajuato", solicitud.tipoSolicitud);
	history('/sorteo')
}

const renderButtons =()=>{
    return(
		<button
        className="button-5"
        onClick={onClickShareLocation}
    >
        Compartir ubicación
    </button>
		)
}

const renderUIHeader =()=>{
      return (
        <Box className="ui-info-header">
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
				</Box>
    )
}

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
            mapContainerStyle={{ width: "100%", height: "82%"}}
            center={userLocation}
            zoom={19}
            onClick={onClickMarket }
            options={{
              disableDefaultUI: true,
              styles: mapStyles,
            }}
          >

            { userLocation  && 
                  (   <Marker 
                    position={userLocation} 
                    draggable={true}
                    onDragEnd={handleMarkerDragEnd}
                  />
                  )
            }
            {renderButtons()}
          </GoogleMap>
        </>
      	) : (<div><span> {isLoaded} Cargando..</span></div>)
			}
    </Grid>
  );
	
}
