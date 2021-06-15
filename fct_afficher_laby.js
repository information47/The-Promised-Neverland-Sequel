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
	let names;
	let image_entite;

	//recuperation des donnees et de la map
	contenu = fs.readFileSync("map.json", "utf-8");
    map = JSON.parse(contenu);
    contenu = fs.readFileSync("labyrinthe.json", "utf-8");
    donnees = JSON.parse(contenu);
	
	// fabrication de la grille
	for (let i=0; i<map.length; i++){
		for (let j=0; j<map[i].length; j++){
			grille.push([]);
			// herbe ou dalle
			if (map[i][j] === 0) {
				grille[i][j] = {code: 0};
			} else if (map[i][j] === 1) {
				grille[i][j] = {code: 1};
			}
			// arrivée
			if (i === 0 && j === 0) {
				grille[i][j] = {code: 3};
			}
			//personnage
			if (i === donnees.perso.y && j === donnees.perso.x) {
				grille[i][j] = {code: 2};
			}
			//murs
			if (donnees.murs.length > 0) {
				for (let k=0; k<donnees.murs.length; k++)
					if (i === donnees.murs[k].y && j === donnees.murs[k].x) {
						grille[i][j] = {code: 4};
					}
			}
		}
	}
	//dalle de deplacement
	liste_visite = dalle_dep(map, donnees.perso, donnees.pm, grille);

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
				case 4:
					plateau += `<img class="cellule" src="dalle_mur.png">`;
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

    
		names = Object.getOwnPropertyNames(donnees.entite);
	for (let i=0; i<names.length; i++) {
		switch (donnees.entite[names[i]]) {
			case "haut":
				marqueurs.image_haut = `<img class="monstre" src="carre_${names[i]}.png">`;
				break;
			case "droite":
				marqueurs.image_droite = `<img class="monstre" src="carre_${[names[i]]}.png">`;
				break;
			case "bas":
				marqueurs.image_bas = `<img class="monstre" src="carre_${[names[i]]}.png">`;
				break;
			case "gauche":
				marqueurs.image_gauche = `<img class="monstre" src="carre_${[names[i]]}.png">`;
				break;
		}
	}
    
	// donnees du personnage
	marqueurs.vie = donnees.vie;
	marqueurs.pa = donnees.pa;
	marqueurs.deplacements = donnees.pm;
	
	//prevision
	marqueurs.previ0 = donnees.prevision[0].lien;
	marqueurs.previ1 = donnees.prevision[1].lien;
	marqueurs.previ2 = donnees.prevision[2].lien;
	marqueurs.previ3 = donnees.prevision[3].lien;
	marqueurs.previ4 = donnees.prevision[4].lien;
	marqueurs.previ5 = donnees.prevision[5].lien;
	marqueurs.previ6 = donnees.prevision[6].lien;
	marqueurs.previ7 = donnees.prevision[7].lien;

	//actions
	if (donnees.intervalle[0] > 0 || donnees.pa < 1) {
		marqueurs.deplacement_rapide = "<img src='deplacement_rapide.png' id='deplacement_rapide'>";
	} else {
		marqueurs.deplacement_rapide = "<a id='a_intervalle' href='req_action?action=deplacement_rapide'><img id='deplacement_rapide'src='deplacement_rapide.png'></a>";
	}
	if (donnees.intervalle[1] > 0 || donnees.pa <1) {
		marqueurs.decalage = "<img src='decalage.png'>";
	} else {
		marqueurs.decalage = "<a id='a_intervalle' href='req_action?action=decalage'><img src='decalage.png'></a>";
	}

	//intervalles
	if (donnees.intervalle[0] !== 0) {
		marqueurs.intervalle_dep_rap = "<p class='intervalle'>" + donnees.intervalle[0] + "</p>";
	} else {
		marqueurs.intervalle_dep_rap = "<p>" + "" + "</p>";
	}
	if (donnees.intervalle[1] !== 0) {
		marqueurs.intervalle_dec = "<p class='intervalle'>" + donnees.intervalle[1] + "</p>";
	} else {
		marqueurs.intervalle_dec = "<p>" + "" + "</p>";
	}

	return marqueurs;
};

module.exports = afficher_laby;
