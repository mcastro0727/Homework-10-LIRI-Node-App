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
        movieSearch();
        break;

    case "do-what-it-says":
        doWork();
        break;
};

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
    spotify.search({
        type: 'track',
        query: input
    }, function (err, data) {
        if (err) {
            return console.log("Error occurred: " + err);
        }
        var songs = data.tracks.items;
        console.log("Artist: " + songs[0].artists[0].name + "\nSong Name: " + songs[0].name + "\nPreview URL: " + songs[0].preview_url + "\nAlbum: " + songs[0].album.name)
    });
};

// Function for Movie search
function movieSearch() {
    if (!input) {
        input = "Mr. Nobody";
    }
    console.log("==========================\nHere's your movie info!")
    axios.get("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy")
    .then(function (response) {
        console.log("Movie Title: " + response.data.Title + "\nYear Released: " + response.data.Year + "\nIMBD Rating: " + response.data.imdbRating + "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\nCountry: " + response.data.Country + "\nLanguages: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors);
    });
};

// Function for Do What It Says
function doWork() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        };
        console.log(data);

        var dataArr = data.split(", ");
        console.log(dataArr[0]);
        console.log(dataArr[1]);

        command = dataArr[0];
        input = dataArr[1];

        switch (command) {
            case "concert-this":
                concert();
                break;

            case "spotify-this-song":
                searchSpotify();
                break;

            case "movie-this":
                movieSearch();
                break;

            case "do-what-it-says":
                doWork();
                break;
        };
    });
}