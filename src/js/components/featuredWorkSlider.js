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
  on: {
    slideChange: function () {
      updateSlideContent(this.realIndex);
    }
  }
});

// Function to update the slide content
function updateSlideContent(activeIndex) {
  const titles = document.querySelectorAll('.featured-slider_info-title-link');
  const texts = document.querySelectorAll('.featured-slider_info-text');

  updateElements(titles, activeIndex);
  updateElements(texts, activeIndex);
}

// Function to update the elements
function updateElements(elements, activeIndex) {
  elements.forEach((element, index) => {
    if (index === activeIndex) {
      element.classList.add('active-name');
      element.style.transition = 'top 0.5s ease';
      element.style.top = '0'; // Move the new active slide to the visible area
    } else if (element.classList.contains('active-name')) {
      element.classList.remove('active-name');
      element.style.transition = 'top 0.5s ease';
      element.style.top = '-100%'; // Move the last active slide up
      setTimeout(() => {
        element.style.transition = 'none';
        element.style.top = '100%'; // Reset position after transition
      }, 500); // Match the transition duration
    }
  });
}



// Initial title setup
updateSlideContent(featuredWorkSlider.realIndex);
