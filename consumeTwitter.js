var twitter = require('ntwitter');
var https = require('https');
var mongoHandle = require('./mongoHandle');
var privates = require('./privates');


var twit = new twitter({
  consumer_key: privates.consumer_key,
  consumer_secret: privates.consumer_secret,
  access_token_key: privates.access_token_key,
  access_token_secret: privates.access_token_secret
});

twit.verifyCredentials(function (err, data) {
  console.log("success");
});

twit.stream('statuses/filter', {locations: '-122.75,36.8,-121.75,37.8', language:'en'}, function(response) {
  var body ='';
  response.on("data",function(chunk) {
   //var tweet = JSON.parse(chunk);
    console.log("tweet" + chunk.text);
  });

  response.on("end",function(){
    console.log('Disconnected');
  });
});