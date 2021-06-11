"use strict";

const fs = require("fs");

const req_afficher_question_simple = function (req, res, query) {
	let contenu;
	let questions;
	let indice;
	let marqueurs;
	let page;
	let valide;
	let i;

	contenu = fs.readFileSync("questions.json", "utf-8");
	questions = JSON.parse(contenu);

	indice = Math.floor(Math.random()*questions.length);

	marqueurs = {};
	marqueurs.intitule = questions[indice].question;
	page = fs.readFileSync("modele_question.html", "utf-8");
	page = page.supplant(marqueurs);
	//On verifie que les réponses soit validé
/*	valide = false;
	i = 0;
	while(i < questions.length && valide === false) {
		if() {

		}
		
	}*/

	res.writeHead(200, {"Content-Type": "text/html" });
	res.write(page);
	res.end();

};
	module.exports = req_afficher_question_simple;
