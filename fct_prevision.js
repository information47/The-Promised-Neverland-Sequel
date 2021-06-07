'use strict'
const fs = require("fs");
const prevision = function (prevision) {
    let contenu;
    let donnees;
    let entite;

    console.log (prevision);
    entite = ["mujika","bleu", "rouge", "jaune"]

    if (prevision.length === 0){
        for(let i=0; i<8; i++){
            prevision.push(Math.floor(Math.random()*3));
            console.log(prevision, "if");
        }
    } else {
        prevision.splice(0, 1);
        prevision.push(Math.floor(Math.random()*3));
        console.log(prevision, "else")
    }
    return prevision;
}
module.exports = prevision;