'use strict'
require('remedial')
const fs = require("fs");

const req_multiple = function (req, res, query) {
	let contenu_fichier;
	let contenu;
	let listeMembres;
	let epreuve;
	let pseudo;
	let nb_epreuve;
	let nb_erreur;
	let multiple;
	let i;
	let page;
	let marqueurs;
	let indice;
	let question;

	contenu_fichier = fs.readFileSync("membres.json", "utf-8");
    listeMembres = JSON.parse(contenu_fichier);
	let choices;
	
	contenu = fs.readFileSync("question_multiple.json", "utf-8");
	question = JSON.parse(contenu);
	
	nb_epreuve = Number(nb_epreuve);
    i=0;
    while(i<listeMembres.length){
        if(listeMembres[i].pseudo === query.pseudo) {
                listeMembres[i].nb_epreuve = 0;
				console.log("hi");
				if(question[query.no_question].choices[query.proposition] === question[query.no_question].correct){
					listeMembres[i].nb_epreuve++;
                	if(listeMembres[i].nb_epreuve === 4){
                    	page = fs.readFileSync("modele_question.html", "utf-8");
                    	page = page.supplant(marqueurs);
					}
                }
        }
        i++;
    }

    contenu_fichier = JSON.stringify(listeMembres);
    fs.writeFileSync("membres.json", contenu_fichier, 'utf-8');


	if (question[query.no_question].choices[query.proposition] === question[query.no_question].correct){
		console.log("correct");
	} else {
		console.log("pas bon");
	}
	
	indice = Math.floor(Math.random() * question.length);	
	marqueurs = {};
	marqueurs.pseudo = "";
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
