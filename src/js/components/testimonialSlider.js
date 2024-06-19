// swiper docs
// https://swiperjs.com/get-started

// import Swiper JS
import Swiper from 'swiper';

// import Swiper styles
import 'swiper/css';

// import custom styling
import '../../css/components/_testimonial-slider.scss';

const screenWidth = window.innerWidth;
let testimonialSlider = new Swiper('.testimonials-slider', {
  direction: 'horizontal',
  slidesPerView: screenWidth < 767 ? 1.2 : 'auto',
  spaceBetween: screenWidth < 767 ? 8 : 24,
  // centeredSlides: true,
  // centeredSlidesBounds: true,
  initialSlide: 0,
  on: {
    slideChange: function () {
      updateActiveTestimonial();
    },
    init() {
      updateActiveTestimonial();
      // Select the last slide element
      const slides = this.slides;
      const lastSlide = slides[slides.length - 1];

      // Add the class 'empty-testimonial' to the last slide
      // need to create space for a real last slide to be opened on click
      if (lastSlide || secondLast) {
        lastSlide.classList.add('empty-testimonial');
      }
    },
    click() {
      // set clicked slide to be active slide
      testimonialSlider.slideTo(this.clickedIndex);
    },
  },
});

function updateActiveTestimonial() {
  // Remove the 'active-testimonial' class from all elements that have it
  document.querySelectorAll('.active-testimonial').forEach(element => {
      element.classList.remove('active-testimonial');
  });

  setTimeout(function(){ 
    // Add the 'active-testimonial' class to the currently active slide
    const activeSlide = document.querySelector('.testimonials-card.swiper-slide-active');
    if (activeSlide) {
      activeSlide.classList.add('active-testimonial');
    }
   }, 200);

}



    




