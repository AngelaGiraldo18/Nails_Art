// Importa las funciones que necesitas de los SDK que necesitas
import { initializeApp } from "firebase/app";

// Tu configuración de Firebase
export const environment = {
    production: false,
    firebaseConfig: { 
        apiKey: "AIzaSyAZdRDJfHnsQkz-qltgIZzTAyB3cujrw4g",
        authDomain: "nailsart-auth.firebaseapp.com",
        projectId: "nailsart-auth",
        storageBucket: "nailsart-auth.appspot.com",
        messagingSenderId: "686640429979",
        appId: "1:686640429979:web:e71e25eb8c0b8d9a5d7f3e"
    }
};

// Inicializa la aplicación de Firebase
const app = initializeApp(environment.firebaseConfig);
