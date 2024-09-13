// swiper docs
// https://swiperjs.com/get-started

// import Swiper JS
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

// import custom styling
import 'swiper/css';
import 'swiper/css/navigation';
import '../../css/components/_ads-slider.scss'

let adsSlider;

function updateButtonOpacity() {
  const prevButton = document.querySelector('.ads-slider-prev');
  const nextButton = document.querySelector('.ads-slider-next');
  
  if (adsSlider.isBeginning) {
    prevButton.style.opacity = '0.5';
  } else {
    prevButton.style.opacity = '1';
  }

  if (adsSlider.isEnd) {
    nextButton.style.opacity = '0.5';
  } else {
    nextButton.style.opacity = '1';
  }
}

function initSwiper() {
  if (window.innerWidth > 767) {
    if (!adsSlider) {
      adsSlider = new Swiper('.ads-swiper', {
        modules: [Navigation],
        direction: 'horizontal',
        slidesPerView: 'auto',
        spaceBetween: 24,
        navigation: {
          nextEl: '.ads-slider-next',
          prevEl: '.ads-slider-prev',
        },
        on: {
          init: updateButtonOpacity,   // Update on init
          slideChange: updateButtonOpacity, // Update on slide change
        },
      });
    }
  } else if (adsSlider) {
    adsSlider.destroy(true, true);
    adsSlider = null;
  }
}

// Initialize Swiper on page load
initSwiper();

// Re-initialize Swiper on window resize
window.addEventListener('resize', initSwiper);
