import { db } from "./firebase.js";

import { 
collection,
addDoc,
getDocs,
query,
where,
updateDoc,
doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
usuario:usuario,
correo:correo,
contraseña:password,
mayorEdad:esMayor,
favoritos:[],
historial:[]
});

localStorage.setItem("correo",correo);
window.location="sala.html";

}else{

let docSnap = snapshot.docs[0];
let data = docSnap.data();

if(data.usuario === usuario && data.contraseña === password){

await updateDoc(
doc(db,"usuarios",docSnap.id),
{
mayorEdad:esMayor
}
);

localStorage.setItem("correo",correo);
window.location="sala.html";

}else{
document.getElementById("mensaje").innerText="Usuario y/o contraseña incorrectas";
}

}

};
