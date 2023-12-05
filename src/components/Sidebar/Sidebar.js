import { Fragment } from "react";
import "./Sidebar.scss";
import {
    SwipeableDrawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Icon,
    IconButton,
} from "@mui/material";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { cerrarSesion } from "../../redux/actions/clienteActions"
import { useDispatch , useSelector} from 'react-redux';

const Sidebar = ({ open, toggleDrawer }) => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const cerrarSesionCliente = () => dispatch(cerrarSesion())
    const cliente = useSelector(state => state.Cliente)

    const menuOptions = [
        {
            title: "Home",
            icon: "fas fa-home",
            iconColor: "primary",
            onClick: () => history("/home"),
        },
        {
            title: "Mi cuenta",
            icon: "fas fa-user",
            iconColor: "primary",
            onClick: () => history("/micuenta"),
        },
        {
            title: "Mis vehículos",
            icon: "fas fa-car",
            iconColor: "primary",
            onClick: () => history("/vehiculos",undefined),
        },
        {
            title: "Formas de pago",
            icon: "fas fa-credit-card",
            iconColor: "primary",
            onClick: () => history("/pagos",undefined),
        },
        {
            title: "Historial de servicios",
            icon: "fas fa-car-battery",
            iconColor: "primary",
            onClick: () => history("/historial"),
        },
        /* {
            title: "Ayuda",
            icon: "far fa-question-circle",
            iconColor: "primary",
            onClick: () => history("/ayuda"),
        },
        {
            title: "Legal",
            icon: "fas fa-file-contract",
            iconColor: "disabled",
            onClick: () => history("/legal"),
        }, */
        {
            title: "Cerrar sesión",
            icon: "fas fa-sign-out-alt",
            iconColor: "disabled",
            onClick: () => logOut(),
        },
    ];

    const logOut = async () => {
        let res = await cerrarSesionCliente()
        if (res) {
            history.push("/login");
        }
    }


    return (
        <Fragment>
            <SwipeableDrawer
                anchor="right"
                open={open}
                onClose={toggleDrawer}
                onOpen={toggleDrawer}
                className="sidebar-container"
            >
                <div className="sidebar-header">
                    <div className="user-container">
                        <Typography className="text-greet">
                            Bienvenido
                        </Typography>
                        <Typography className="text-username">
                            { 
                                cliente.datosPersonales?.nombre !== '' ? cliente.datosPersonales?.nombre:cliente.email
                            }
                        </Typography>
                    </div>
                    <IconButton onClick={toggleDrawer}>
                        <Icon color="primary" className="fas fa-times" />
                    </IconButton>
                </div>

                <div style={{ width: 250 }}>
                    <List className="list-container">
                        {menuOptions.map((option, i) => (
                            <ListItem button onClick={option.onClick} key={i}>
                                <ListItemIcon>
                                    <Icon
                                        color={option.iconColor}
                                        className={clsx(option.icon, "icon")}
                                    />
                                </ListItemIcon>
                                <ListItemText primary={option.title} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </SwipeableDrawer>
        </Fragment>
    );
};


export default Sidebar;
