'use strict'
const fs = require("fs");
const prevision = function (prevision) {
    let contenu;
    let donnees;
    let mujika = {};
    let bleu = {};
    let rouge = {};
    let jaune = {};
    let nb_aleatoire;
    let liste_liens = [`<img class="previ" src="carre_bleu.png">`, `<img class="previ" src="carre_rouge.png">`, `<img class="previ" src="carre_jaune.png">`];

    if (prevision.length === 0){
        for(let i=0; i<8; i++){
            nb_aleatoire = Math.floor(Math.random()*3)
            prevision.push({"nb": nb_aleatoire, "lien": liste_liens[nb_aleatoire]});
        }
    } else {
        prevision.splice(0, 1);
        nb_aleatoire = Math.floor(Math.random()*3)
        prevision.push({"nb": nb_aleatoire, "lien": liste_liens[nb_aleatoire]});
    }
    return prevision;
}
module.exports = prevision;