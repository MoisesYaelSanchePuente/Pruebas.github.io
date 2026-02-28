import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBwI0SSFadFsw7ZsDeEhtbU-4EQTsEiLPg",
  authDomain: "proyectofirestorealumnos.firebaseapp.com",
  projectId: "proyectofirestorealumnos",
  storageBucket: "proyectofirestorealumnos.firebasestorage.app",
  messagingSenderId: "968446566310",
  appId: "1:968446566310:web:f08d68f3963374315b3967"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);