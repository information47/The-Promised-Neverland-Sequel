"use strict";

const fs = require("fs");
require('remedial');

const trait = function (req, res, query) {

    let page;

    page = fs.readFileSync('modele_choix_niveau.html', 'utf-8');


    res.writeHead(200, { 'Content-Type': 'text/html' }); 
    res.write(page);
    res.end();
};

module.exports = trait;
