from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import PlainTextResponse

app = FastAPI()

# Simulated key-to-HWID mapping
key_database = {
    'aP7xK9vRqT2mF1Hz': '6AA9D355-09D8-416E-8502-D6C8AC1E598B',
    'KEY-5678': 'HWID-2222',
    'KEY-ABCD': 'HWID-3333'
}

@app.get("/", response_class=PlainTextResponse)
async def verify_key(key: str = None, hwid: str = None):
    if not key or not hwid:
        raise HTTPException(status_code=400, detail='error("32ks.lol -> *Missing Key/Hwid")')

    expected_hwid = key_database.get(key)
    if not expected_hwid:
        raise HTTPException(status_code=403, detail='error("32ks.lol -> Invalid Key!")')

    if expected_hwid != hwid:
        raise HTTPException(status_code=403, detail='error("32ks.lol -> Hwid Mismatch!")')

    return 'print("32ks.lol -> *Success!")'
