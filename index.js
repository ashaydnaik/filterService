var express = require('express'),
    bodyParser = require('body-parser');

var app = express();

app.set('port', (process.env.PORT || 5000));

//app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// views is directory for all template files
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.send('This app is now running');
//  response.render('pages/index');
});

app.post('/filterService/', function(req, res, next) {
  var obj = req.body;
  obj["age"] = 25;
  res.send(obj);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


