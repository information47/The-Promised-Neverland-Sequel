//=========================================================================
// Site WEB demo PI
// Auteurs : P. Thiré & T. Kerbrat
// Version : 09/11/2018
//=========================================================================

"use strict";

const http = require("http");
const url = require("url");
let mon_serveur;
let port;

//-------------------------------------------------------------------------
// DECLARATION DES DIFFERENTS MODULES CORRESPONDANT A CHAQUE ACTION
//-------------------------------------------------------------------------

const req_commencer = require("./req_commencer.js");
const req_afficher_formulaire_inscription = require("./req_afficher_formulaire_inscription.js");
const req_inscrire = require("./req_inscrire.js");
const req_identifier = require("./req_identifier.js");

const req_statique = require("./req_statique.js");
const req_erreur = require("./req_erreur.js");
const req_afficher_question_simple = require("./req_afficher_question_simple.js")
const req_afficher_fini_jouer = require("./req_afficher_fini_jouer.js");
const req_accueil_membre = require("./req_accueil_membre.js");
const req_commencer_jeu = require("./req_commencer_jeu.js");
const req_afficher_choix_niveau = require("./req_afficher_choix_niveau.js");
const req_multiple = require("./req_multiple.js");
const req_laby = require("./req_laby.js");
const req_deplacement = require("./req_deplacement.js");
//-------------------------------------------------------------------------
// FONCTION DE CALLBACK APPELLEE POUR CHAQUE REQUETE
//-------------------------------------------------------------------------

const traite_requete = function (req, res) {

	let requete;
	let pathname;
	let query;

	console.log("URL reçue : " + req.url);
	requete = url.parse(req.url, true);
	pathname = requete.pathname;
	query = requete.query;

	// ROUTEUR

	try {
		switch (pathname) {
			case '/':
			case '/req_commencer':
				req_commencer(req, res, query);
				break;
			case '/req_afficher_formulaire_inscription':
				req_afficher_formulaire_inscription(req, res, query);
				break;
			case '/req_inscrire':
				req_inscrire(req, res, query);
				break;
			case '/req_identifier':
				req_identifier(req, res, query);
				break;
			case '/req_afficher_fini_jouer':
				req_afficher_fini_jouer(req, res, query);
				break;
			case '/req_accueil_membre':
				req_accueil_membre(req, res, query);
				break;
			case '/req_afficher_question_simple':
				req_afficher_question_simple(req, res, query);
				break;
			case '/req_afficher_jeu':
				req_afficher_jeu(req, res, query);
			case '/req_commenecer_jeu':
				req_commencer_jeu(req, res, query);
				break;
			case '/req_afficher_choix_niveau':
				req_afficher_choix_niveau(req, res, query);
				break;
			case '/req_multiple':
				req_multiple(req, res, query);
				break;
			case '/req_laby':
				req_laby(req, res, query);
				break;
			case '/req_deplacement':
				req_deplacement(req, res, query);
				break;
			default:
				req_statique(req, res, query);
				break;
		}
	} catch (e) {
		console.log('Erreur : ' + e.stack);
		console.log('Erreur : ' + e.message);
		//console.trace();
		req_erreur(req, res, query);
	}
};

//-------------------------------------------------------------------------
// CREATION ET LANCEMENT DU SERVEUR
//-------------------------------------------------------------------------

mon_serveur = http.createServer(traite_requete);
port = 5000;
//port = process.argv[2];
console.log("Serveur en ecoute sur port " + port);
mon_serveur.listen(port);
