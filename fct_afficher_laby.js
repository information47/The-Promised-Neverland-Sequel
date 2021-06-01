'use strict'
const fs = require("fs");

const afficher_laby = function (map, perso) {
	let plateau;
	let grille = [];

	
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
			if (i === perso.y && j === perso.x) {
				grille[i][j] = 2;
			}
			//dalle de deplacement
			if (i === perso.y +1 && j === perso.x && map[i][j] === 1) {
				grille[i][j] = "bas";
			}
			if (i === perso.y -1 && j === perso.x && map[i][j] === 1) {
				grille[i][j] = "haut";
			}
			if (i === perso.y && j === perso.x +1 && map[i][j] === 1) {
				grille[i][j] = "droite";
			}
			if (i === perso.y && j === perso.x -1 && map[i][j] === 1) {
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
					plateau += `<img src="dalle2.png">`;
					break;
				case 0 :
					plateau += `<img src="grass.png">`;
					break;
				case 2 :
					plateau += `<img src="dalle_emma.png">`;
					break;
				case 3 :	
					plateau += `<img src="dalle_bleue.png">`;
					break;
				case 'bas' :
					plateau += `<a href="req_deplacement?direction=bas"><img src="dalle_deplacement.png"></a>`;
					break;
				case 'haut' :
					plateau += `<a href="req_deplacement?direction=haut"><img src="dalle_deplacement.png"></a>`;
					break;
				case 'droite' :
					plateau += `<a href="req_deplacement?direction=droite"><img src="dalle_deplacement.png"></a>`;
					break;
				case 'gauche' :
					plateau += `<a href="req_deplacement?direction=gauche"><img src="dalle_deplacement.png"></a>`;
					break;
				default :
					break;
			}	
		}
		plateau += "</div>";
	}
	return plateau;
};

module.exports = afficher_laby;
