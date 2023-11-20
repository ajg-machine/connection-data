async function getOwnServerIp(key) {
    let response = await fetch(
        "https://api.github.com/repos/ajg-machine/connection-data/contents/own-server",
        { headers: { accept: "application/vnd.github.raw" } });
    let data = Uint8Array.from(atob(await response.text()), c => c.charCodeAt(0));
    data = await crypto.subtle.decrypt(
        { name: "AES-GCM", length: 256, iv: data.slice(0, 12) },
        await crypto.subtle.importKey(
            "raw", key, { name: "AES-GCM" }, false, ["encrypt", "decrypt"]
        ),
        data.slice(12)
    );
    data = (new TextDecoder()).decode(data);
    return JSON.parse(data)["public-ip"];
}


async function main() {
    let key = atob(""); // ADD KEY
    key = Uint8Array.from(key, c => c.charCodeAt(0));
    console.log(await getOwnServerIp(key));
}


main();
