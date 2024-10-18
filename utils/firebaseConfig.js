import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth"; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDrangIq3SJzHxyKUVY6Js8ABOSjF4JZYA",
  authDomain: "peluqueria-132f3.firebaseapp.com",
  projectId: "peluqueria-132f3",
  storageBucket: "peluqueria-132f3.appspot.com",
  messagingSenderId: "48546151210",
  appId: "1:48546151210:web:daef1361bada455321bc53"
};

// Inicializa la app de Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firebase Auth con AsyncStorage para React Native
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Inicializa Firestore
const db = getFirestore(app);

export { auth, db };
