'use strict'

require('remedial')
const fs = require("fs");

const req_laby = function (req, res, query) {
    let contenu;
    let page;
    let marqueurs;
	let plateau;
	let map;
	let perso;
	let grille = [];

    contenu = fs.readFileSync("map.json", "utf-8");
	map = JSON.parse(contenu);
	contenu = fs.readFileSync("emplacement_perso.json", "utf-8");
	perso = JSON.parse(contenu);
	
	for (let i=0; i<map.length; i++){
		grille.push([]);
		for (let j=0; j<map[i].length; j++){
			console.log(j);
			if (map[i][j] === 1) {
				grille[i].push(1);
			} else if (map[i][j] === 0) {
				grille[i].push(0);
			}
			if (i === perso.y && j === perso.x) {
				grille[i][j] = 2;
			}
		}
	}
	console.log(grille);
	//
	plateau = "";
	for (let i=0; i<grille.length; i++){
		plateau += "<div>"
		for (let j=0; j<grille[i].length; j++){
			if (grille[i][j] === 1) {
				plateau += "<img src=\"dalle2.png\">";
			} else if (grille[i][j] === 0){
				plateau += "<img src=\"grass.png\">";
			} else if (grille[i][j] === 2) {
				plateau += "<img src=\"dalle_emma.png\">";
			}
		}
		plateau += "</div>";
	}
	
	//
    marqueurs = {};
    marqueurs.plateau = plateau;

	marqueurs.image_haut = "<img class=\"monstre\" src=\"carreBleu.png\">"
	marqueurs.image_gauche =  "<img class=\"monstre\" src=\"carreJaune.png\">"
	marqueurs.image_droite =  "<img class=\"monstre\" src=\"carreRouge.jpeg\">"
	marqueurs.image_bas =  "<img class=\"monstre\" src=\"mujika2.png\">"

	page = fs.readFileSync("modele_laby.html", "utf-8");
    page = page.supplant(marqueurs);

    res.writeHead(200, { "content-type": "text/html" });
    res.write(page);
    res.end();
};

module.exports = req_laby;
