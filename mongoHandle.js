
exports.incWord = incWord;
exports.close = close;

var databaseUrl = "test"; // "username:password@example.com/mydb"
var collections = ["words"];
var db = require("mongojs").connect(databaseUrl, collections);

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

function close() {
  db.close();
}
