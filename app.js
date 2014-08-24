express = require('express.io');
app = express().http().io();

app.configure(function() {
  app.use(express.static(__dirname + '/public'));
  //app.use(express.logger('dev')); // log every request to the console
  app.use(express.bodyParser()); //pull into POST
});

app.listen(8080);// startup our app at http://localhost:8080

app.get('/', function (req,res){
	res.sendfile(__dirname + '/index.html');
});

GLOBAL.app = app;
