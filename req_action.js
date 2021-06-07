'use strict'

require('remedial')
const fs = require("fs");
const deplacement_rapide =require("./fct_deplacement_rapide");
const afficher_laby = require("./fct_afficher_laby");
const ragekit = require("./fct_ragekit.js")

const req_action = function (req, res, query) {
	let marqueurs;
	let page;

	switch(query.action) {
		case "deplacement_rapide" :
			deplacement_rapide();
			break;
		case "decalage" :

			break;
		case "placidité" :

			break;
		case "ragekit" :
			ragekit();
			break;
		default:
			break;
	}
	marqueurs  = afficher_laby();

	page = fs.readFileSync("modele_laby.html", "utf-8");
    page = page.supplant(marqueurs);

    res.writeHead(200, { "content-type": "text/html" });
    res.write(page);
    res.end();
}
module.exports = req_action
