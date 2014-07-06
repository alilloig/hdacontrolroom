	//modules
	var express = require('express');
	var app = express();
	var mongoose= require('mongoose');

	// configuration ===========================================
		
	// config files
	var db = require('./config/db.js');

	var port = process.env.PORT || 8080; // set our port
	// mongoose.connect(db.url); // connect to our mongoDB database (uncomment after you enter in your own credentials in config/db.js)

	app.configure(function() {
		app.use(express.static(__dirname + '/static')); 	
		//set the static files location /public/img will b /img for users
		app.use(express.logger('dev')); 						// log every request to the console
		app.use(express.bodyParser()); 							// have the ability to pull information from html in POST
		app.use(express.methodOverride()); 						// have the ability to simulate DELETE and PUT
	});

	// routes ==================================================
	require('./app/routes.js')//(app); // configure our routes

	// start app ===============================================
	app.listen(port);								// startup our app at http://localhost:8080
	exports = module.exports = app; 						// expose app

