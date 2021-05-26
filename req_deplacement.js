'use strict'

require('remedial')
const fs = require("fs");
const afficher_laby =  require("./fct_afficher_laby");

const req_deplacement = function (req, res, query) {
	let contenu;
	let perso;
	let map;
	let plateau;
	let marqueurs;
	let page;
	
	//recuperation de la map et des coordonées du perso
	contenu = fs.readFileSync("map.json", "utf-8");
    map = JSON.parse(contenu);
    contenu = fs.readFileSync("emplacement_perso.json", "utf-8");
    perso = JSON.parse(contenu);

	//algo
	switch (query.direction) {
		case 'haut' :
			perso.y --;
			break;
		case 'bas' :
			perso.y ++;
			break;
		case 'droite' :
			perso.x ++;
			break;
		case 'gauche' :
			perso.x --;
			break;
	}

	//stringify + appel fonction afficher_laby
	contenu = JSON.stringify(perso);
	fs.writeFileSync("emplacement_perso.json",contenu, "utf-8");
	
	plateau = afficher_laby(map, perso);

// marqueurs
    marqueurs = {}; 
    marqueurs.plateau = plateau;

    marqueurs.image_haut = `<img class="monstre" src="carreBleu.png">`
    marqueurs.image_gauche =  `<img class="monstre" src="carreJaune.png">`
    marqueurs.image_droite =  `<img class="monstre" src="carreRouge.jpeg">`
    marqueurs.image_bas =  `<img class="monstre" src="mujika2.png">`

	page = fs.readFileSync("modele_laby.html", "utf-8");
    page = page.supplant(marqueurs);

    res.writeHead(200, { "content-type": "text/html" });
    res.write(page);
    res.end();

};

module.exports = req_deplacement;
