document.addEventListener("DOMContentLoaded", function () {

  const searchInput = document.getElementById("search__input");
  const moviesDiv = document.getElementById("movies");
  const loadingDiv = document.getElementById("loading");
  const sortSelect = document.getElementById("sortSelect");

  let movies = []; 

  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.trim();

    if (searchTerm.length < 2) {
      moviesDiv.innerHTML = "";
      return;
    }

    fetchMovies(searchTerm);
  });

  sortSelect.addEventListener("change", function () {
    displayMovies();
  });

  async function fetchMovies(searchTerm) {
    try {
      loadingDiv.textContent = "Loading...";
      moviesDiv.innerHTML = "";

      const response = await fetch(
        `https://www.omdbapi.com/?apikey=d8cfd282&s=${searchTerm}`
      );

      const data = await response.json();
      loadingDiv.textContent = "";

      if (data.Response === "True") {
        movies = data.Search; 
        displayMovies();
      } else {
        moviesDiv.innerHTML = "<p>No movies found.</p>";
      }

    } catch (error) {
      loadingDiv.textContent = "";
      moviesDiv.innerHTML = "<p>Error loading movies.</p>";
      console.error(error);
    }
  }

  function displayMovies() {

    let sortedMovies = [...movies];
    if (sortSelect.value === "az") {
      sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
    }

    if (sortSelect.value === "za") {
      sortedMovies.sort((a, b) => b.Title.localeCompare(a.Title));
    }

    const firstSix = sortedMovies.slice(0, 6);

    moviesDiv.innerHTML = firstSix.map(movie => `
      <div class="movie">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
        <img src="${movie.Poster !== "N/A" 
          ? movie.Poster 
          : "https://via.placeholder.com/200"}" 
          alt="${movie.Title}">
      </div>
    `).join("");
  }

});

let isModalOpen = false;

function contact(event) {
    event.preventDefault()
    const loading = document.querySelector('.modal__overlay--loading')
      const success = document.querySelector('.modal__overlay--success')
      loading.classList += " modal__overlay--visible"
     emailjs
        .sendForm(
            'service_78sivrc',
            'template_mw5wxlk',
            event.target,
           'GhA8jXNTSVE36AlQE'
        ).then(() => {
            loading.classList.remove("modal__overlay--visible")
            success.classList += " modal__overlay--visible"
        }).catch(() => {
            loading.classList.remove("modal__overlay--visible")
            alert(
                "The email service is temporarily unavailable. Please contact me directly at raquelledschoolcraft@gmail.com"
            )
        })
    }

    function toggleModal() {
        if (isModalOpen) {
            isModalOpen = false
            return document.body.classList.remove("modal--open")
        }
        isModalOpen = true
        document.body.classList += " modal--open"
    }
