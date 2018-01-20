var billboard = require("billboard-top-100").getChart;

// date defaults to saturday of this week

billboard('hot-100', function(songs, err){
    if (err) console.log(err);
    console.log(songs); //prints array of top 100 songs
    console.log(songs[3]); //prints song with rank: 4
    console.log(songs[0].title); //prints title of top song
    console.log(songs[0].artist); //prints artist of top songs
    console.log(songs[0].rank) //prints rank of top song (1)
    console.log(songs[0].cover) //prints URL for Billboard cover image of top song
})
