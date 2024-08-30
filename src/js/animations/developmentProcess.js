import '../../css/animations/_development-process.scss';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Select the container, panels, and elements to update
const horizontalScroll = document.querySelector('.process_content');
const panels = document.querySelectorAll('.process_slide');
const process = document.querySelector('.process');
const pageWrapper = document.querySelector('.page-wrapper');
const slideNumbersTracks = document.querySelectorAll('.process_slide-numbers-track');

// Calculate the total width of the horizontal scroll content
const scrollWidth = horizontalScroll.scrollWidth;
const viewportWidth = process.offsetWidth;

// console.log('scrollWidth', scrollWidth);
// console.log('viewportWidth', viewportWidth);
// console.log('panels.length', panels.length);

// Function to update classes based on the active slide
function updateActiveSlideClasses(slideIndex) {
  slideNumbersTracks.forEach(track => {
    track.className = 'process_slide-numbers-track'; // Reset classes
    track.classList.add(`active-slide-${slideIndex + 1}`); // Add the new active class
  });
}

// Create the horizontal scroll animation
gsap.to(horizontalScroll, {
  x: () => -(scrollWidth - viewportWidth) + "px",
  ease: "none",
  scrollTrigger: {
    trigger: '.process',
    start: "top top",
    end: () => `+=${scrollWidth - viewportWidth}`,
    scrub: true,
    pin: true,
    anticipatePin: 1,
    snap: {
      snapTo: 1 / (panels.length - 1), // 0, 0.20, 0.4, 0.6, 0.8 based on number of panels
      snapTo: 1 / (panels.length - 1), //  based on number of panels
      duration: { min: 0.2, max: 0.6 }, // Duration range for the snapping
      ease: "power1.inOut" // Easing function for snapping
    },
    onUpdate: self => {
      const currentProgress = self.progress;
      const slideIndex = Math.round(currentProgress * (panels.length - 1));

      // Update the slide number track classes based on the current slide
      updateActiveSlideClasses(slideIndex);

      // Update page-wrapper class for the last slide
      // const lastPanelIndex = panels.length - 1;
      // const lastPanelStart = lastPanelIndex / panels.length;
      
      // if (currentProgress >= lastPanelStart) {
      //   pageWrapper.classList.add('dark-background');
      // } else {
      //   pageWrapper.classList.remove('dark-background');
      // }
    }
  }
});
