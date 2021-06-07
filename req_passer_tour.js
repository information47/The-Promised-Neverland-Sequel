'use strict'
const fs = require("fs");
const afficher_laby = require("./fct_afficher_laby");
const prevision = require("./fct_prevision");

const req_passer_tour = function(req, res, query){
    let contenu;
    let donnees;
    let marqueurs;
    let page;

    //lecture du json
    contenu = fs.readFileSync("labyrinthe.json", "utf-8");
    donnees = JSON.parse(contenu);

    //algo
    donnees.pa = 10;
    donnees.pm = 1;
    donnees.tour ++;
    donnees.vie--;

    contenu = prevision(donnees.prevision);
    donnees.prevision = contenu;
    console.log(donnees.prevision);

    //stringify, ecriture dans le json, marqueurs et affichage de la page
    contenu = JSON.stringify(donnees);
    fs.writeFileSync("labyrinthe.json", contenu, "utf-8");

    marqueurs = afficher_laby();

    page = fs.readFileSync("modele_laby.html", "utf-8");
    page = page.supplant(marqueurs);

    res.writeHead(200, { "content-type": "text/html" });
    res.write(page);
    res.end();
}

module.exports = req_passer_tour;