var http = require("http");
var url = require('url');
var mongo = require('./mongoHandle');
var connect = require('connect'),
    directory = './static/';

var fake = [{"text":"people","size":100},{"text":"new followers","size":72},{"text":"... ...","size":71},{"text":"lol","size":70},{"text":"miley cyrus","size":69},{"text":"time","size":51},{"text":"gold coins","size":51},{"text":"amp","size":50},{"text":"good luck","size":48},{"text":"little party","size":47},{"text":"life","size":46},{"text":"new photo","size":42},{"text":"vevo record","size":35},{"text":"youtube music awards.","size":34},{"text":"new york","size":31},{"text":"justin bieber","size":30},{"text":"harry cyrus","size":30},{"text":"happy birthday","size":29},{"text":"fuck","size":29},{"text":"harry styles","size":27},{"text":"shit","size":27},{"text":"good night","size":26},{"text":"justinbieber","size":25},{"text":"gain 1k followers","size":25},{"text":"jets","size":25},{"text":"youtube video","size":24},{"text":"soml video","size":23},{"text":"lady gaga","size":23},{"text":"new video","size":23},{"text":"tony romo","size":22},{"text":"cowboys win","size":20},{"text":"good morning","size":20},{"text":"kingsland road","size":20},{"text":"wild ashton","size":20},{"text":"life video","size":20},{"text":"love","size":20},{"text":"best friend","size":20},{"text":"cowboys","size":19},{"text":"new york new","size":19},{"text":"little mix","size":19},{"text":"good thing","size":19},{"text":"david beckham","size":19},{"text":"taylor swift","size":18},{"text":"final score","size":18},{"text":"cowboysnation http://t.co/zmizxleevb","size":18},{"text":"stats","size":18},{"text":"riley cooper","size":18},{"text":"music video","size":18},{"text":"guys","size":17},{"text":"way","size":17},{"text":"thanks","size":17},{"text":"abc family","size":17},{"text":"ytma video","size":17},{"text":"darrel young","size":17},{"text":"christian ponder","size":16},{"text":"karl pilkington","size":16},{"text":"marcjacobsintl new makkke","size":16},{"text":"undefeated @ kcchiefs.","size":16},{"text":"followers","size":16},{"text":"best thing","size":16},{"text":"youtube app","size":15},{"text":"girls","size":15},{"text":"demi lovato","size":15},{"text":"long time","size":15},{"text":"girl","size":15},{"text":"night","size":15},{"text":"high school","size":15},{"text":"awkward moment","size":15},{"text":"youtube music awards","size":15},{"text":"best friends","size":15},{"text":"little bit","size":15},{"text":"school","size":15},{"text":"badday","size":15},{"text":"saints","size":14},{"text":"game","size":14},{"text":"good job","size":14},{"text":"happy 18th birthday","size":14},{"text":"best fans","size":14},{"text":"holy shit","size":14},{"text":"video","size":14},{"text":"kansas city chiefs","size":14},{"text":"andy reid","size":14},{"text":"badday hits","size":14},{"text":"ha http://t.co/uppitkagbq","size":14},{"text":"brad ausmus","size":14},{"text":"heart attack","size":13},{"text":"boys","size":13},{"text":"ytma artist","size":13},{"text":"best way","size":13},{"text":"sexy halloween costume","size":13},{"text":"real life","size":13},{"text":"taco bell","size":13},{"text":"person","size":13},{"text":"u,coz u g…","size":13},{"text":"daily stats","size":13},{"text":"nick foles","size":13},{"text":"cranky muffin","size":13},{"text":"san diego","size":12},{"text":"fake friends","size":12},{"text":"new album","size":12}]
paths = {'/getCloud':getCloud};

connect()
    .use(connect.static(directory))
    .use(handleReq)
    .listen(8000);

console.log('Listening on port 80.');

function handleReq(request, response) {
  var pathname = url.parse(request.url).pathname;
  if(paths[pathname]) {
    paths[pathname](request, response);
  }
}

function getCloud(req, res) {
  res.write(JSON.stringify(fake));
  res.end();
}
