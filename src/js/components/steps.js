// Import custom styling
import '../../css/components/_steps.scss';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.normalizeScroll(true);

// Select all SVG paths with the class name 'steps_line'
const paths = document.querySelectorAll('.step_line');

// Check if any elements are found
if (paths.length > 0) {
  // Loop through each path and create the animation
  paths.forEach(path => {
    const pathLength = path.getTotalLength();
    
    // Determine if the path should fill from right to left by checking a custom attribute or class
    const fillDirection = path.classList.contains('fill-reverse') ? -1 : 1;

    gsap.fromTo(path, 
      {
        strokeDasharray: pathLength, // Set the strokeDasharray to the length of the path
        strokeDashoffset: fillDirection * pathLength // Start with the stroke hidden, reverse for right to left
      },
      {
        strokeDashoffset: 0, // Fill the stroke by reducing dashoffset to 0
        scrollTrigger: {
          trigger: path, // Trigger the animation when the path is in view
          start: "top 60%", // Start the animation when the top of the SVG is 60% from the top of the viewport
          end: "top 20%", // End the animation when the top of the SVG is 20% from the top
          scrub: true, // Smoothly animate in sync with the scroll position
        }
      }
    );
  });
}

// Select all elements with the class name 'step'
const steps = document.querySelectorAll('.step');

if (steps.length > 0) {
  // Loop through each 'step' element and create the animation
  steps.forEach(step => {
    // Select all child elements of the current 'step' element
    const childElements = step.children;

    // Create the staggered animation for child elements
    gsap.fromTo(childElements, 
      {
        y: 50, // Start 50px below the original position
        opacity: 0, // Start fully transparent
      }, 
      {
        y: 0, // End at the original position
        opacity: 1, // Fully visible
        duration: 0.8, // Duration for each element's animation
        ease: "power2.out", // Easing for smooth effect
        stagger: 0.2, // Stagger delay of 0.2s between each child element
        scrollTrigger: {
          trigger: step, // Trigger the animation when the 'step' element is in view
          start: "top 60%", // Start the animation when the top of the 'step' element is 60% from the top of the viewport
          onEnter: () => {
            // Add the 'active-step' class when the animation starts
            let activeStep = document.querySelector('.active-step');
            if(activeStep){
              activeStep.classList.remove('active-step');
            }
            step.classList.add('active-step');
          },
          onLeaveBack: () => {
            // Remove the 'active-step' class when scrolling back up
            step.classList.remove('active-step');
          }
        }
      }
    );
  });
}
