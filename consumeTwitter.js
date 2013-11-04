var twitter = require('ntwitter');
var https = require('https');
var mongoHandle = require('./mongoHandle');
var privates = require('./privates');
var alchemyapi = require('alchemyapi_node')

var city = 'nyc'
var twitterStr = 'statuses/sample';
var twitParams = {language:'en'};

if(city == 'nyc') {
  twitterStr = 'statuses/filter';
  twitParams = {language:'en',
              locations:'-74,40,-73,41'}
}


var twit = new twitter({
  consumer_key: privates.consumer_key,
  consumer_secret: privates.consumer_secret,
  access_token_key: privates.access_token_key,
  access_token_secret: privates.access_token_secret
});

twit.verifyCredentials(function (err, data) {
  console.log("success");
});

twit.stream(twitterStr, twitParams, function(response) {
  var body ='';
  var text = '';
  response.on("data",function(chunk) {
    console.log('textlength:' + text.length);
    if(text.length > 5000) {
      alchemyapi.keywords('text', text, {}, function(error, alchResp) {
        if(error) {
          console.log("error in alchemyapi:" + error);
        } else {
          if(alchResp['keywords']) {
            var keywords = alchResp['keywords'];
            for (var i = keywords.length - 1; i >= 0; i--) {
              if(keywords[i].text.length > 2) {
                var word = keywords[i].text.toLowerCase();
                mongoHandle.incWord(word, 'words', city);
              }
            };
          } 
          if(alchResp['entities']) {
            for (var i = alchResp['entities'].length - 1; i >= 0; i--) {
              var word = alchResp['entities'][i].text.toLowerCase();
              mongoHandle.incWord(word, 'words', city);
            };
          }
        }
      });
      text = '';
    } else {
      text = text + '\n' + chunk.text;
    }
  });

  response.on("error", function(err) {
    console.log('there was an error %j:', err);
    console.log('response %j', response);
  })

  response.on("end",function(){
    console.log('Disconnected');
  });
});