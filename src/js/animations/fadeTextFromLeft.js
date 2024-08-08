import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

// Function to initialize animations
function initializeAnimations() {
  const fadeFromLeftElements = document.querySelectorAll("[fade-from-left='true']");

  fadeFromLeftElements.forEach((element) => {

    // If the element has the split-lines='true' attribute, split the text into lines
    if (element.hasAttribute('split-lines')) {
      const splitTypeInstance = new SplitType(element, { types: 'lines' });
      element = splitTypeInstance.lines;
    }

    // GSAP animation
    gsap.from(element, {
      opacity: 0,
      x: -100,
      duration: 1,
      stagger: 0.2,
      ease: "back.inOut",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        once: true, // This ensures the animation only plays once
      }
    });
  });
}

// Initialize the animations
initializeAnimations();
