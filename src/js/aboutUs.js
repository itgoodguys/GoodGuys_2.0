
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

letters.forEach((letter, index) => {
   // Generate random positions for X and Y within the specified ranges
   const randomY = gsap.utils.random(-100, 100, 1) * window.innerHeight / 100;
   const randomX = gsap.utils.random(-100, 100, 1) * window.innerWidth / 100;

  gsap.fromTo(
    letter,
    {
      y: randomY,       // Start from a random Y position
      x: randomX,       // Start from a random X position
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

