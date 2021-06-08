'use strict'
const check = function(test, liste) {
	let verif = liste.find(pos => pos.y === test.y && pos.x === test.x);
	return verif;
}
const dalle_dep = function(map, position, pm) {
	let liste_visite = [];

	//push de la case de depart
	liste_visite.push({"y": position.y, "x": position.x, "pm": pm});

	//pour toute la liste
	for (let i=0; i<liste_visite.length; i++) {
		for (let j=0; j<map.length; j++) {
			for (let k=0; k<map[j].length; k++) {
				if (map[j][k] === 1 && liste_visite[i].pm > 0 
						&&( 
							(j === liste_visite[i].y -1 && k === liste_visite[i].x) 
							|| (j === liste_visite[i].y +1 && k === liste_visite[i].x)
							|| (j === liste_visite[i].y && k === liste_visite[i].x +1) 
							|| (j === liste_visite[i].y && k === liste_visite[i].x -1) 
						) && check({y: j, x: k}, liste_visite) === undefined
				) {
					liste_visite.push({y: j, x: k, pm: liste_visite[i].pm -1});
				}   
			}   
		}   
	}
	liste_visite.splice(0, 1);
	return liste_visite;
}
module.exports = dalle_dep;
