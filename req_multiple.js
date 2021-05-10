'use strict'
require('remedial')
const fs = require("fs");

const req_multiple = function (req, res, query) {
	let contenu;
	let page;
	let marqueurs;
	let indice;
	let questions;

	contenu = fs.readFileSync("questions_multiples.json", "utf-8");
	questions = JSON.parse(contenu);
	
	indice = Math.floor(Math.random() * questions.length);
	marqueurs = {};
	marqueurs.intitule = questions[indice].question;
	marqueurs.reponse0 = questions[indice].prop0;
	marqueurs.reponse1 = questions[indice].prop1;
	marqueurs.reponse2 = questions[indice].prop2;
	marqueurs.reponse3 = questions[indice].prop3;
	page = fs.readFileSync("modele_multiple.html", "utf-8");
	page = page.supplant(marqueurs);

	res.writeHead(200, { "content-type": "text/html" });
	res.write(page);
	res.end();
};

module.exports = req_multiple;
