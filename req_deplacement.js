'use strict'

require('remedial')
const fs = require("fs");
const afficher_laby =  require("./fct_afficher_laby");
const dalle_dep = require("./fct_dalle_deplacement");

const check = function(test, liste) {
	let verif = liste.find(pos => pos.y === test.y && pos.x === test.x);
	return verif;
}

const req_deplacement = function (req, res, query) {
	let contenu;
	let marqueurs;
	let page;
	let donnees;
	let map;
	let liste_visite;
	let cellule_cilblee;

	//recuperation des données
    contenu = fs.readFileSync("labyrinthe.json", "utf-8");
    donnees = JSON.parse(contenu);
	contenu = fs.readFileSync("map.json", "utf-8");
	map = JSON.parse(contenu);
	
	//algo
	donnees.perso.y = Number(query.y);
	donnees.perso.x = Number(query.x);
	donnees.pm = Number(query.pm);	

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
