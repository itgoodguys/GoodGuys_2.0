
// CSS import
import '../css/about-us.scss'
import '../css/components/_cta.scss'

// JavaScript import
// components


// animations
import './animations/lenisSmoothScroll.js'


import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.normalizeScroll(true);

// Select all SVGs representing the letters
const letters = document.querySelectorAll('.logo-letter');
const stickyElement = document.querySelector('.about-hero_sticky');
const navbarLogo = document.querySelector('.navbar_logo-svg');

// Calculate the target position and scale of the stickyElement
const navbarLogoRect = navbarLogo.getBoundingClientRect();

// Define an array of 7 positions with x and y coordinates
const positions = [
  { x: -100, y: -50 },  // Position for the first letter
  { x: -50, y: -150 },    // Position for the second letter
  { x: 0, y: -100 },  // Position for the third letter
  { x: 250, y: -120 },  // Position for the fourth letter
  { x: 100, y: 50 },  // Position for the fifth letter
  { x: 20, y: 200 },  // Position for the sixth letter
  { x: 100, y: 100 }   // Position for the seventh letter
];

letters.forEach((letter, index) => {
  // Get the corresponding position from the array
  const { x, y } = positions[index % positions.length]; // Use modulo to prevent out-of-bounds access

  gsap.fromTo(
    letter,
    {
      y: y * window.innerHeight / 100, // Start from the specified Y position
      x: x * window.innerWidth / 100,  // Start from the specified X position
      scale: 6,         // Start with each letter scaled up
      opacity: 0        // Start with each letter invisible
    },
    {
      y: 0,             // Move the letter to its original position
      x: 0,             // Move the letter to its original X position
      scale: 1,         // Scale down to the original size
      opacity: 1,       // Fade in the letter
      stagger: 0.3, 
      scrollTrigger: {
        trigger: '.about-hero_trigger', // Trigger animation when .about-hero_trigger is in view
        start: `top ${90 - index * 5}%`,  // Dynamic start value based on index
        end: 'top 50%',             // End when the top of .about-hero_trigger is 20% from the top of the viewport
        scrub: 1,                   // Scrub smoothly with a duration of 1 second
      }
    }
  );

  // gsap.to(stickyElement, {
  //   x: navbarLogoRect.left - stickyElement.getBoundingClientRect().left,
  //   y: navbarLogoRect.top - stickyElement.getBoundingClientRect().top,
  //   scale: navbarLogoRect.width / stickyElement.offsetWidth,
  //   scrollTrigger: {
  //     trigger: '.about-hero_trigger', // Trigger the animation when stickyElement is in view
  //     start: 'top 50%',       // Start the animation at 50% scroll progress
  //     end: 'top 20%',         // End the animation at 20% scroll progress
  //     scrub: 1,               // Smoothly animate with scrolling
  //     onUpdate: (self) => {
  //       // Update the position and scale of the sticky element as the user scrolls
  //       gsap.set(stickyElement, {
  //         x: gsap.utils.interpolate(0, navbarLogoRect.left - stickyElement.getBoundingClientRect().left, self.progress),
  //         y: gsap.utils.interpolate(0, navbarLogoRect.top - stickyElement.getBoundingClientRect().top, self.progress),
  //         scale: gsap.utils.interpolate(1, navbarLogoRect.width / stickyElement.offsetWidth, self.progress),
  //       });
  //     }
  //   }
  // });
});

