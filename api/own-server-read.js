async function getOwnServerIp(key) {
    let targetUrl = "https://api.github.com/repos/ajg-machine" +
        "/connection-data/contents/own-server";
    let headers = { accept: "application/vnd.github.raw" };
    let response = await fetch(targetUrl, { headers });
    let data = await response.text();
    data = Uint8Array.from(atob(data), c => c.charCodeAt(0));
    key = await crypto.subtle.importKey(
        "raw", key, { name: "AES-GCM" }, false, ["encrypt", "decrypt"]
    );
    let algorithm = { name: "AES-GCM", length: 256, iv: data.slice(0, 12) };
    data = await crypto.subtle.decrypt(algorithm, key, data.slice(12));
    data = (new TextDecoder()).decode(data);
    return JSON.parse(data)["public-ip"];
}


async function main() {
    let key = atob(""); // ADD KEY
    key = Uint8Array.from(key, c => c.charCodeAt(0));
    console.log(await getOwnServerIp(key));
}


main();
