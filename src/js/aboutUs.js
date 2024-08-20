
// CSS import
import '../css/about-us.scss'
import '../css/components/_cta.scss'

// JavaScript import
// components
import './components/breadcrumbs.js'

// animations
import './animations/lenisSmoothScroll.js'
import './animations/fadeTextFromBottom.js'
import './animations/imageParallax.js'
import './animations/animateFromBottom.js'

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.normalizeScroll(true);

/************************************
hero logo animation
**************************************/ 

// Select all SVGs representing the letters
const letters = document.querySelectorAll('.logo-letter');
const stickyElement = document.querySelector('.about-hero_sticky');


// Define an array of 7 positions with x and y coordinates
const positions = [
  { x: -50, y: -50 },  // Position for the first letter
  { x: -150, y: -100 },    // Position for the second letter
  { x: 0, y: -150 },  // Position for the third letter
  { x: 250, y: -120 },  // Position for the fourth letter
  { x: 100, y: 50 },  // Position for the fifth letter
  { x: -20, y: 200 },  // Position for the sixth letter
  { x: -100, y: 100 }   // Position for the seventh letter
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
        trigger: '.about-hero', // Trigger animation when .about-hero_trigger is in view
        start: `center ${90 - index * 5}%`,  // Dynamic start value based on index
        end: 'center 50%',             // End when the top of .about-hero_trigger is 50% from the top of the viewport
        scrub: 1,                   // Scrub smoothly with a duration of 1 second
        // markers: true, // Enable markers to visualize trigger points
      }
    }
  );

  gsap.fromTo(stickyElement, 
    {
      maxWidth: "100vw", // Change this value to your desired max-width
      maxHeight: "100vh",
      opacity: 1  
    },
    {
    maxWidth: "75px", // Change this value to your desired max-width
    maxHeight: "59px", // Change this value to your desired max-height
    ease: "power2.inOut", // Easing function (optional)
    opacity: 0, 
    scrollTrigger: {
      trigger: '.about-hero', // Trigger the animation when stickyElement is in view
      start: 'center 40%',       // Start the animation at 50% scroll progress
      end: 'bottom 10%',         // End the animation at 20% scroll progress
      scrub: 1,               // Smoothly animate with scrolling
      // markers: true, // Enable markers to visualize trigger points
    }
  });
});


/************************************
blurScrollEffect
https://tympanus.net/Development/ScrollBlurTypography/
**************************************/
// Define the class for the Blur Scroll Effect
export class BlurScrollEffect {
  constructor(textElement) {
    // Check if the provided element is valid
    if (!textElement || !(textElement instanceof HTMLElement)) {
      throw new Error('Invalid text element provided.');
    }

    this.textElement = textElement;

    // Set up the effect for the provided text element
    this.initializeEffect();
  }

  // Sets up the initial text effect on the provided element
  initializeEffect() {
    // Split text for animation using SplitType and store the reference
    this.splitter = new SplitType(this.textElement, {
      types: 'words, chars', // Split into words and characters
    });

    // Trigger the initial scroll effect
    this.scroll();
  }

  // Animates text based on the scroll position
  scroll() {
    // Query all individual characters in the line for animation
    const chars = this.splitter.chars;

    gsap.fromTo(
      chars,
      {
        filter: 'blur(10px) opacity(40%)',
        willChange: 'filter',
      },
      {
        ease: 'none', // Animation easing
        filter: 'blur(0px) opacity(100%)',
        stagger: 0.05, // Delay between starting animations for each character
        scrollTrigger: {
          trigger: this.textElement, // Element that triggers the animation
          start: 'top bottom-=15%', // Animation starts when element hits the bottom of viewport
          end: 'bottom center+=15%', // Animation ends in the center of the viewport
          scrub: true, // Animation progress tied to scroll position
        },
      }
    );
  }
}

// Initialize the blur scroll effect
const init = () => {
  const effects = [
    { selector: '[blur-text-reveal]', effect: BlurScrollEffect },
  ];

  // Iterate over each effect configuration and apply the effect to all matching elements
  effects.forEach(({ selector, effect }) => {
    document.querySelectorAll(selector).forEach((el) => {
      new effect(el);
    });
  });
};

init();