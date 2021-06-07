'use strict'
const fs = require('fs');

const deplacement_rapide = function() {
    let contenu;
    let donnees;

    contenu = fs.readFileSync("labyrinthe.json", "utf-8");
    donnees = JSON.parse(contenu);
    donnees.pm ++;
    donnees.pa --;

    contenu =JSON.stringify(donnees);
    fs.writeFileSync("labyrinthe.json", contenu, "utf-8");

}

module.exports = deplacement_rapide;