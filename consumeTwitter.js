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

twit.stream('statuses/filter', {language:'en', locations:'-180,-90,180,90'}, function(response) {
  var body ='';
  response.on("data",function(chunk) {
    var words = chunk.text.split(' ')
    for (var i = words.length - 1; i >= 0; i--) {
      mongoHandle.incWord(words[i]);
    };
  });

  response.on("error", function(err) {
    console.log('there was an error %j:', err);
    console.log('response %j', response);
  })

  response.on("end",function(){
    console.log('Disconnected');
  });
});