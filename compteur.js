//fichier a utiliser dans chaque épreuves pour lire le compteurs pour chaque erreur
"use strict";

const fs = require("fs");

function compteur(req, res, query) {
	let compteur;
	let question;
	let questions;
	let page;
	let marqueurs;

	contenu = fs.readFileSync(//fichier des questions);
	questions = JSON.parse(contenu);

	contenu = fs.readFileSync("membres.json", "utf-8");
	membres = JSON.parse(contenu);

	if (query.proposition !== query.reponse) {
		compteur -= 1;
	}
//Quand le compteur tombe à 0, le serveur renvoi au début	
	let i;

	while(i<listeMembres.length) {
		if(listeMembres[i].pseudo === query.pseudo) {
			if (membres[i].compteur === 0) {
				page = fs.readFileSync('modele_accueil_membre.html', 'utf-8');
			}	
		}
		i++;
	}
	marqueurs = {};
	marqueurs.compteur = compteur.compteur;
};

module.exports = compteur;
