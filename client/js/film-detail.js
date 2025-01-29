const elements = {
  overview: document.getElementById("overview"),
  imdb: document.getElementById("imdb"),
  title: document.getElementById("title"),
  coverImg: document.getElementById("coverImg"),
  episode: document.getElementById("episode"),
  categoryName: document.getElementById("categoryName"),
  castList: document.querySelector(".cast-list"),
  ytIframe: document.querySelector(".yt-iframe"),
  heroBanner: document.querySelector(".hero-banner"),
  coverImgLink: document.getElementById("coverImgLink"),
  addCommentForm: document.getElementById("addComment"),
  commentList: document.querySelector(".comment-list"),
  commentInput: document.getElementById("commentInput"),
  toggleFavorite: document.getElementById("toggleFavorite"),
  watchLink: document.querySelector(".watch-link"),
  moviesSlider: document.querySelector(".movies-slider"),
};

const fetchWithAuth = async (url, options = {}) => {
  const accessToken = JSON.parse(localStorage.getItem("client_token"));
  const defaultOptions = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(url, { ...defaultOptions, ...options });
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

const renderMovieDetails = (data) => {
  const {
    title,
    cover_url: coverUrl,
    fragman,
    watch_url: watchUrl,
    run_time_min: runTimeMin,
    imdb,
    category,
    actors,
    overview,
  } = data;
  let videoId = fragman.split("/").pop().split("?")[0];
  let embedUrl = `https://www.youtube.com/embed/${videoId}`;
  elements.overview.textContent = overview ?? "No overview available.";
  elements.imdb.textContent = imdb ?? "N/A";
  elements.title.textContent = title ?? "Untitled";
  elements.episode.textContent = runTimeMin ?? "Unknown";

  elements.ytIframe.src = embedUrl ?? "";
  elements.heroBanner.style.backgroundImage = `url(${coverUrl ?? ""})`;
  elements.categoryName.textContent = category?.name ?? "Uncategorized";
  // elements.coverImgLink.href = watchUrl ?? "#";
  elements.coverImg.src = coverUrl ?? "";
  elements.watchLink.href = watchUrl ?? "";

  elements.castList.innerHTML = actors?.length
    ? actors
        .map(
          ({ img_url: imgUrl, name, surname }) => `
          <div class="cast-item">
            <img src="${imgUrl}" alt="${name} ${surname}" />
            <div class="cast-info">
              <span class="actor-name">${name} ${surname}</span>
              <span class="character-name">${name} ${surname}</span>
            </div>
          </div>`
        )
        .join("")
    : "<p>No cast available.</p>";
};

const renderSimilarMovies = (data) => {
  if (!data.length) {
    elements.moviesSlider.innerHTML = "Similar movies not available";
    return;
  }

  elements.moviesSlider.innerHTML = data.map(
    ({
      cover_url: coverUrl,
      title,
      category: { name: categoryName },
      watch_url: watchUrl,
      imdb = 1,
      id
    }) => {
      let star = imdb;
      if (imdb > 5) star = 5;
      return `    <div class="movie-card" onclick='goFilmDetailPage("${id}")'>
      <img src="${coverUrl}" alt="${title}" />
      <div class="movie-overlay">
        <div class="movie-info">
          <span class="category">${categoryName}</span>
          <div class="rating">${"★".repeat(star)}</div>
          <h4>${title}</h4>
        </div>
        <a class="watch-now" href=${watchUrl} target="_blank">Watch Now  ></a>
      </div>
    </div>`;
    }
  );
};

const renderMovieComments = (comments) => {
  elements.commentList.innerHTML = comments
    .map((comment) => {
      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      const date = new Intl.DateTimeFormat("en-US", options).format(
        new Date(comment.created_at)
      );
      return ` <div class="comment">
  <div class="comment-content">
    <div class="comment-header">
      <div class="title">
        <img
          src="../assets/images/avatar.png"
          alt="user"
          class="comment-avatar"
        />
        <span class="username">Serkhan Rahimii</span>
      </div>
      <span class="time">${date}</span>
    </div>
    <p class="comment-text">
      ${comment.comment}
    </p>
  </div>
</div>`;
    })
    .join("");
};

const getMovieDetails = async (id) => {
  try {
    const data = await fetchWithAuth(
      `https://api.sarkhanrahimli.dev/api/filmalisa/movies/${id}`
    );
    const movieData = data.data;
    if (movieData) {
      renderMovieDetails(movieData);

      const category = movieData.category.id;
      if (category) {
        const similarMovies = await fetchWithAuth(
          `https://api.sarkhanrahimli.dev/api/filmalisa/movies/`
        );
        if (similarMovies.data.length) {
          const similarCategoryMovies = similarMovies.data.filter(
            (movie) =>
              movie.category.id === category && movie.id !== movieData.id
          );
          renderSimilarMovies(similarCategoryMovies);
        }
      }
    }
  } catch (error) {
    console.error("Error fetching movie details:", error.message);
  }
};

const getComments = async (id) => {
  try {
    const movieData = await fetchWithAuth(
      `https://api.sarkhanrahimli.dev/api/filmalisa/movies/${id}/comments`
    );

    if (movieData.data.length) {
      renderMovieComments(movieData.data);
    }
  } catch (error) {
    console.error("Error fetching movie comments", error.message);
  }
};

const addComment = async function (e) {
  e.preventDefault();
  const id = window.location.hash.split("#")[1];
  if (!id) return;

  const formData = [...new FormData(this)];
  const data = Object.fromEntries(formData);

  if (!Object.keys(data).length) return;

  try {
    await fetchWithAuth(
      `https://api.sarkhanrahimli.dev/api/filmalisa/movies/${id}/comment`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    Swal.fire({
      title: "Success",
      text: "Your comment added successfully",
      icon: "success",
      position: "center-center",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      getComments(id);
      elements.commentInput.value = "";
    });
  } catch (error) {
    console.error("Error adding comment:", error.message);
  }
};

const toggleFavorite = async function () {
  const id = window.location.hash.split("#")[1];
  if (!id) return;
  try {
    let data = await fetchWithAuth(
      `https://api.sarkhanrahimli.dev/api/filmalisa/movie/${id}/favorite`,
      {
        method: "POST",
      }
    );

    let check = data.message == "Successfully removed favorites";
    Swal.fire({
      title: check ? "Removed" : "Added",
      text: data.message,
      icon: check ? "error" : "success",
      position: "center-center",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    console.error("Eror adding favorite", error.message);
  }
};

const initializePage = () => {
  const id = window.location.hash.split("#")[1];
  if (!id) window.location.href = "404NotFound.html";
  if (id) {
    getMovieDetails(id);
    getComments(id);
  }
};

function goFilmDetailPage(id) {
  window.location.href = "film-detail.html#"+id
  location.reload();

}

elements.toggleFavorite.addEventListener("click", toggleFavorite);
elements.addCommentForm.addEventListener("submit", addComment);
window.addEventListener("load", initializePage);
