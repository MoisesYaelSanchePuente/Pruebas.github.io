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

const peliculasData = [

{nombre:"The Dark Knight", genero:"Acción", img:"img/darkknight.png", video:"videos/darkknight.mp4", sinopsis:"Redefinió el cine de superhéroes con tono serio."},

{nombre:"Interestelar", genero:"Ciencia Ficción", img:"img/interestelar.png", video:"videos/interestelar.mp4", sinopsis:"Viaje emocional sobre el tiempo y el espacio."},

{nombre:"El resplandor", genero:"Terror", img:"img/resplandor.png", video:"videos/resplandor.mp4", sinopsis:"Clásico psicológico dirigido por Kubrick."},

{nombre:"Forrest Gump", genero:"Comedia", img:"img/forrestgump.png", video:"videos/forrestgump.mp4", sinopsis:"Humor y drama en la historia de EE.UU."},

{nombre:"El padrino", genero:"Drama", img:"img/padrino.png", video:"videos/padrino.mp4", sinopsis:"Considerada la mejor película de la historia."},

{nombre:"El viaje de Chihiro", genero:"Animación", img:"img/chihiro.png", video:"videos/chihiro.mp4", sinopsis:"Obra maestra de Studio Ghibli."},

{nombre:"El señor de los anillos", genero:"Fantasía", img:"img/anillos.png", video:"videos/anillos.mp4", sinopsis:"Referente máximo del género épico."},

{nombre:"Psicosis", genero:"Suspenso", img:"img/psicosis.png", video:"videos/psicosis.mp4", sinopsis:"Cambió las reglas del suspenso."},

{nombre:"El bueno, el malo y el feo", genero:"Wéstern", img:"img/bueno_malo_feo.png", video:"videos/bueno_malo_feo.mp4", sinopsis:"Ícono del spaghetti western."},

{nombre:"La La Land", genero:"Musical", img:"img/lalaland.png", video:"videos/lalaland.mp4", sinopsis:"Renacimiento moderno del musical."},

{nombre:"Tres lancheros bien picudos", genero:"Pícaras", img:"img/lancheros.png", video:"videos/lancheros.mp4", sinopsis:"Comedia pícara mexicana clásica."}

];

const contenedor = document.getElementById("contenedorPeliculas");

function renderPeliculas(lista){
contenedor.innerHTML="";
lista.forEach(p => {
contenedor.innerHTML += `
<div class="pelicula">
<img src="${p.img}">
<div class="overlay">
<b>${p.nombre}</b><br>
<small>${p.genero}</small><br>
${p.sinopsis}
<div class="botones">
<button onclick="verPelicula('${p.video}','${p.nombre}')">Ver</button>
<button onclick="agregarFavorito('${p.nombre}')">❤️</button>
</div>
</div>
</div>
`;
});
}

renderPeliculas(peliculasData);

/* BUSCADOR */
document.getElementById("buscador").addEventListener("keyup", e=>{
let texto = e.target.value.toLowerCase();
let filtradas = peliculasData.filter(p=>p.nombre.toLowerCase().includes(texto));
renderPeliculas(filtradas);
});

/* ORDEN A-Z */
window.ordenarAZ = function(){
let ordenadas = [...peliculasData].sort((a,b)=>a.nombre.localeCompare(b.nombre));
renderPeliculas(ordenadas);
}

/* ORDEN POR GENERO */
document.getElementById("ordenGenero").addEventListener("change", e=>{
let genero = e.target.value;
if(!genero){
renderPeliculas(peliculasData);
return;
}
let filtradas = peliculasData.filter(p=>p.genero===genero);
renderPeliculas(filtradas);
});

/* VER */
window.verPelicula = function(video,nombre){
localStorage.setItem("video",video);
localStorage.setItem("nombrePeli",nombre);
window.location="player.html";
}

/* FAVORITOS */
async function obtenerUsuario(){
const q = query(collection(db,"usuarios"), where("correo","==",correo));
const snapshot = await getDocs(q);
return snapshot.docs[0];
}

window.agregarFavorito = async function(nombre){
let docSnap = await obtenerUsuario();
let data = docSnap.data();
let favoritos = data.favoritos || [];

if(!favoritos.includes(nombre)){
favoritos.push(nombre);
await updateDoc(doc(db,"usuarios",docSnap.id),{favoritos});
alert("Añadido a favoritos");
}
}

/* HISTORIAL */
window.mostrarHistorial = async function(){
let docSnap = await obtenerUsuario();
let data = docSnap.data();
alert("Historial:\n" + (data.historial||[]).join("\n"));
}

window.mostrarFavoritos = async function(){
let docSnap = await obtenerUsuario();
let data = docSnap.data();
alert("Favoritos:\n" + (data.favoritos||[]).join("\n"));
}

window.regresar = function(){
window.location="index.html";
}
