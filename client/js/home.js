window.addEventListener("load", async ()=>{
    showData() 
})


const getCategories = async function () {
    try {
        const access_token = JSON.parse(localStorage.getItem("client_token"))
        const options = {
            method:"GET",
            headers: { 
                  "Authorization":`Bearer ${access_token}`,
                  "Content-Type":"application/json"
            }
        }
        let response = await fetch('https://api.sarkhanrahimli.dev/api/filmalisa/categories', options)
        if(response.ok){
            let resData = await response.json();
            return resData.data
        }
        
    } catch (error) {
        console.log(error)
    }
}


const getMovies = async function () {
  try {
    const access_token = JSON.parse(localStorage.getItem("client_token"))
    const options = {
        method:"GET",
        headers: { 
              "Authorization":`Bearer ${access_token}`,
              "Content-Type":"application/json"
        }
    }
    let response = await fetch('https://api.sarkhanrahimli.dev/api/filmalisa/movies', options)
    if(response.ok){
        let resData = await response.json();
        return resData.data
    }
    
} catch (error) {
    console.log(error)
}
}

const renderCategories = async function () {
    const categories = await getCategories()
    const sectionsContainer = document.querySelector(".main-content")
    if(categories && categories.length){
        categories.forEach((category, index) => {
            const section = document.createElement("section");
            section.classList.add("main");
            let containerClassName = index % 2 == 0 ? 'firstSwiper' : 'secondSwiper'  
            if(!category.movies || !category.movies.length)return
           
            section.innerHTML = `
              <div class="header">
                <h1>${category.name}</h1> <span><i class='bx bxs-chevron-right'></i></span>
              </div>
              <main class="swiper-container ${containerClassName}">
                <div class="swiper">
                  <div class="swiper-wrapper">
                    ${category.movies
                      .map(
                        (movie) => {
                        let star = movie.imdb;
                        if (movie.imdb > 5) star = 5;
                       return `
                      <div class="swiper-slide" onclick='goFilmDetailPage("${movie.id}")'>
                        <div class="slide-content">
                          <img src="${movie.cover_url}" alt="${movie.title}">
                          <div class="slide-overlay">
                            <div class="slide-info">
                              <span class="category">${movie.category.name}</span>
                              <div class="rating">${"★".repeat(star)}</div>
                              <h4 class="title">${movie.title}</h4>
                            </div>
                            <a class="watch-now" onclick='watchMovieFragman("${movie.fragman}")'>Watch Now ></a>
                          </div>
                        </div>
                      </div>
                    `}
                      )
                      .join('')}
                  </div>
                </div>
              </main>
            `;
        
            sectionsContainer.appendChild(section);
        
            new Swiper(section.querySelector(".firstSwiper .swiper"), {
                slidesPerView: 3,
                spaceBetween: 20,
                pagination: {
                  el: ".swiper-pagination",
                  clickable: true,
                },
                breakpoints: {
                  320: {
                    slidesPerView: 1, // Telefon ekranlarında 1 slide
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 2, 
                    spaceBetween: 15,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                  },
                  1440: {
                    slidesPerView: 4, 
                    spaceBetween: 10,
                  },
                },
              });
              new Swiper(section.querySelector(".secondSwiper .swiper"), {
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




const renderMovies = async function () {
  const movies = await getMovies()
  const slidersContent = document.querySelector(".home-carousel .swiper-wrapper")
  
  if(movies && movies.length){
    let html = ``
    for (let i = 0; i < 5; i++) {
      const movie = movies[i]
      let star = movie.imdb;
      if (movie.imdb > 5) star = 5;
      html += `
      <div class="swiper-slide">
                <div class="slide-content">
                  <img src="${movie.cover_url}" alt="slide" />
                  <div class="content">
                    <div class="categoryName">${movie.category.name}</div>
                    <div class="favorite-stars">
                    ${'<span> <i class="bx bxs-star"></i> </span>'.repeat(star)}
                    </div>
                    <p class="title">${movie.title}</p>
                    <p class="description">
                      ${movie.overview}
                    </p>
                    <a href="${movie.watch_url}" target="_blank" class="watchBtn">Watch now</a>
                  </div>
            </div>
      </div>
      `
    }
    slidersContent.innerHTML = html
    new Swiper('.home-carousel .swiper', {
      loop: true,
      centeredSlides: true,
      autoplay: {
        delay: 3200,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 1,
          spaceBetween: 0
        },
        1024: {
          slidesPerView: 1,
          spaceBetween: 0
        },
        1280: {
          slidesPerView: 1,
          spaceBetween: 0
        }
      }
    });
  }
    
}

function goFilmDetailPage(id) {
  window.location.href = "film-detail.html#"+id
}

function watchMovieFragman(fragmanLink) {
  let frame = document.querySelector(".yt-iframe")


  let videoId = fragmanLink.split('/').pop().split('?')[0];

  let embedUrl = `https://www.youtube.com/embed/${videoId}`;
  frame.src = embedUrl

  modalElement.classList.add("show")
}







async function showData() {
    renderCategories()
    renderMovies()
}