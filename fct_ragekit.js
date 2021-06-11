'use strict'
const fs = require('fs');
const prevision = require("./fct_prevision");

const ragekit = function(donnees) {
    donnees.perso.y = 18;
    donnees.perso.x = 18;
    donnees.pm = 1;
    donnees.pa = 10;
    donnees.prevision.length = 0;
    donnees.tour = 1;
    donnees.vie = 50;
    donnees.murs = [];

    donnees.prevision = prevision(donnees.prevision);

    return donnees;
}
module.exports = ragekit;