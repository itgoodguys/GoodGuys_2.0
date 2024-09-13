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
  
  // Get total slides and active slide index
  const totalSlides = adsSlider.slides.length;
  const activeIndex = adsSlider.activeIndex;

  // Apply opacity based on the active index
  if (activeIndex === 0) {
    prevButton.style.opacity = '0.5'; // First slide
  } else {
    prevButton.style.opacity = '1';
  }

  if (activeIndex === totalSlides - 1) {
    nextButton.style.opacity = '0.5'; // Last slide
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
          init() {
            updateButtonOpacity();
          },
          slideChange() {
            updateButtonOpacity();
          }
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
