var twitter = require('ntwitter');
var https = require('https');
var mongoHandle = require('./mongoHandle');
var privates = require('./privates');
var badwords = require('./badwords').badwords


var twit = new twitter({
  consumer_key: privates.consumer_key,
  consumer_secret: privates.consumer_secret,
  access_token_key: privates.access_token_key,
  access_token_secret: privates.access_token_secret
});

twit.verifyCredentials(function (err, data) {
  console.log("success");
});

twit.stream('statuses/sample', {language:'en'}, function(response) {
  var body ='';
  var text = '';
  response.on("data",function(chunk) {
    var words = chunk.text.split(' ');
    for (var i = words.length - 1; i >= 0; i--) {
      if(words[i].length > 3 && validWord(words[i])) {
        mongoHandle.incWord(cleanWord(words[i]), "testwords");
      }
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

var bad = {}
for (var i = badwords.length - 1; i >= 0; i--) {
  bad[badwords[i]] = true;
};

function validWord(word) {
  if(bad[word])
    return false;
  else
    return true;
}

function cleanWord(word) {
  word = word.toLowerCase();
  word = word.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"")
  return word;
}