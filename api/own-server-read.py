def get_own_server_ip(key):
    from base64 import b64decode
    from cryptography.hazmat.primitives.ciphers.aead import AESGCM
    from json import loads
    from urllib.request import Request, urlopen
    target_url = \
        "https://api.github.com/repos/ajg-machine" + \
        "/connection-data/contents/own-server"
    headers = dict(accept="application/vnd.github.raw")
    request = Request(target_url, headers=headers)
    with urlopen(request) as response:
        data = b64decode(response.read().rstrip())
    data = AESGCM(key).decrypt(data[:12], data[12:], b"")
    return loads(data)["public-ip"]


from base64 import b64decode
key = b64decode(b"") # ADD KEY
print(get_own_server_ip(key))
