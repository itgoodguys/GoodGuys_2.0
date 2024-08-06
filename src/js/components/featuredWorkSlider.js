// // import Swiper JS
import Swiper from 'swiper';

// // import Swiper styles
import 'swiper/css';
import '../../css/components/_featured-work-slider.scss'

let featuredWorkSlider;

featuredWorkSlider = new Swiper('.featured-slider', {
  slidesPerView: 'auto', // Adjust based on how many slides you want to show
  centeredSlides: true,
  spaceBetween: -100, // Adjust space between slides
  loop: true,
});
