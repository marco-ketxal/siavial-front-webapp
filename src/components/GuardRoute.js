import { useEffect, useState } from "react";
import { firebaseApp } from "../services/firebase";
import { useDispatch } from 'react-redux';
import { obtenerClienteIdFirebase } from "../redux/actions/clienteActions";  
import { useNavigate } from "react-router-dom";


const firebaseAuth = firebaseApp.auth();

const GuardRoute = ({ children }) => {

    let history = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const dispatch = useDispatch()
    const obtenerClienteXIdFirebase = (id) => dispatch(obtenerClienteIdFirebase(id));

    useEffect(() => {
        firebaseAuth.onAuthStateChanged(userFire => {
            if (userFire) {
                setCurrentUser(userFire);
                obtenerClienteXIdFirebase(userFire.uid);
                history("/home")
            } else {
                setCurrentUser(false);
                history("/login")
            }
        });
    }, []);
    
    return children
};


export default GuardRoute;
