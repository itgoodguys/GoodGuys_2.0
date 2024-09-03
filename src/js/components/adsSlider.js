

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