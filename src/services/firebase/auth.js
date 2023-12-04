import { firebaseApp } from "./index";

const auth = firebaseApp.auth();

const logIn = async (email, password) => {
    return await auth
        .signInWithEmailAndPassword(email, password)
        .then((snapshot) => snapshot.user.uid)
        .catch((error) => console.log(error));
};

const logOut = async () => {
    return await auth
        .signOut()
        .then(() => true)
        .catch((error) => console.log(error));
};

export { logIn, logOut };
