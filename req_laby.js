'use strict'

require('remedial')
const fs = require("fs");

const req_laby = function (req, res, query) {
    let contenu;
    let page;
    let marqueurs;
	let plateau;
	
    contenu = fs.readFileSync("map.json", "utf-8");
	console.log(contenu);
    marqueurs = {};
    marqueurs.plateau = plateau;
	
	page = fs.readFileSync("modele_laby.html", "utf-8");
    page = page.supplant(marqueurs);

    res.writeHead(200, { "content-type": "text/html" });
    res.write(page);
    res.end();
};

module.exports = req_laby;
