var app = require('express.io')();
app.http().io();

var routes = require('./routes.js');
var mochad = require('./mochad.js');
var port = process.env.PORT || 8080;

app.configure(function() {
  app.use(express.static(__dirname + '/public'));
  app.use(express.logger('dev')); // log every request to the console
  app.use(express.bodyParser()); //pull into POST
  app.use(express.basicAuth(‘hda’, 'hda'));
});

app.listen(port);// startup our app at http://localhost:8080

GLOBAL.app = app;
GLOBAL.mochad = mochad;
