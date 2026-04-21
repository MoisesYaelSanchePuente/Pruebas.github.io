import msal

CLIENT_ID = "42161d2e-6813-40c4-97aa-974d400b80b0"
TENANT_ID = "489581cf-0f55-408a-9e44-289b6fb55ea0"
CLIENT_SECRET = "RPK8Q~WYx59RxjmXFCUijfz9UF9uDKMUYdrsGawu"

AUTHORITY = f"https://login.microsoftonline.com/{TENANT_ID}"
SCOPES = ["Files.ReadWrite", "User.Read"]
REDIRECT_URI = "http://localhost:5000/callback"

app_msal = msal.ConfidentialClientApplication(
    CLIENT_ID,
    authority=AUTHORITY,
    client_credential=CLIENT_SECRET
)

def obtener_url_login():
    return app_msal.get_authorization_request_url(
        SCOPES,
        redirect_uri=REDIRECT_URI
    )

def obtener_token_desde_code(code):
    return app_msal.acquire_token_by_authorization_code(
        code,
        scopes=SCOPES,
        redirect_uri=REDIRECT_URI
    )