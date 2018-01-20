var billboard = require("billboard-top-100").getChart;

billboard('pop-songs', '2018-01-20', function(songs, err){
    if (err) console.log(err);

    for (rank = 0; rank <= 9; rank++) {

      var songArray = {
        billboardRank: rank + 1,
        title: songs[rank].title,
        artist: songs[rank].artist
      }

      console.log(songArray);

    }

});
