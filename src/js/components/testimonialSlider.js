// swiper docs
// https://swiperjs.com/get-started

// import Swiper JS
import Swiper from 'swiper';

// import Swiper styles
import 'swiper/css';

// import custom styling
import '../../css/components/_testimonial-slider.scss';


let testimonialSlider = new Swiper('.testimonials-slider', {
  direction: 'horizontal',
  slidesPerView: 'auto',
  spaceBetween: 24,
  // centeredSlides: true,
  // centeredSlidesBounds: true,
  initialSlide: 0,
  on: {
    init() {
      // Select the last slide element
      const slides = this.slides;
      const lastSlide = slides[slides.length - 1];

      // Add the class 'empty-testimonial' to the last slide
      // need to create space for a real last slide to be opened on click
      if (lastSlide) {
        lastSlide.classList.add('empty-testimonial');
      }
    },
    click() {
      // set clicked slide to be active slide
      testimonialSlider.slideTo(this.clickedIndex);

      setTimeout(() => {
        // Select the clicked slide element
        const clickedSlide = this.slides[this.clickedIndex];
        // Toggle the class 'active-testimonial' on the clicked slide
        if (clickedSlide.classList.contains('active-testimonial')) {
          clickedSlide.classList.remove('active-testimonial');
        } else {
          // Remove the class 'active-testimonial' from all slides
          this.slides.forEach(slide => slide.classList.remove('active-testimonial'));
          // Add the class 'active-testimonial' to the clicked slide
          clickedSlide.classList.add('active-testimonial');
        }
      }, 400);
    },
  },
});



    




