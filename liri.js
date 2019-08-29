require("dotenv").config();
var keys = require("./keys.js");

var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");

var command = process.argv[2];
var input = process.argv.slice(3).join(" ");

switch (command) {
    case "concert-this":
        concert();
    break;

    case "spotify-this-song":
        searchSpotify();
    break;

    case "movie-this":
        movie();
    break;

    case "do-what-it-says":
        doWork();
    break;
}


// Function for concert search
// function concert() {
//     var 
// }


// Function for Spotify search
function searchSpotify() {
    if (!input) {
        input = "The Sign Ace of Base";
        limit = 5;
    }
    console.log("==========================\nHere's your song info!")
    spotify.search({ type: 'track', query: input }, function(err, data) {
        if (err) {
          return console.log("Error occurred: " + err);
        }
        var songs = data.tracks.items;
      console.log("Artist: " + songs[0].artists[0].name + "\nSong Name: " + songs[0].name + "\nPreview URL: " + songs[0].preview_url + "\nAlbum: " + songs[0].album.name) 
      });
}


