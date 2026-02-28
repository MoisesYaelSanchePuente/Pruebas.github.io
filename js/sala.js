import { db } from "./firebase.js";
import { collection, getDocs, query, where, updateDoc, doc } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const peliculasData = [
{ id:"darkknight", nombre:"The Dark Knight", genero:"Accion", adulto:false, img:"darkknight.png", video:"darkknight.mp4"},
{ id:"lancheros", nombre:"Tres lancheros bien picudos", genero:"picaras", adulto:true, img:"lancheros.png", video:"lancheros.mp4"}
];

let correo = localStorage.getItem("correo");

async function cargarUsuario(){
const q = query(collection(db,"usuarios"), where("correo","==",correo));
const snapshot = await getDocs(q);
return snapshot.docs[0];
}

async function mostrar(){

let usuarioDoc = await cargarUsuario();
let data = usuarioDoc.data();

let contenedor = document.getElementById("peliculas");
contenedor.innerHTML="";

peliculasData.forEach(p=>{

let div = document.createElement("div");
div.className="card";

if(!data.mayorEdad && p.adulto){
div.innerHTML=`<img src="img/paraniños.png">`;
}else{

let esFav = data.favoritos.includes(p.id);

div.innerHTML=`
<img src="img/${p.img}">
<h3>${p.nombre}</h3>
<button onclick="ver('${p.video}','${p.id}')">Ver</button>
<button onclick="fav('${p.id}')">
${esFav?"💛":"🤍"}
</button>
`;

}

contenedor.appendChild(div);

});

}

window.ver = async function(video,id){

let usuarioDoc = await cargarUsuario();
let data = usuarioDoc.data();

if(!data.historial.includes(id)){
data.historial.push(id);
await updateDoc(usuarioDoc.ref,{historial:data.historial});
}

window.location="player.html?video="+video;

}

window.fav = async function(id){

let usuarioDoc = await cargarUsuario();
let data = usuarioDoc.data();

if(data.favoritos.includes(id)){
data.favoritos = data.favoritos.filter(f=>f!==id);
}else{
data.favoritos.push(id);
}

await updateDoc(usuarioDoc.ref,{favoritos:data.favoritos});
mostrar();
}

mostrar();