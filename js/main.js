function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = parseInt((duration / 1000) % 60),
    minutes = parseInt((duration / (1000 * 60)) % 60),
    hours = parseInt((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return minutes + ":" + seconds;
}

;(function() {
	"use strict";

var request = new XMLHttpRequest(),
  url,
  data;

  var searchForm = document.querySelector(".ba-search-form"),
    searchInput = document.getElementById("search"),
    query,
    tuneTmpl = document.getElementById('tune-tmpl').innerHTML,
    tuneList = document.querySelector('.ba-tunes-list'),
    loader = document.querySelector('.ba-loader');


  searchForm.addEventListener('submit', function (event) {
    event.preventDefault(); // reset action by default

    loader.classList.add('active');

    query = searchInput.value;
    console.log(query);

    url = 'https://itunes.apple.com/search?term=' + query + '&limit=20';

    request.open("GET", url, true);
    request.send();

  });
  
  request.onload = function() {
  data = JSON.parse(this.response);
  console.log(data.results);

  tuneList.innerHTML = '';

  setTimeout(function() {

    loader.classList.remove('active');
  
    data.results.forEach(function(tune) {
      var duration = msToTime(tune.trackTimeMillis);

      console.log(tune);
      tuneList.innerHTML += tuneTmpl
        .replace(/{{artistName}}/gi, tune.artistName)
        .replace(/{{previewUrl}}/gi, tune.previewUrl)
        .replace(/{{collectionName}}/gi, tune.collectionName)
        .replace(/{{primaryGenreName}}/gi, tune.primaryGenreName)
        .replace(/{{collectionPrice}}/gi, tune.collectionPrice)
        .replace(/{{collectionViewUrl}}/gi, tune.collectionViewUrl)
        .replace(/{{duration}}/gi, duration)
        .replace(/{{artworkUrl100}}/gi, tune.artworkUrl100)
        .replace(/100x100/gi, "300x300")
        .replace(/{{trackName}}/gi, tune.trackName);
    });

  }, 800);

};

tuneList.addEventListener('click', function (event) {
  event.preventDefault();
  
  if(event.target.classList.contains('ba-play-btn')){
    console.log(event.target);

    var playBtn = event.target,
        audio = playBtn.parentNode.querySelector('audio');

        document.querySelectorAll('audio').forEach(function(el){
          el != audio ? el.pause() : ''; 
        });
        audio.paused ? audio.play() : audio.pause();

        // make play button pulse on play
        document
          .querySelectorAll(".ba-play-btn")
          .forEach(function(btn) {
            playBtn != btn ? btn.classList.remove("pulse") : "";
          });
        playBtn.classList.toggle("pulse");
  }

});

})();