import React from 'react';
import { useEffect, useState } from "react";
import { Route, useNavigate   } from "react-router-dom";
import PropTypes from "prop-types";
import { firebaseApp } from "../services/firebase";
import { useDispatch } from 'react-redux';
import { obtenerClienteIdFirebase } from "../redux/actions/clienteActions";  

const firebaseAuth = firebaseApp.auth();

const GuardRoute = ({ type, ...options }) => {

    const [currentUser, setCurrentUser] = useState(null);
    const dispatch = useDispatch()
    const history = useNavigate();
    
    useEffect(() => {
        firebaseAuth.onAuthStateChanged(userFire => {
            if (userFire) {
                setCurrentUser(userFire);
                obtenerClienteXIdFirebase(userFire.uid);
            } else {
                setCurrentUser(false);
            }
        });
    }, []);

    const obtenerClienteXIdFirebase = (id) => dispatch(obtenerClienteIdFirebase(id));
    
    if (type === "private" && currentUser === false) {
        history("/")
    } else if (type === "public" && currentUser) {
        history("/")
    }
    
    return <Route {...options}/>
};

GuardRoute.propTypes = {
    type: PropTypes.oneOf(["public", "private"]),
};

GuardRoute.defaultProps = {
    type: "private",
};

export default GuardRoute;
