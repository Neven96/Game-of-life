const myHeaders = new Headers();

myHeaders.set("Access-Control-Allow-Origin", "*");

// Proper modulo function for JavaScript
function mod(n, m) {
    return ((n % m) + m) % m;
}

export {mod};