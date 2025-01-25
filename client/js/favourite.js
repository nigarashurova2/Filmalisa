function renderFavouriteMovies(movies) {
  const swiperContainer = document.querySelector(".swiper-wrapper");

  swiperContainer.innerHTML = movies
    .map(({ cover_url: coverUrl, title, watch_url: watchUrl }) => {
      return ` <div class="swiper-slide">
    <div class="slide-content">
      <img
        src="${coverUrl}"
        alt="${title}"
      />
      <div class="slide-overlay">
        <div class="slide-info">
          <span class="category">Sci-Fi & Fantasy</span>
          <div class="rating">★★★★★</div>
          <h4 class="title">${title}</h4>
        </div>
        <a class="watch-now" href="${watchUrl}" target="_blank">Watch Now ></a>
      </div>
    </div>
    </div>`;
    })
    .join("");
}
async function getUserFavouriteMovies() {
  const accessToken = JSON.parse(localStorage.getItem("client_token"));

  try {
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(
      "https://api.sarkhanrahimli.dev/api/filmalisa/movies/favorites",
      options
    );
    const resData = await response.json();

    if (resData.data.length) {
      renderFavouriteMovies(resData.data);
    }
  } catch (e) {
    console.log(e);
  }
}

window.onload = function () {
  getUserFavouriteMovies();
};
