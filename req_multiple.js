'use strict'
require('remedial')
const fs = require("fs");

const req_multiple = function (req, res, query) {
	let contenu;
	let page;
	let marqueurs;
	let indice;
	let question;

	contenu = fs.readFileSync("question_multiple.json", "utf-8");
	question = JSON.parse(contenu);

	if (question[query.no_question].choices[query.proposition] === question[query.no_question].correct){
		console.log("correct");
	} else {
		console.log("pas bon");
	}

	indice = Math.floor(Math.random() * question.length);

	marqueurs = {};
	marqueurs.question = question[indice].question;
	marqueurs.no_question = indice;
	marqueurs.reponse0 = question[indice].choices[0];
	marqueurs.reponse1 = question[indice].choices[1];
	marqueurs.reponse2 = question[indice].choices[2];
	marqueurs.reponse3 = question[indice].choices[3];
	page = fs.readFileSync("modele_multiple.html", "utf-8");
	page = page.supplant(marqueurs);

	res.writeHead(200, { "content-type": "text/html" });
	res.write(page);
	res.end();
};

module.exports = req_multiple; 
