import React from 'react';
import { useEffect, useState } from "react";
import { Route, useNavigate   } from "react-router-dom";
import PropTypes from "prop-types";
import { firebaseApp } from "../services/firebase";
import { useDispatch } from 'react-redux';
import { obtenerClienteIdFirebase } from "../redux/actions/clienteActions";  

const firebaseAuth = firebaseApp.auth();

const GuardRoute = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);
    const dispatch = useDispatch()
    const history = useNavigate();
    const obtenerClienteXIdFirebase = (id) => dispatch(obtenerClienteIdFirebase(id));

    useEffect(() => {
        firebaseAuth.onAuthStateChanged(userFire => {
            console.log('userFire =' , userFire);
            if (userFire) {
                console.log(userFire);
                setCurrentUser(userFire);
                obtenerClienteXIdFirebase(userFire.uid);
            } else {
                setCurrentUser(false);
            }
        });
    }, []);
    /*
    useEffect(() => {
        firebaseAuth.onAuthStateChanged(userFire => {
            if (userFire) {
                setCurrentUser(userFire);
                obtenerClienteXIdFirebase(userFire.uid);
            } else {
                setCurrentUser(false);
            }
        });
    }, []);*/

    if (currentUser === false) {
        console.log(' currentUser = ', currentUser)
    }  
    
    return children
};


export default GuardRoute;
