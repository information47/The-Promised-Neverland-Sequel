"use strict";

const fs = require("fs");
require('remedial');

const trait = function (req, res, query) {

    let marqueurs;
    let page;
	//compteurs (standars)
	let compteurs = 3;
	//on inscrit le compteur aux joueur
	contenu_fichier = fs.readFileSync("memebres.json", 'utf-8');
	listeMembres =  JSON.parse(contenu_fichier);
	
	//on ajoute le compteur dans la liste des comptes
	
	contenu_fichier = JSON.stringify(listeMembres);

	fs.writeFileSync("membres.json", contenu_fichier, 'utf-8');
	
	//une fois compteur pris en compte
    page = fs.readFileSync('modele_parcours.html', 'utf-8');

    marqueurs = {}; 
    marqueurs.erreur = ""; 
    marqueurs.pseudo = ""; 
    page = page.supplant(marqueurs);

    res.writeHead(200, { 'Content-Type': 'text/html' }); 
    res.write(page);
    res.end();
};


module.exports = trait;

