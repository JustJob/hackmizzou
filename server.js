var http = require("http");
var url = require('url');
var mongo = require('./mongoHandle');
var connect = require('connect'),
    directory = './static/';

paths = {'/getCloud':getCloud};

connect()
    .use(connect.static(directory))
    .use(handleReq)
    .listen(80);

console.log('Listening on port 80.');

function handleReq(request, response) {
  var pathname = url.parse(request.url).pathname;
  if(paths[pathname]) {
    paths[pathname](request, response);
  }
  next(request, response);
}

function getCloud(req, res) {
  mongo.getData(function(data) {
    var largest = 0.0;
    for (var i = data.length - 1; i >= 0; i--) {
      if(data[i].size > largest) {
        largest = data[i].size
      }
    };
    for (var i = data.length - 1; i >= 0; i--) {
      data[i].size = 6 + ~~(data[i].size/largest * 94);
    };
    res.write(JSON.stringify(data));
    res.end();
  });
}