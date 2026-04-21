import requests

def subir_excel_onedrive(token, ruta_local, nombre_archivo):
    url = f"https://graph.microsoft.com/v1.0/me/drive/root:/{nombre_archivo}:/content"

    headers = {
        "Authorization": f"Bearer {token}"
    }

    with open(ruta_local, "rb") as archivo:
        respuesta = requests.put(
            url,
            headers=headers,
            data=archivo
        )

    return respuesta.json()