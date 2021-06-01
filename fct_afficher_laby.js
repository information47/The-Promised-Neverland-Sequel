'use strict'
const fs = require("fs");

const afficher_laby = function () {
	let plateau;
	let grille = [];
	let marqueurs;
	let donnees;
	let contenu;
	let map;

	//recuperation des donnees et de la map
	contenu = fs.readFileSync("map.json", "utf-8");
    map = JSON.parse(contenu);
    contenu = fs.readFileSync("labyrinthe.json", "utf-8");
    donnees = JSON.parse(contenu);

	// fabrication de la grille
	for (let i=0; i<map.length; i++){
		grille.push([]);
		for (let j=0; j<map[i].length; j++){
			// herbe ou dalle
			if (map[i][j] === 1) {
				grille[i].push(1);
			} else if (map[i][j] === 0) {
				grille[i].push(0);
			}
			// arrivée
			if (i === 0 && j === 0) {
				grille[i][j] = 3;
			}
			//personnage
			if (i === donnees.perso.y && j === donnees.perso.x) {
				grille[i][j] = 2;
			}
			//dalle de deplacement
			if (i === donnees.perso.y +1 && j === donnees.perso.x && map[i][j] === 1) {
				grille[i][j] = "bas";
			}
			if (i === donnees.perso.y -1 && j === donnees.perso.x && map[i][j] === 1) {
				grille[i][j] = "haut";
			}
			if (i === donnees.perso.y && j === donnees.perso.x +1 && map[i][j] === 1) {
				grille[i][j] = "droite";
			}
			if (i === donnees.perso.y && j === donnees.perso.x -1 && map[i][j] === 1) {
				grille[i][j] = "gauche";
			}
		}	
	}

	// retranscription de la grille en html
	plateau = "";
	for (let i=0; i<grille.length; i++){
		plateau += "<div>"
		for (let j=0; j<grille[i].length; j++){
			switch (grille[i][j]) {
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
				case 'bas' :
					plateau += `<a href="req_deplacement?direction=bas"><img class="cellule" src="dalle_deplacement.png"></a>`;
					break;
				case 'haut' :
					plateau += `<a href="req_deplacement?direction=haut"><img class="cellule" src="dalle_deplacement.png"></a>`;
					break;
				case 'droite' :
					plateau += `<a href="req_deplacement?direction=droite"><img class="cellule" src="dalle_deplacement.png"></a>`;
					break;
				case 'gauche' :
					plateau += `<a href="req_deplacement?direction=gauche"><img class="cellule" src="dalle_deplacement.png"></a>`;
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
	marqueurs.energie = donnees.energie;
	marqueurs.deplacements = donnees.pm;

	return marqueurs;
};

module.exports = afficher_laby;
