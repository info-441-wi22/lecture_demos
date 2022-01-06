const fs = require('fs')

let files = fs.readdirSync("song_lyrics"); //read directory

console.log(files);

let fileData = fs.readFileSync("song_lyrics/" + files[5]); // read a file
console.log(fileData);

let fileString = fileData.toString(); // turn fileData into a readable version
console.log(fileString);