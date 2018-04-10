var keys = require('./keys.js');

var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
// var spotify = require('spotify'); Used this originally 
var request = require('request');
var fs = require("fs");
var search = process.argv[3];
var spotify = new Spotify({
    id: 'f8f1d39b6952478fa3e860c4b0843907',
    secret: '88312f445037428baa1713855bee23f9'
    });


var getMyTweets = function(){
var client = new Twitter(keys.twitterKeys);
//  begining twitter
var params = {screen_name: 'fast47'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    // console.log(tweets);
    for(var i=0; i<tweets.length;i++) {
        console.log(tweets[i].created_at);
        console.log(' ');
        console.log(tweets[i].text);
    }
  }
});

}
// real begining to spotify
function getMeSpotify(search) {
    //console.log("Spotify function called.");
     if (search == null) {
        search = 'Work';
    }
    spotify.search({
    	type: 'track',
    	query: search 
    }, function(error, data) {
        if (error) {
        	console.log('Error occurred: ' + error);
        	return;
			}
            console.log('--------------------');
            console.log('Artist(s): ' + data.tracks.items[0].artists[0].name);
            console.log('Song Title: ' + data.tracks.items[0].name);
            console.log('Preview Link: ' + data.tracks.items[0].preview_url);
            console.log('Album: ' + data.tracks.items[0].album.name);
            console.log('--------------------');
    });
}
// end of spotify
// begining of imdb
var getMeMovie = function (movieName) {



    request("http://www.omdbapi.com/?t="+ movieName +"&y=&plot=short&apikey=2dbb522", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var jsonData = JSON.parse(body);
            console.log('Title: '+jsonData.Title);
            console.log('Year:'+jsonData.Year);
            console.log('Rated:'+jsonData.Rated);
            console.log('IMDB Rating:'+jsonData.imdbRating);
            console.log('Country:'+jsonData.Country);
            console.log('Language:'+jsonData.Language);
            console.log('Plot:'+jsonData.Plot);
            console.log('Actors:'+jsonData.Actors);
        

        }
    });
}
// end imdb
var doWhatItSays = function() {
fs.readFile("random.txt", "utf8", function(error, data) {
    if(error) throw error;
  var dataArr= data.split(',');

  if (dataArr.length == 2) {
      pick(dataArr[0],dataArr[i]);
  } else if (dataArr.length==1){
      pick(dataArr[0]);
  }
});
}
// begining of twitter
var pick = function(caseData, functionData) {
    switch(caseData) {
        case 'my-tweets' :
        getMyTweets();
        break;
        case 'spotify-this-song':
        getMeSpotify(search);
        break;
        case 'movie-this':
        getMeMovie(functionData);
        case 'do-what-it-says':
        doWhatItSays();
        break;

    default:
    console.log('LIRI does not understand!');
    }
}
var runThis = function(argOne, argTwo) {
    pick(argOne,argTwo);
};

runThis(process.argv[2],process.argv[3]);