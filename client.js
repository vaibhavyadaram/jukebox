document.querySelector('#mainForm').addEventListener('submit', sendOptions)

function sendOptions(e) {
  let data;
  const genre = document.querySelector("#genre").value
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
      var output = document.querySelector("#output")
      songData.forEach(function(index) {
        output.innerHTML = output.innerHTML + `<p> ${index.title} -  ${index.artist}</p>`
      })
}}}
