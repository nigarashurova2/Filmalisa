const home_swiper = new Swiper('.home-carousel .swiper', {
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  effect: 'fade',
  fadeEffect: {
    crossFade: true, 
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


const action_swiper = new Swiper('.action-carousel .swiper', {
    loop: true,
    spaceBetween: 30,
   
    // pagination: {
    //   el: ".swiper-pagination",
    //   clickable: true,
    // },
    breakpoints: {
      500: {
            slidesPerView: 2,
            spaceBetween: 10
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 10
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 15
      },
      1280: {
        slidesPerView: 5,
        spaceBetween: 20
      }
    }
  });
  


const comedy_swiper = new Swiper('.comedy-carousel .swiper', {
    loop: true,
    spaceBetween: 30,
   
    // pagination: {
    //   el: ".swiper-pagination",
    //   clickable: true,
    // },
    breakpoints: {
      500: {
            slidesPerView: 1,
            spaceBetween: 0
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 0
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 0
      },
      1280: {
        slidesPerView: 3,
        spaceBetween: 0
      }
    }
  });

