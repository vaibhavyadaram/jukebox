var spotifyApi = new SpotifyWebApi();
let user
let playlistID

window.onload = function() {
  spotifyApi.setAccessToken(localStorage.getItem("spotifyToken"));
  spotifyApi.getMe().then(function(info) {
    user = info
    if (info) {
      document.querySelector("#login-button").style.display = "none"
      document.querySelector("#signout-button").style.display = "inline-block"

    } else {
      document.querySelector("#login-button").style.display = "inline-block"
      document.querySelector("#signout-button").style.display = "none"
    }
  })

  document.querySelectorAll('.button').forEach((element) => {
    element.addEventListener('click', changeGenre)
  })
}
document.querySelector('#submitBtn').addEventListener('click', sendOptions)
document.querySelector('#playPause').addEventListener('click', playPlaylist)
document.querySelector('#signout-button').addEventListener('click', signOut)



function changeGenre(element) {
  localStorage.setItem("genreSelect", element.target.value)
}

function signOut() {
  localStorage.setItem('spotifyToken', "");
  location.reload();
}

function playPlaylist() {
  spotifyApi.play({context_uri: localStorage.getItem('playlistURI'), device_id: localStorage.getItem('deviceID')})
}

function sendOptions(e) {
  let data;
  const genre = localStorage.getItem('genreSelect')
  const date = document.querySelector("#date").value
  data = JSON.stringify([genre, date])
  e.preventDefault();

  var request = new XMLHttpRequest();
  request.open('POST', "http://localhost:3000", true);
  request.setRequestHeader("Content-type", "text/plain");
  request.send(data);

  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      var songData = JSON.parse(request.response);

      var reformattedData = songData.map((element) => {
        if (element.artist.includes("Featuring")) {
          let artist = element.artist.split("Featuring")[0]
          console.log(artist)
          return `${element.title} ${artist}`

        } else {
        return `${element.title} ${element.artist}`
      }})

      spotifyApi.createPlaylist(user.id, {
        name: `${date} - ${genre}`
      }).then(function(data) {
        playlistID = data.id
        localStorage.setItem('playlistURI', data.uri)
        console.log(data.uri)


        reformattedData.forEach(function(song) {
          spotifyApi.searchTracks(song).then((data) => {
            spotifyApi.addTracksToPlaylist(user.id, playlistID, [data.tracks.items["0"].uri], function(err) {})
          })
        })


      }).catch(function(err) {
        console.log(err)
      })

    }
  }
}
