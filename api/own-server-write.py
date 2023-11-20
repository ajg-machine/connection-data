def update_own_server(data, key, access_token):
    from base64 import b64encode
    from cryptography.hazmat.primitives.ciphers.aead import AESGCM
    from json import dumps, loads
    from os import urandom
    from urllib.request import Request, urlopen
    target_url = \
        "https://api.github.com/repos/ajg-machine" + \
        "/connection-data/contents/own-server"
    with urlopen(target_url) as response:
        sha = loads(response.read())["sha"]
    nonce = urandom(12)
    data = nonce + AESGCM(key).encrypt(nonce, dumps(data).encode(), b"")
    data = b64encode(b64encode(data)).decode()
    data = dumps(dict(message="Update", content=data, sha=sha)).encode()
    headers = dict(authorization=f"Bearer {access_token}")
    request = Request(target_url, method="PUT", headers=headers, data=data)
    with urlopen(request) as response:
        pass


from base64 import b64decode
key = b64decode(b"") # ADD KEY
access_token = "" # ADD ACCESS TOKEN
data = {"public-ip": ""} # ADD IP
update_own_server(data, key, access_token)
