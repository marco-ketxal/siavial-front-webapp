import './style/style.scss';
import  Tracking  from './pages/Tracking/Tracking';
import  Login  from './pages/Login/Login';
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  GuardRoute  from './components/GuardRoute';
import { Provider } from "react-redux";
import store from "../src/redux/store";



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

function App() {
  return (
    <div className="App">
        <Provider store={store}>
          <ThemeProvider theme={theme}>
          <BrowserRouter>
              <Routes>
                  <Route path="/tracking" element={<Tracking />} />
                  <Route path="/" element={<Login />} />
              </Routes>
          </BrowserRouter>
          </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
