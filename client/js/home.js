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
                        (movie) => `
                      <div class="swiper-slide" onclick='goFilmDetailPage("${movie.id}")'>
                        <div class="slide-content">
                          <img src="${movie.cover_url}" alt="${movie.title}">
                          <div class="slide-overlay">
                            <div class="slide-info">
                              <span class="category">${movie.category.name}</span>
                              <div class="rating">${"★".repeat(Math.floor(movie.rating))}</div>
                              <h4 class="title">${movie.title}</h4>
                            </div>
                            <a class="watch-now" onclick='watchMovieFragman("${movie.fragman}")'>Watch Now ></a>
                          </div>
                        </div>
                      </div>
                    `
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
   
}