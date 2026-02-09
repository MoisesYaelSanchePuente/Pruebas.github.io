let grande = false;

function cambiarTamaño() {
    const texto = document.getElementById("textoTamaño");

    if (grande) {
        texto.style.fontSize = "16px";
    } else {
        texto.style.fontSize = "28px";
    }

    grande = !grande;
}
