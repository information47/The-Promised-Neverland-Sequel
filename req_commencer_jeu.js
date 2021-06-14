"use strict";

const fs = require("fs");
require('remedial');

const trait = function (req, res, query) {
	let listeMembres;
	let question;
	let indice;
	let Membre;
	let contenu_fichier;
    let contenu;
	let marqueurs;
    let page;
	let difficulte;
	let epreuve;
	let nb_epreuve;
	let i;
	contenu = fs.readFileSync("question_multiple.json", "utf-8");
	question = JSON.parse(contenu);
	//compteurs (standars)
	let nb_erreur = 2;
	//on inscrit le compteur aux joueur
	contenu_fichier = fs.readFileSync("membres.json", 'utf-8');
	listeMembres =  JSON.parse(contenu_fichier);


	i = 0;
	while(i<listeMembres.length) {
		if (listeMembres[i].pseudo === query.pseudo) {
				listeMembres[i].difficulte = query.difficulte; 
		}
		i++;
	}
	
	//On règle la difficulté selon le niveau choisit
	if(query.difficulte === 0){
			nb_erreur = 2;
	} else if (query.difficulte === 1){
			nb_erreur = 0;
	}

	//on ajoute le compteur dans la liste des comptes
	
	i = 0;
	while(i<listeMembres.length) {
		if (listeMembres[i].pseudo === query.pseudo) {
				listeMembres[i].compteur = 3;
		}
		i++;
	}
	

	contenu_fichier = JSON.stringify(listeMembres);

	fs.writeFileSync("membres.json", contenu_fichier, 'utf-8');
	
	//une fois compteur pris en compte
	
	indice = Math.floor(Math.random() * question.length);
    marqueurs = {}; 
    marqueurs.erreur = ""; 
    marqueurs.pseudo = ""; 
	marqueurs.question = question[indice].question;
    marqueurs.no_question = indice;
    marqueurs.reponse0 = question[indice].choices[0];
    marqueurs.reponse1 = question[indice].choices[1];
    marqueurs.reponse2 = question[indice].choices[2];
    marqueurs.reponse3 = question[indice].choices[3];
    page = fs.readFileSync("modele_multiple.html", "utf-8");
	page = page.supplant(marqueurs);

    res.writeHead(200, { 'Content-Type': 'text/html' }); 
    res.write(page);
    res.end();
};


module.exports = trait;

