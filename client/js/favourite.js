window.onload = function () {
  getUserFavouriteMovies();
};



const renderFavouriteMovies = async function (data) {
  const content = document.querySelector(".swiper-wrapper")
  if(data && data.length){
    data.forEach((movie, index) => {
          content.innerHTML += `
                    <div class="swiper-slide">
                      <div class="slide-content">
                        <img src="${movie.cover_url}" alt="${movie.title}">
                        <div class="slide-overlay">
                          <div class="slide-info">
                            <span class="category"></span>
                            <div class="rating">${"★".repeat(Math.floor(movie.rating))}</div>
                            <h4 class="title">${movie.title}</h4>
                          </div>
                          <a class="watch-now" onclick='watchMovieFragman("${movie.fragman}")'>Watch Now ></a>
                        </div>
                      </div>
                    </div>      
          `;
      
      
          
            new Swiper(document.querySelector(".swiper"), {
              slidesPerView: 3,
              spaceBetween: 20,
              pagination: {
                el: ".swiper-pagination",
                clickable: true,
              },
              breakpoints: {
                320: {
                  slidesPerView: 1, 
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 2, 
                  spaceBetween: 0,
                },
                1440: {
                  slidesPerView: 3, 
                  spaceBetween: 0,
                },
              },
            });

        });
  }
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
    console.log(resData.data)
    if (resData.data.length) {
      
      renderFavouriteMovies(resData.data);
    }
  } catch (e) {
    console.log(e);
  }
}



function watchMovieFragman(fragmanLink) {
  let frame = document.querySelector(".yt-iframe")

  // fragmanLink = "https://youtu.be/EP34Yoxs3FQ?si=42hXurs5CijaQpQu";

  let videoId = fragmanLink.split('/').pop().split('?')[0];

  let embedUrl = `https://www.youtube.com/embed/${videoId}`;
  frame.src = embedUrl

  modalElement.classList.add("show")
}