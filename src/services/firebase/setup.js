import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

let firebaseConfig;

if (window.location.hostname === "localhost" || window.location.hostname === 'cliente-dev.siavial.com') {
    firebaseConfig = {
        apiKey: "AIzaSyAx-ajZKH777cKuqHjGyvzN9khAV1LOaYw",
        authDomain: "siavial-webadmin.firebaseapp.com",
        projectId: "siavial-webadmin",
        storageBucket: "siavial-webadmin.appspot.com",
        messagingSenderId: "119117823587",
        appId: "1:119117823587:web:09a198f08ec38748410256",
        measurementId: "G-5GNVR81L32",
    };
} else {
    firebaseConfig = {
        apiKey: "AIzaSyAx-ajZKH777cKuqHjGyvzN9khAV1LOaYw",
        authDomain: "siavial-webadmin.firebaseapp.com",
        projectId: "siavial-webadmin",
        storageBucket: "siavial-webadmin.appspot.com",
        messagingSenderId: "119117823587",
        appId: "1:119117823587:web:09a198f08ec38748410256",
        measurementId: "G-5GNVR81L32",
    };
}

export const firebaseApp = firebase.initializeApp(firebaseConfig);
