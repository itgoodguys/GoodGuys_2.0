import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
// ScrollTrigger.normalizeScroll(true);

// ScrollTrigger.config({
//   limitCallbacks: true,
//   ignoreMobileResize: true,
// });

// Wrap the ScrollTrigger setup in a setTimeout to delay execution
setTimeout(() => {
  // Select all elements with the custom attribute "animate-from-bottom"
  const textBottomToTop = document.querySelectorAll('[animate-from-bottom="true"]');

  if (textBottomToTop.length > 0) {
    // Loop through each element and create an animation
    textBottomToTop.forEach(element => {
      gsap.fromTo(element, {
        y: 50, // Start 50px below the original position
        opacity: 0, // Start fully transparent
      }, {
        y: 0,
        opacity: 1, // Fully visible
        duration: 1, // Animation duration (in seconds)
        ease: "power2.out", // Easing for smooth effect
        scrollTrigger: {
          trigger: element, // Use the element as the trigger
          start: "top 95%", // Start the animation when the top of the element is 95% from the top of the viewport
          toggleActions: "play none none none", // Play only when scrolling down, do nothing on reverse
          // markers: true,
        },
      });
    });

    // Refresh ScrollTrigger after setup
    ScrollTrigger.refresh();
  }
}, 1000); // Delay execution by 1 second (adjust if necessary)
