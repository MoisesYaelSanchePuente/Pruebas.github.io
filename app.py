import os
from flask import Flask, render_template, redirect, request
from procesar_word import extraer_word
from guardar_excel import guardar_en_excel
from generar_html import generar_html_desde_excel

app = Flask(__name__)


@app.route("/")
def inicio():
    archivos = os.listdir("uploads")
    agrupado = {}

    # Orden real de meses
    orden_meses = {
        "enero": 1, "febrero": 2, "marzo": 3, "abril": 4,
        "mayo": 5, "junio": 6, "julio": 7, "agosto": 8,
        "septiembre": 9, "octubre": 10, "noviembre": 11, "diciembre": 12
    }

    for archivo in archivos:
        if archivo.endswith(".docx") and not archivo.startswith("~$"):
            nombre = archivo.replace(".docx", "")
            anio = nombre[-4:]
            mes = nombre[:-4].lower()

            if anio not in agrupado:
                agrupado[anio] = []

            agrupado[anio].append((mes, nombre))

    # 🔥 Ordenar correctamente
    agrupado_ordenado = {}

    for anio, lista in agrupado.items():
        lista_ordenada = sorted(
            lista,
            key=lambda x: orden_meses.get(x[0], 0),
            reverse=True  # Diciembre arriba
        )

        agrupado_ordenado[anio] = [nombre for mes, nombre in lista_ordenada]

    agrupado_ordenado = dict(sorted(agrupado_ordenado.items(), reverse=True))

    if not agrupado_ordenado:
        return redirect("/regenerar")

    return render_template("index.html", agrupado=agrupado_ordenado)

@app.route("/regenerar")
def regenerar():
    archivos = os.listdir("uploads")

    for archivo in archivos:
        if archivo.endswith(".docx") and not archivo.startswith("~$"):
            ruta = os.path.join("uploads", archivo)

            datos = extraer_word(ruta)
            guardar_en_excel(datos, archivo)
            generar_html_desde_excel(archivo)

    return redirect("/")


@app.route('/<pagina>')
def pagina(pagina):
    return render_template(f"{pagina}.html")


if __name__ == "__main__":
    app.run(debug=True)