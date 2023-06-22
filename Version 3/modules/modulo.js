const myHeaders = new Headers();

myHeaders.set("Access-Control-Allow-Origin", "*");

function mod(n, m) {
    return ((n % m) + m) % m;
}

export {mod};