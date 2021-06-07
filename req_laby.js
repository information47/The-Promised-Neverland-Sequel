'use strict'

require('remedial')
const fs = require("fs");
const afficher_laby = require("./fct_afficher_laby");

const req_laby = function(req, res, query) {
	let contenu;
	let marqueurs;
	let page;
	let donnees;

	contenu = fs.readFileSync("labyrinthe.json", "utf-8");
	donnees = JSON.parse(contenu);

	marqueurs = afficher_laby();
	
	page = fs.readFileSync("modele_laby.html", "utf-8");
	page = page.supplant(marqueurs);

	res.writeHead(200, { "content-type": "text/html" });
	res.write(page);
	res.end();
};

module.exports = req_laby;
