'use strict'

require('remedial')
const fs = require("fs");
const afficher_laby =  require("./fct_afficher_laby");

const req_deplacement = function (req, res, query) {
	let contenu;
	let marqueurs;
	let page;
	let donnees;

	
	//recuperation des données
    contenu = fs.readFileSync("labyrinthe.json", "utf-8");
    donnees = JSON.parse(contenu);

	//algo
	donnees.perso.y = Number(query.y);
	donnees.perso.x = Number(query.x);
	//stringify + appel fonction afficher_laby
	contenu = JSON.stringify(donnees);
	fs.writeFileSync("labyrinthe.json",contenu, "utf-8");
	
	marqueurs  = afficher_laby();

	page = fs.readFileSync("modele_laby.html", "utf-8");
    page = page.supplant(marqueurs);

    res.writeHead(200, { "content-type": "text/html" });
    res.write(page);
    res.end();

};
module.exports = req_deplacement;
