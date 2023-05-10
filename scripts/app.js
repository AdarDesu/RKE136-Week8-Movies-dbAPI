const movieTitle = document.querySelector(".movie-title");
const movieTitleModal = document.querySelector(".movie-title-modal")
const movieReleaseDate = document.querySelector(".movie-release-date");
const movieGenres = document.querySelector(".movie-genres");
const movieDuration = document.querySelector(".movie-duration");
const moviePoster = document.querySelector(".movie-poster");
const moviePosterModal = document.querySelector(".movie-poster-modal");
const movieQuote = document.querySelector(".movie-quote");
const movieOverview = document.querySelector(".movie-overview");
const footerYear = document.querySelector(".year");
const movieCard = document.querySelector(".movie-card");

window.onload = () => {
    
    let url = "https://api.themoviedb.org/3/movie/394326?api_key=21df2c343e7dde49f574347a9b252ec3";
    fetch(url)
        .then(response => {
            return response.json();
        })

        .then(data => {
            movieTitle.textContent = data.title;
            movieTitleModal.textContent = data.title;

            let date = new Date(data.release_date)
            movieReleaseDate.textContent = `${date.getFullYear()} ${data.production_countries[0].iso_3166_1}`;

            movieDuration.textContent = `${data.runtime} minutes`;
            movieQuote.textContent = data.tagline;
            movieOverview.textContent = data.overview;

            let posterUrl = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${data.poster_path}`;
            moviePoster.src = posterUrl;
            moviePoster.alt = `${data.title} poster`

            movieCard.style.backgroundImage = `linear-gradient(to right, #000000ee, 
            #000000bb 40%, #00000080 100%), url("https://www.themoviedb.org/t/p/original/${data.backdrop_path}")`

            let genresToDisplay = "";
            data.genres.forEach(genre => {
                genresToDisplay = genresToDisplay + `${genre.name}, `
            });

            let genresUpdated = genresToDisplay.slice(0, -2) + ".";
            movieGenres.textContent = genresUpdated;

            let currentYear = new Date().getFullYear();
            footerYear.textContent = currentYear;
        });
}

let modal = document.querySelector("#my-modal");
let colseBtn = document.querySelector(".close-btn");

moviePoster.addEventListener(("click"), () => {
    modal.style.display = "block";
    moviePosterModal.src = moviePoster.src;
});

colseBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if(event.target == modal){
        modal.style.display = "none";
    }
});