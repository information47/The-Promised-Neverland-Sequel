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
	let nb_erreur;
	let multiple;

	contenu = fs.readFileSync("question_multiple.json", "utf-8");
	question = JSON.parse(contenu);

	//on inscrit la difficulte aux joueur
	contenu_fichier = fs.readFileSync("membres.json", 'utf-8');
	listeMembres =  JSON.parse(contenu_fichier);
	

	query.difficulte = Number(query.difficulte);
	
	i = 0;
	while(i<listeMembres.length) {
		if (listeMembres[i].pseudo === query.pseudo) {
				listeMembres[i].difficulte = query.difficulte;
				//ajout de l'epreuve
				listeMembres[i].epreuve = multiple;

					//ajout du nb d'erreur
					if(query.difficulte === 0){
						listeMembres[i].nb_erreur = 2;
					} else if(query.difficulte === 1){
						listeMembres[i].nb_erreur = 0;
					}
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
	marqueurs.pseudo = query.pseudo;
    page = fs.readFileSync("modele_multiple.html", "utf-8");
	page = page.supplant(marqueurs);

    res.writeHead(200, { 'Content-Type': 'text/html' }); 
    res.write(page);
    res.end();
};


module.exports = trait;

