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
	compteur = JSON.parse(contenu);

	if (query.proposition === query.reponse) {
		compteur -= 1;
	}
//Quand le compteur tombe à 0, le serveur renvoi au début	
	if (compteur === 0) {
		page = fs.readFileSync('modele_accueil_membre', 'utf-8');
	}
	marqueurs = {};
	marqueurs.compteur = compteur.compteur;


};

module.exports = compteur;
