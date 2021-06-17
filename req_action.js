'use strict'

require('remedial')
const fs = require("fs");
const deplacement_rapide =require("./fct_deplacement_rapide");
const afficher_laby = require("./fct_afficher_laby");
const ragekit = require("./fct_ragekit.js");
const decalage = require("./fct_decalage.js");
const placidite = require("./fct_placidite.js");

const req_action = function (req, res, query) {
	let marqueurs;
	let page;
	let donnees;
	let contenu;

	contenu = fs.readFileSync("labyrinthe.json", "utf-8");
	donnees = JSON.parse(contenu);

	switch(query.action) {
		case "deplacement_rapide" :
			contenu = deplacement_rapide(donnees.pm);
			donnees.pm = contenu;
			donnees.intervalle[0] = 10;
			donnees.pa --;
			break;
		case "decalage" :
			console.log("switch");
			donnees.murs = decalage(donnees.murs, donnees.perso);
			donnees.intervalle[1] = 10;
			donnees.pa --;
			break;
		case "placidite" :
			donnees.intervalle = placidite(donnees.intervalle);
			donnees.pa --;
			donnees.vie--;
			break;
		case "ragekit" :
			donnees = ragekit(donnees);
			break;
		default:
			break;
	}

	contenu = JSON.stringify(donnees);
	fs.writeFileSync("labyrinthe.json", contenu, "utf-8");

	marqueurs  = afficher_laby();

	page = fs.readFileSync("modele_laby.html", "utf-8");
    page = page.supplant(marqueurs);

    res.writeHead(200, { "content-type": "text/html" });
    res.write(page);
    res.end();
}
module.exports = req_action