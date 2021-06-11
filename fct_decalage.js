'use strict'

const fs = require("fs");

const decalage = function(murs, perso) {
    let contenu;
    let map;

    contenu = fs.readFileSync("map.json", "utf-8");
    map = JSON.parse(contenu);

    for (let i=0; i<murs.length; i++) {
        if (murs[i].y === perso.y +1 && murs[i].y < 18 && murs[i].x === perso.x && map[murs[i].y +1][murs[i].x] ===1) {
            murs[i].y ++;
        } else if (murs[i].y === perso.y -1 && murs[i].y >0 && murs[i].x === perso.x && map[murs[i].y -1][murs[i].x] ===1) {
            murs[i].y --;
        } else if (murs[i].y === perso.y && murs[i].x < 18 && murs[i].x === perso.x +1 && map[murs[i].y][murs[i].x +1] ===1) {
            murs[i].x ++;
        } else if (murs[i].y === perso.y && murs[i].x >0 && murs[i].x === perso.x -1 && map[murs[i].y][murs[i].x -1] ===1) {
            murs[i].x --;
        }
    }
    return murs;
}

module.exports = decalage;