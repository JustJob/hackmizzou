
exports.incWord = incWord;
exports.close = close;
exports.getData = getData;

var databaseUrl = "test"; // "username:password@example.com/mydb"
var collections = ["words"];
var db = require("mongojs").connect(databaseUrl, collections);

var HOW_MANY_WORDS = 100;

function incWord(pWord) {
  db.words.update({word:pWord}, {$inc: {freq : 1 }}, function(err, updated) {
    if(err) {
      console.log("error when updating " + pWord);
    } else if( !updated ) {
      db.words.insert({word:pWord, freq:1}, function(err, word) {
        if(err) {
          console.log("error on addition for " + pWord);
        } else {
          console.log("added word: " + pWord);
        }
      });
    } else {
      console.log(pWord + " updated");
    }
  });
}

function getData(callback) {
  db.words.find().sort({freq:-1}, function(err, words) {
    console.log("sorted the data");
    console.log("words length " + words.length)
    var data = [];
    for (var i = 0; i < HOW_MANY_WORDS && i < words.length; i++) {
      data.push({text:words[i].word, size:words[i].freq});
    };
    console.log('data is done %j', data);
    callback(data);
  });
}

function close() {
  db.close();
}
