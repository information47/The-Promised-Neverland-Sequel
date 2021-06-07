'use strict'
const fs = require('fs');
const prevision = require("./fct_prevision");

const ragekit = function() {
    let contenu;
    let donnees;

    contenu = fs.readFileSync("labyrinthe.json", "utf-8");
    donnees = JSON.parse(contenu);

    donnees.perso.y = 18;
    donnees.perso.x = 18;
    donnees.pm = 1;
    donnees.pa = 10;
    donnees.prevision.length = 0;
    donnees.tour = 1;
    donnees.vie = 50;

    contenu = prevision(donnees.prevision);
    contenu = donnees.prevision;
    contenu =JSON.stringify(donnees);
    fs.writeFileSync("labyrinthe.json", contenu, "utf-8");
}
module.exports = ragekit;