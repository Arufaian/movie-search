$(".search-button").click(function () {
  const inputKey = $(".input-key").val();
  let showKey = showSearchValue(inputKey);

  $.ajax({
    url: "https://www.omdbapi.com/?apikey=7981eb16&s=" + inputKey,

    success: (result) => {
      $(".movie-search-key").html(showKey);

      const movies = result.Search;
      let cards = "";
      movies.forEach((movie) => {
        cards += showCards(movie);
      });

      $(".movies-container").html(cards);

      $(".modal-detail-button").click(function () {
        //   console.log($(this).data("imdbid"));
        $.ajax({
          url: `https://www.omdbapi.com/?apikey=7981eb16&i=` + $(this).data("imdbid"),
          success: (m) => {
            let movieDetails = showMovieDetails(m);
            $(".modal-body").html(movieDetails);
          },
        });
      });
    },
    error: (e) => {
      console.log(e.responseText);
    },
  });
});

function showCards(movie) {
  return `<div class="col-md-4 col-sm-6 my-3">
  <div class="card">
      <img src="${movie.Poster}" class="card-img-top" />
      <div class="card-body">
      <h5 class="card-title">${movie.Title}</h5>
      <h6 class="card-subtitle mb-2 text-body-secondary">${movie.Year}</h6>
      <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailsModal" data-imdbid="${movie.imdbID}">Selengkapnya</a>
      </div>
  </div>
  </div>`;
}

function showMovieDetails(m) {
  return `<div class="container-fluid">
    <div class="row">
        <div class="col-md-3">
        <img src="${m.Poster}" alt="" class="img-fluid" />
        </div>

        <div class="col-md">
        <ul class="list-group">
            <li class="list-group-item"><h4>${m.Title} ${m.Year}</h4></li>
            <li class="list-group-item"><strong>Director: </strong>${m.Director}</li>
            <li class="list-group-item"><strong>Actors: </strong>${m.Actors}</li>
            <li class="list-group-item"><strong>IMDB rating: </strong>${m.imdbRating}</li>
            <li class="list-group-item"><strong>Plot: </strong>${m.Plot}</li>
        </ul>
        </div>
    </div>
    </div>`;
}

function showSearchValue(inputKey) {
  return `<div class="col">
            <h2>your search "${inputKey}"</h2>
          </div>`;
}
