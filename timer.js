"use strict";

const chrono = document.querySelector('.chrono');

let seconde = 10;

window.addEventListener('load', countdown);

function countdown() {
    setInterval(function(){
        chrono.innerHTML = seconde;
        seconde -= 1;

    }, 1000)
};

