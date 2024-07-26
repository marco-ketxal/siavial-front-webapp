import { Fragment, useState } from "react";
import "./Navbar.scss";
import {
    AppBar,
    Toolbar,
    Icon,
    IconButton,
    useMediaQuery,
    Grid,
    Typography,
    Card,
} from "@mui/material";
import Sidebar from '../Sidebar/Sidebar';
import {  useSelector} from 'react-redux';

const Navbar = () => {

    const matches = useMediaQuery("(max-width:768px)");
    const [drawer, setDrawer] = useState(false);
    const cliente = useSelector(state => state.Cliente)

    const toggleDrawer = () => {
        setDrawer(!drawer);
    }

    return (
        <Fragment>

            <Sidebar open={drawer} toggleDrawer={() => toggleDrawer()} />

            <AppBar position="static" className="nav-bar" elevation={0}>
                <Toolbar className="toolbar">
                    <a href="/home">
                    <img
                        src="https://assets-siavial.s3.amazonaws.com/general/logo.png"
                        alt=""
                        className="logo"
                    />
                    </a>
                    SIAVIAL
                    <div className="actions-container">
                        {!matches ? (
                            <Grid container direction="column" justify="center">
                                <Grid item>
                                    <Typography className="text-greet">
                                        Bienvenido
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography className="text-username">
                                        { 
                                            cliente.datosPersonales?.nombre !== '' ? cliente.datosPersonales?.nombre:cliente.email
                                        }
                                    </Typography>
                                </Grid>
                            </Grid>
                        ) : null}
                        <IconButton  className="btn-menu" onClick={() => toggleDrawer()}>
                            <Icon className="fas fa-bars icon-menu" />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>

        </Fragment>
    );
};

export default Navbar;
