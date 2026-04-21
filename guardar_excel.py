import os
import pandas as pd
from datetime import datetime


def guardar_en_excel(datos, nombre_archivo):
    os.makedirs("data", exist_ok=True)

    ruta_excel = "data/BlogRapidoExpress.xlsx"
    nombre_hoja = os.path.splitext(nombre_archivo)[0]

    filas = []

    for item in datos:
        if not isinstance(item, dict):
            continue

        contenido = str(item.get("contenido", "")).strip()
        tipo = item.get("tipo", "P")
        estilo = item.get("estilo", "text-align:center;")

        # ✅ detectar por texto escrito
        if contenido.lower().startswith("titulo:"):
            tipo = "T"
            contenido = contenido.replace("Titulo:", "").strip()
            estilo = "text-align:center; font-weight:bold;"

        elif contenido.lower().startswith("subtitulo:"):
            tipo = "ST"
            contenido = contenido.replace("Subtitulo:", "").strip()
            estilo = "text-align:center; font-weight:bold;"

        elif contenido.lower().startswith("texto:"):
            tipo = "P"
            contenido = contenido.replace("Texto:", "").strip()

        filas.append({
            "Dia": datetime.now().day,
            "Mes": datetime.now().strftime("%B"),
            "Año": datetime.now().year,
            "Nº Publicación": "",
            "Tipo": tipo,
            "Contenido": contenido,
            "Estilo": estilo
        })

    df = pd.DataFrame(filas)

    modo = "a" if os.path.exists(ruta_excel) else "w"

    if modo == "a":
        with pd.ExcelWriter(
            ruta_excel,
            engine="openpyxl",
            mode="a",
            if_sheet_exists="replace"
        ) as writer:
            df.to_excel(writer, sheet_name=nombre_hoja, index=False)
    else:
        with pd.ExcelWriter(
            ruta_excel,
            engine="openpyxl",
            mode="w"
        ) as writer:
            df.to_excel(writer, sheet_name=nombre_hoja, index=False)