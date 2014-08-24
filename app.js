app = require('express.io')();
app.http().io();

app.configure(function() {
  app.use(app.static(__dirname + '/public'));
  app.use(app.logger('dev')); // log every request to the console
  app.use(app.bodyParser()); //pull into POST
});

app.listen(80);// startup our app at http://localhost:80

app.get('/', function (req,res){
	res.sendfile(__dirname + '/index.html');
});

GLOBAL.app = app;
