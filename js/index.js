import { db } from "./firebase.js";
import { collection, addDoc, getDocs, query, where, updateDoc }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.ingresar = async function() {

let usuario = document.getElementById("usuario").value;
let correo = document.getElementById("correo").value;
let password = document.getElementById("password").value;
let edadSeleccionada = document.querySelector('input[name="edad"]:checked');

if(!usuario || !correo || !password || !edadSeleccionada){
document.getElementById("mensaje").innerText="Completa todos los campos";
return;
}

let esMayor = edadSeleccionada.value === "si";

const q = query(collection(db,"usuarios"), where("correo","==",correo));
const snapshot = await getDocs(q);

if(snapshot.empty){

// REGISTRO
await addDoc(collection(db,"usuarios"),{
usuario,
correo,
contraseña:password,
mayorEdad: esMayor,
favoritos:[],
historial:[]
});

localStorage.setItem("correo",correo);
window.location="sala.html";

}else{

let docRef = snapshot.docs[0];
let data = docRef.data();

if(data.usuario===usuario && data.contraseña===password){

// 🔥 ACTUALIZAMOS SIEMPRE LA EDAD
await updateDoc(docRef.ref,{
mayorEdad: esMayor
});

localStorage.setItem("correo",correo);
window.location="sala.html";

}else{
document.getElementById("mensaje").innerText="Usuario y/o contraseña incorrectas";
}

}

}
