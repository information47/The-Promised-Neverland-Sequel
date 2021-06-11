'use strict'
const fs = require('fs');

const deplacement_rapide = function(pa, pm) {
    pm ++;
    pa --;
    return {pa, pm};
}

module.exports = deplacement_rapide;