'use strict'
const fs = require("fs");
const dalle_dep = require("./fct_dalle_deplacement");
const prevision = require("./fct_prevision")
const afficher_laby = function () {
	let plateau;
	let grille = [];
	let marqueurs;
	let donnees;
	let contenu;
	let map;
	let liste_visite;
	//recuperation des donnees et de la map
	contenu = fs.readFileSync("map.json", "utf-8");
    map = JSON.parse(contenu);
    contenu = fs.readFileSync("labyrinthe.json", "utf-8");
    donnees = JSON.parse(contenu);
	//checkpoint
	// fabrication de la grille
	for (let i=0; i<map.length; i++){
		for (let j=0; j<map[i].length; j++){
			grille.push([]);
			// herbe ou dalle
			if (map[i][j] === 1) {
				grille[i][j] = {code: 1};
			} else if (map[i][j] === 0) {
				grille[i][j] = {code: 0};
			}
			// arrivée
			if (i === 0 && j === 0) {
				grille[i][j] = {code: 3};
			}
			//personnage
			if (i === donnees.perso.y && j === donnees.perso.x) {
				grille[i][j] = {code: 2};
			}
		}
	}
	//dalle de deplacement
	liste_visite = dalle_dep(map, donnees.perso, donnees.pm);

	for (let i=0; i<liste_visite.length; i++) {
		grille[liste_visite[i].y][liste_visite[i].x] = {code: "dep", y: liste_visite[i].y, x: liste_visite[i].x, pm: liste_visite[i].pm}
	}
	// retranscription de la grille en html
	plateau = "";
	for (let i=0; i<grille.length; i++){
		plateau += "<div>"
		for (let j=0; j<grille[i].length; j++){
			switch (grille[i][j].code) {
				case 1 :
					plateau += `<img class="cellule" src="dalle2.png">`;
					break;
				case 0 :
					plateau += `<img class="cellule" src="grass.png">`;
					break;
				case 2 :
					plateau += `<img class="cellule" src="dalle_emma.png">`;
					break;
				case 3 :	
					plateau += `<img class="cellule" src="dalle_bleue.png">`;
					break;
				case "dep":
					plateau += `<a href="req_deplacement?y=${i}&x=${j}&pm=${grille[i][j].pm}"><img class="cellule" src="dalle_deplacement.png"></a>`;
					break;
				default :
					break;
			}	
		}
		plateau += "</div>";
	}
	//marqueurs
	marqueurs = {}; 
    marqueurs.plateau = plateau;

    marqueurs.image_haut = `<img class="monstre" src="carreBleu.png">`
    marqueurs.image_gauche =  `<img class="monstre" src="carreJaune.png">`
    marqueurs.image_droite =  `<img class="monstre" src="carreRouge.jpeg">`
    marqueurs.image_bas =  `<img class="monstre" src="mujika2.png">`

    marqueurs.vie = donnees.vie;
	marqueurs.pa = donnees.pa;
	marqueurs.deplacements = donnees.pm;

	marqueurs.previ0 = donnees.prevision[0];
	marqueurs.previ1 = donnees.prevision[1];
	marqueurs.previ2 = donnees.prevision[2];
	marqueurs.previ3 = donnees.prevision[3];
	marqueurs.previ4 = donnees.prevision[4];
	marqueurs.previ5 = donnees.prevision[5];
	marqueurs.previ6 = donnees.prevision[6];
	marqueurs.previ7 = donnees.prevision[7];

	return marqueurs;
};

module.exports = afficher_laby;
