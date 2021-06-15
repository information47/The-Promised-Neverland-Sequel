'use strict'
const fs = require("fs");
const afficher_laby = require("./fct_afficher_laby");
const prevision = require("./fct_prevision");

const req_passer_tour = function(req, res, query){
    let contenu;
    let donnees;
    let marqueurs;
    let page;
    let map;

    //lecture du json
    contenu = fs.readFileSync("labyrinthe.json", "utf-8");
    donnees = JSON.parse(contenu);
    contenu = fs.readFileSync("map.json", "utf-8");
    map = JSON.parse(contenu);

    //algo
    donnees.pa = 10;
    donnees.pm = 1;
    donnees.tour ++;
    donnees.vie--;
    for (let i=0; i<donnees.intervalle.length; i++){
        if (donnees.intervalle[i] !== 0) {
        donnees.intervalle[i] --;
        }
    }
        // permutation des entites
    switch(donnees.prevision[0].nb) {
        case 0:
            //bleu
            contenu = donnees.entite.bleu;
            donnees.entite.bleu = donnees.entite.mujika;
            donnees.entite.mujika = contenu;
            break;
        case 1:
            //rouge
            contenu = donnees.entite.rouge;
            donnees.entite.rouge = donnees.entite.mujika;
            donnees.entite.mujika = contenu;
            break;
        case 2: 
            //jaune
            contenu = donnees.entite.jaune;
            donnees.entite.jaune = donnees.entite.mujika;
            donnees.entite.mujika = contenu;
            break;
        default:
            break;
    }

    contenu = prevision(donnees.prevision);
    donnees.prevision = contenu;

    switch (donnees.entite["mujika"]) {
        case "haut":
            if (donnees.perso.y < 18 && map[donnees.perso.y +1][donnees.perso.x] === 1) {
                donnees.murs.push({"y": donnees.perso.y +1, "x": donnees.perso.x});
            }
            break;
        case "droite":
            if (map[donnees.perso.y][donnees.perso.x -1] === 1) {
                donnees.murs.push({"y": donnees.perso.y, "x": donnees.perso.x -1});
            }
            break;
        case "bas":
            if (donnees.perso.y > 0 && map[donnees.perso.y -1][donnees.perso.x] === 1) {
            donnees.murs.push({"y": donnees.perso.y -1, "x": donnees.perso.x});
            }
            break;
        case "gauche":
            if (map[donnees.perso.y][donnees.perso.x +1] === 1) {
                donnees.murs.push({"y": donnees.perso.y, "x": donnees.perso.x +1});
            }
        default:
            break;
    }

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