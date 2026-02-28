import { db } from "./firebase.js";
import { collection, getDocs, query, where, updateDoc, doc } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const peliculasData = [

{
id:"darkknight",
nombre:"The Dark Knight",
genero:"Acción",
adulto:false,
img:"darkknight.png",
video:"darkknight.mp4",
sinopsis:"Redefinió el cine de superhéroes con un tono serio y realista."
},

{
id:"interestelar",
nombre:"Interestelar",
genero:"Ciencia Ficción",
adulto:false,
img:"interestelar.png",
video:"interestelar.mp4",
sinopsis:"Famosa por su precisión visual y emocional sobre el tiempo y el espacio."
},

{
id:"resplandor",
nombre:"El resplandor",
genero:"Terror",
adulto:false,
img:"resplandor.png",
video:"resplandor.mp4",
sinopsis:"Un clásico del terror psicológico dirigido por Stanley Kubrick."
},

{
id:"forrestgump",
nombre:"Forrest Gump",
genero:"Comedia",
adulto:false,
img:"forrestgump.png",
video:"forrestgump.mp4",
sinopsis:"Mezcla humor y drama recorriendo la historia de EE. UU."
},

{
id:"padrino",
nombre:"El padrino",
genero:"Drama",
adulto:false,
img:"padrino.png",
video:"padrino.mp4",
sinopsis:"Considerada por muchos como la mejor película de la historia."
},

{
id:"chihiro",
nombre:"El viaje de Chihiro",
genero:"Animación",
adulto:false,
img:"chihiro.png",
video:"chihiro.mp4",
sinopsis:"Obra maestra de Studio Ghibli y ganadora del Óscar."
},

{
id:"anillos",
nombre:"El señor de los anillos",
genero:"Fantasía",
adulto:false,
img:"anillos.png",
video:"anillos.mp4",
sinopsis:"El referente máximo del género épico y fantástico."
},

{
id:"psicosis",
nombre:"Psicosis",
genero:"Suspenso",
adulto:false,
img:"psicosis.png",
video:"psicosis.mp4",
sinopsis:"La película que cambió las reglas del cine de suspenso y terror."
},

{
id:"bueno_malo_feo",
nombre:"El bueno, el malo y el feo",
genero:"Wéstern",
adulto:false,
img:"bueno_malo_feo.png",
video:"bueno_malo_feo.mp4",
sinopsis:"La cara más conocida del spaghetti western y su música inolvidable."
},

{
id:"lalaland",
nombre:"La La Land",
genero:"Musical",
adulto:false,
img:"lalaland.png",
video:"lalaland.mp4",
sinopsis:"Un renacimiento moderno del género musical clásico."
},

{
id:"lancheros",
nombre:"Tres lancheros bien picudos",
genero:"Pícaras",
adulto:true,
img:"lancheros.png",
video:"lancheros.mp4",
sinopsis:"Comedia pícara mexicana dirigida al público adulto."
}



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

