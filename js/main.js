;(function() {
	"use strict";

var request = new XMLHttpRequest(),
  url,
  data;

  var searchForm = document.querySelector(".ba-search-form"),
    searchInput = document.getElementById("search"),
    query,
    tuneTmpl = document.getElementById('tune-tmpl').innerHTML,
    tuneList = document.querySelector('.ba-tunes-list');


  searchForm.addEventListener('submit', function (event) {
    event.preventDefault(); // reset action by default

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

  data.results.forEach(function(tune) {
    console.log(tune);
    tuneList.innerHTML += tuneTmpl
      .replace(/{{artistName}}/gi, tune.artistName)
      .replace(/{{artistName}}/gi, tune.artistName)
      .replace(/{{collectionName}}/gi, tune.collectionName)
      .replace(/{{primaryGenreName}}/gi, tune.primaryGenreName)
      .replace(/{{collectionPrice}}/gi, tune.collectionPrice)
      .replace(/{{collectionViewUrl}}/gi, tune.collectionViewUrl)
      .replace(/{{duration}}/gi, tune.trackTimeMillis)
      .replace(/{{artworkUrl100}}/gi, tune.artworkUrl100)
      .replace(/100x100/gi, "300x300")
      .replace(/{{trackName}}/gi, tune.trackName);

  });
};

})();