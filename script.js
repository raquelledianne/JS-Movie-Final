// Wait until the HTML page fully loads before running this code
document.addEventListener("DOMContentLoaded", function () {

  // Connects JavaScript to your HTML  
  const searchInput = document.getElementById("search__input");
  const moviesDiv = document.getElementById("movies");
  const loadingDiv = document.getElementById("loading");

  // Run this function every time the user types something
  // .value → gets what the user typed
  // .trim() → removes extra spaces
  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.trim();

    // Stop if less than 2 characters
    if (searchTerm.length < 2) {
      moviesDiv.innerHTML = "";
      return;
    }

    fetchMovies(searchTerm);
  });

  async function fetchMovies(searchTerm) {
    try {
      loadingDiv.textContent = "Loading...";
      moviesDiv.innerHTML = "";

      const response = await fetch(
        `https://www.omdbapi.com/?apikey=d8cfd282&s=${searchTerm}`
      );

      // This turns it into a JavaScript object you can use.
      const data = await response.json();

      loadingDiv.textContent = "";

        // Checking to see if movies exist (true vs false)
      if (data.Response === "True") {
        displayMovies(data.Search);
      } else {
        moviesDiv.innerHTML = "<p>No movies found.</p>";
      }

    } catch (error) {
      loadingDiv.textContent = "";
      moviesDiv.innerHTML = "<p>Error loading movies.</p>";
      console.error(error);
    }
  }

  function displayMovies(movies) {

    const firstSixMovies = movies.slice(0, 6);

    // Go through each movie one by one
    firstSixMovies.forEach(movie => {

    // This creates a new <div> in memory.
      const movieCard = document.createElement("div");
      movieCard.classList.add("movie");

      movieCard.innerHTML = `
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
        <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200"}" alt="${movie.Title}">
      `;

      // This puts the movie card inside your HTML so it appears on the website
      moviesDiv.appendChild(movieCard);
    });
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
