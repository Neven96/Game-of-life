const myHeaders = new Headers();

myHeaders.set("Access-Control-Allow-Origin", "*");

import { speedObject } from "./objects.js";

//Changes gamespeed
function selectSpeed() {
    let gameSpeed = document.getElementById("fart").value;
    let speedName;
    let speed;
    gameSpeed = parseInt(gameSpeed);
    switch (gameSpeed) {
        case 1:
            speedName = "Slowester";
            speed = 3000;
            break;
        case 2:
            speedName = "Slowest";
            speed = 2250;
            break;
        case 3:
            speedName = "Slower";
            speed = 1250;
            break;
        case 4:
            speedName = "Slow";
            speed = 750;
            break;
        case 5:
            speedName = "Normal";
            speed = 500;
            break;
        case 6:
            speedName = "Fast";
            speed = 250;
            break;
        case 7:
            speedName = "Faster";
            speed = 150;
            break;
        case 8:
            speedName = "Fastest";
            speed = 75;
            break;
        case 9:
            speedName = "Fastester"
            speed = 30;
            break;
        default:
            speedName = "Normal";
            speed = 500;
    }

    document.getElementById("speedOutSpan").textContent = speedName;
    speedObject.setSpeed = speed;
}

export {selectSpeed};