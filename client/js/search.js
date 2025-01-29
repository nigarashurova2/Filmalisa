const searchBtn = document.querySelector(".searchBtn");
const searchInput = document.getElementById("searchInput");
const movieContainer = document.querySelector(".movies");
const debounceDelay = 300;

function showMessage(message) {
  movieContainer.innerHTML = message;
}
function renderMovies(movies) {
  movieContainer.innerHTML = movies
    .map(
      ({
        cover_url: coverUrl,
        title,
        category: { name: categoryName },
        watch_url: watchUrl,
        id
      }) =>
        `<div class="movie-card" onclick='goFilmDetailPage("${id}")'>
  <img src="${coverUrl}" alt="${title}" />
  <div class="movie-overlay">
    <div class="movie-info">
      <span class="category">${categoryName}</span>
      <div class="rating">★★★★★</div>
      <h4>${title}</h4>
    </div>
    <a class="watch-now" href='${watchUrl}' target='_blank'>Watch Now </a>
  </div>
</div>`
    )
    .join("");
}

async function getMovies() {
  const token = JSON.parse(localStorage.getItem("client_token"));
  const searchParam = searchInput.value.trim();
  const url = `https://api.sarkhanrahimli.dev/api/filmalisa/movies?search=${searchParam}`;

  try {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const resData = await response.json();
    if (resData.data.length) {
      renderMovies(resData.data);
    } else {
      showMessage("Not Found");
    }
  } catch (e) {
    showMessage("Error fetching movies");
  }
}

// function debounce(func, delay) {
//   let timerId;
//   return function (...args) {
//     clearTimeout(timerId);
//     timerId = setTimeout(() => func.apply(this, args), delay);
//   };
// }

// const debouncedGetMovies = debounce(getMovies, debounceDelay);

searchBtn.addEventListener("click", getMovies);

window.onload = function () {
  getMovies();
};

function goFilmDetailPage(id) {
  window.location.href = "film-detail.html#"+id
}