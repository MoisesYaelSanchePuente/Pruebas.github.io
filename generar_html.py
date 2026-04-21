import pandas as pd
import os
import re


# 🔥 FUNCIÓN PARA CONVERTIR LINKS EN CLICKABLES
def convertir_links(texto):
    # Detecta http, https y www
    url_pattern = r'((https?://|www\.)[^\s]+)'

    return re.sub(
        url_pattern,
        lambda x: f"<a href='{'http://' + x.group(0) if x.group(0).startswith('www.') else x.group(0)}' target='_blank'>{x.group(0)}</a>",
        texto
    )


def generar_html_desde_excel(nombre_archivo):
    ruta_excel = "data/BlogRapidoExpress.xlsx"
    hoja = nombre_archivo.replace(".docx", "")

    df = pd.read_excel(ruta_excel, sheet_name=hoja)

    html = f"""
    <html>
    <head>
        <title>{hoja}</title>
        <style>
            body {{
                font-family: Arial;
                text-align: center;
                background-color: #f5f5f5;
            }}

            h1 {{
                color: #0a1f44; /* Azul marino */
                font-weight: bold;
                font-size: 36px;
            }}

            h2 {{
                color: #1b5e20; /* Verde oscuro */
                font-weight: bold;
                font-size: 28px;
            }}

            p {{
                font-size: 18px;
            }}

            img {{
                width: 500px;
                display: block;
                margin: auto;
            }}

            a {{
                color: blue;
                text-decoration: underline;
            }}
        </style>
    </head>
    <body>
    """

    for _, fila in df.iterrows():
        tipo = fila["Tipo"]
        contenido = convertir_links(str(fila["Contenido"]))
        estilo = str(fila["Estilo"]) if not pd.isna(fila["Estilo"]) else ""

        if tipo == "T":
            html += f"<h1 style='{estilo}'>{contenido}</h1>"

        elif tipo == "ST":
            html += f"<h2 style='{estilo}'>{contenido}</h2>"

        elif tipo == "IMG":
            html += f"<img src='/static/{contenido}' style='{estilo}'>"

        else:
            html += f"<p style='{estilo}'>{contenido}</p>"

    html += "</body></html>"

    os.makedirs("templates", exist_ok=True)

    with open(f"templates/{hoja}.html", "w", encoding="utf-8") as f:
        f.write(html)