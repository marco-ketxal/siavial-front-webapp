import './style/style.scss';
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route , Navigate} from "react-router-dom";
import  GuardRoute  from './components/GuardRoute';
import Tracking from './pages/Tracking/Tracking';
import Home  from './pages/Home/Home';
import Login from './pages/Login/Login'
import MiCuenta from './pages/MiCuenta/MiCuenta';
import VehiculoSeleccionar from './pages/Vehiculo/VehiculoSeleccionar';
import Vehiculos from './pages/Vehiculo/Vehiculos';
import VehiculosDetalle from './pages/Vehiculo/VehiculosDetalle';
import VehiculoRegistrar from './pages/Vehiculo/VehiculoRegistrar';
import Pagos from './pages/Pago/Pagos';
import PagoRegistrar from './pages/Pago/PagoRegistrar';
import PagoDetalle from './pages/Pago/PagoDetalle';
import PagoSeleccionar from './pages/Pago/PagoSeleccionar';
import Location from './pages/Tracking/Location';
import Sorteo from './pages/Sorteo/Sorteo';
import Registro from './pages/Login/Registro';
import { Provider } from "react-redux";
import store from "../src/redux/store";
import RecoverPassword from './pages/Login/RecoverPassword';



const theme = createTheme({
  palette: {
      type: 'light',
      primary: {
          main: '#D32E2B' //Rojo
      },
      secondary: {
          main: '#D78B24'  //naranja
      }
      },
      typography: {
          fontFamily: "Quicksand"
      }
});

//Mandate al home si da refresh
if (window.performance) {
  if (performance.navigation.type === 1) {
      window.location.href = "/home"
  } 
}

function App() {
  return (
    <div className="App">
        <Provider store={store}>
          <ThemeProvider theme={theme}>
          <BrowserRouter>
          <GuardRoute>
              <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/tracking" element={<Tracking />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/recoverpassword" element={<RecoverPassword/>} />
                  <Route path="/micuenta" element={<MiCuenta />} />
                  <Route path="/vehiculoseleccionar" element={<VehiculoSeleccionar />} />
                  <Route path="/vehiculos" element={<Vehiculos />} />
                  <Route path="/vehiculodetalle" element={<VehiculosDetalle />} />
                  <Route path="/vehiculoregistrar" element={<VehiculoRegistrar />} />
                  <Route path="/pagos" element={<Pagos />} />
                  <Route path="/pagoregistrar" element={<PagoRegistrar />} />
                  <Route path="/pagodetalle" element={<PagoDetalle />} />
                  <Route path="/pagoseleccionar" element={<PagoSeleccionar />} />
                  <Route path="/location" element={<Location />} />
                  <Route path="/sorteo" element={<Sorteo />} />
                  <Route path="/registro" element={<Registro />} />
                  <Route
                    path="/"
                    element={<Navigate to="/login" />}
                  />
              </Routes>
            </GuardRoute>
          </BrowserRouter>
          </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
