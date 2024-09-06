import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.normalizeScroll(true);

// Select all elements with the custom attribute "animate-from-bottom"
const textBottomToTop = document.querySelectorAll('[animate-from-bottom="true"]');

if (textBottomToTop.length > 0) {
  // Loop through each element and create an animation
  textBottomToTop.forEach(element => {
    let targets = element;


    // Check if the element has the data attribute 'animate-children-elements'
    if (element.hasAttribute('animate-children-elements')) {
      targets =  Array.from(element.children); // Convert HTMLCollection to an array
    }

    gsap.fromTo(targets, {
      y: 50, // Start 50px below the original position
      opacity: 0, // Start fully transparent
    }, {
      y: 0, // End at the original position
      opacity: 1, // Fully visible
      duration: 1, // Animation duration (in seconds)
      ease: "power2.out", // Easing for smooth effect
      stagger: targets.length > 1 ? 0.2 : 0, // Apply stagger only if it's a collection of elements
      scrollTrigger: {
        trigger: element, // Use the element as the trigger
        start: "top 95%", // Start the animation when the top of the element is 95% from the top of the viewport
        toggleActions: "play none none none", // Play only when scrolling down, do nothing on reverse
        // markers: true,
      },
      
    });
  });
}
