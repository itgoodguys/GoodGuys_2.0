

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