import os
from datetime import datetime
from docx import Document


def extraer_word(ruta_word):
    doc = Document(ruta_word)
    os.makedirs("static", exist_ok=True)

    datos = []
    nombre_base = os.path.splitext(os.path.basename(ruta_word))[0]
    contador_img = 1

    hoy = datetime.now()

    for parrafo in doc.paragraphs:
        texto = parrafo.text.strip()

        if texto:
            estilo_nombre = parrafo.style.name.lower()

            if "title" in estilo_nombre or "titulo" in estilo_nombre:
                tipo = "T"
                estilo = "text-align:center;"
            elif "subtitle" in estilo_nombre or "subtitulo" in estilo_nombre:
                tipo = "ST"
                estilo = "text-align:center;"
            else:
                tipo = "P"
                estilo = "text-align:center;"

            datos.append({
                "dia": hoy.day,
                "mes": hoy.strftime("%B"),
                "año": hoy.year,
                "numero_publicacion": "",
                "tipo": tipo,
                "contenido": texto,
                "estilo": estilo
            })

        # ========= IMÁGENES =========
        for run in parrafo.runs:
            dibujos = run._element.xpath('.//a:blip')
            for dibujo in dibujos:
                r_id = dibujo.get(
                    '{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed'
                )

                if not r_id:
                    continue

                imagen = doc.part.related_parts[r_id]
                ext = imagen.content_type.split("/")[-1]

                nombre_imagen = f"{nombre_base}_img{contador_img}.{ext}"
                ruta_imagen = os.path.join("static", nombre_imagen)

                with open(ruta_imagen, "wb") as f:
                    f.write(imagen.blob)

                datos.append({
                    "dia": hoy.day,
                    "mes": hoy.strftime("%B"),
                    "año": hoy.year,
                    "numero_publicacion": "",
                    "tipo": "IMG",
                    "contenido": nombre_imagen,
                    "estilo": "width:500px; display:block; margin:auto;"
                })

                contador_img += 1

    return datos