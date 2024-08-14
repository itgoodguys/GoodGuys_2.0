import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.normalizeScroll(true);

// Select all elements with the custom attribute "animate-from-bottom"
const textBottomToTop = document.querySelectorAll('[animate-from-bottom="true"]');

if (textBottomToTop.length > 0) {
  // Loop through each element and create an animation
  textBottomToTop.forEach(element => {
    gsap.fromTo(element, {
      y: 50, // Start 50px below the original position
      opacity: 0, // Start fully transparent
    }, {
      y: 0, // End at the original position
      opacity: 1, // Fully visible
      duration: 1, // Animation duration (in seconds)
      ease: "power2.out", // Easing for smooth effect
      scrollTrigger: {
        trigger: element, // Use the element as the trigger
        start: "top 80%", // Start the animation when the top of the element is 80% from the top of the viewport
        end: "top 10%", // End when the top of the element reaches 10% from the top
        toggleActions: "play none none none", // Play only when scrolling down, do nothing on reverse
      }
    });
  });
}
