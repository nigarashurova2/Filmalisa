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



