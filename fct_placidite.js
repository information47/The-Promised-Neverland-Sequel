'use strict'

const placidite = function (intervalle) {
    for (let i=0; i<intervalle.length; i++) {
        if (intervalle[i] > 0) {
            intervalle[i] --;
        }
    }
    return intervalle;
}
module.exports = placidite;