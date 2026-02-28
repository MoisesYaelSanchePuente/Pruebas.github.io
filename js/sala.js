import { db } from "./firebase.js";
import { 
collection,
query,
where,
getDocs,
updateDoc,
doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let correo = localStorage.getItem("correo");

async function obtenerUsuario(){
const q = query(collection(db,"usuarios"), where("correo","==",correo));
const snapshot = await getDocs(q);
return snapshot.docs[0];
}

window.verPelicula = async function(nombre){

let docSnap = await obtenerUsuario();
let data = docSnap.data();

let historial = data.historial || [];

if(!historial.includes(nombre)){
historial.push(nombre);

await updateDoc(
doc(db,"usuarios",docSnap.id),
{ historial: historial }
);
}

alert("Reproduciendo: " + nombre);
}

window.mostrarFavoritos = function(){
alert("Aquí se mostrarán los favoritos");
}

window.mostrarHistorial = async function(){

let docSnap = await obtenerUsuario();
let data = docSnap.data();

alert("Historial:\n" + (data.historial || []).join("\n"));
}

window.regresar = function(){
window.location="index.html";
}

/* BUSCADOR */
document.getElementById("buscador").addEventListener("keyup",function(){

let filtro = this.value.toLowerCase();
let peliculas = document.querySelectorAll(".pelicula");

peliculas.forEach(p => {
let texto = p.innerText.toLowerCase();
p.style.display = texto.includes(filtro) ? "block" : "none";
});

});
