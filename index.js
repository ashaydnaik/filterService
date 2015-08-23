var express = require('express'),
    bodyParser = require('body-parser');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(function (error, req, res, next) {
  if (error) {
    sendError(res,"Could not decode request: JSON parsing failed");
  } else {
    next();
  }
});

app.get('/', function(req, res) {
  res.send('This app is now running.');
});

function sendError(res, message) {
  res.status(400);
  res.send({
    "error": message
  });
}

app.post('/', function(req, res, next) {
  var payload = req.body["payload"];

  if(!payload) {
    sendError(res,"Request must contain a payload.");
  } else {

    var filterResult = payload.filter(function(item){
      var drm = item["drm"];
      var episodeCount = item["episodeCount"];
      if(drm === true && episodeCount > 0) {
        return item;
      }
    });

    var mapResult = filterResult.map(function(item){
      return {
        "image" : item["image"].showImage,
        "slug" : item["slug"],
        "title" : item["title"]
      }
    });

    res.send({
      "response" : mapResult
    });
  }
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


