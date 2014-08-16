	//moduleslalalalal
	var app = require('express.io')();
	app.http().io();
	// configuration ===========================================
	var port = process.env.PORT || 8080;
	app.configure(function() {
		app.use(express.static(__dirname + '/public')); 	
		//set the static files location /public/img will b /img for users
		app.use(express.logger('dev')); // log every request to the console
		app.use(express.bodyParser()); //pull into POST
		app.use(express.basicAuth(‘hda’, 'hda'));
	});

	// routes ==================================================
	require('./routes.js')//(app); // configure our routes

	// start app ===============================================
	app.listen(port);// startup our app at http://localhost:8080
	exports = module.exports = app;// expose app

