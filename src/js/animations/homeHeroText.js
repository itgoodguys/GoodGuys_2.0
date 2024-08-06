import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

// for this animation to work, wou need to add a data-attribute="fade-from-left"
// to the parent element that wraps all animated elements
// if there is a text taht you would like to split to lines, you need to add
// split-lines='true'

// Initialize SplitType
const splitTypeInstance = new SplitType("[split-lines='true']", { types: 'lines' });

// GSAP Animation for appearing from left
gsap.from("[data-attribute='fade-from-left'] > *", {
  opacity: 0,
  x: -100,
  duration: 1,
  stagger: 0.3,
  ease: "back.inOut",
  onComplete: () => {
    // Add ScrollTrigger animations after the initial animation completes
    gsap.to("[data-attribute='fade-from-left'] > *", {
      scrollTrigger: {
        trigger: "[data-attribute='fade-from-left']",
        start: "top 20%",
        toggleActions: "play none none reverse"
      },
      opacity: 0,
      x: -100,
      duration: 1,
      stagger: 0.3,
      ease: "back.inOut"
    });

    // ScrollTrigger animation for h1 lines
    gsap.to(splitTypeInstance.lines, {
      scrollTrigger: {
        trigger: "[data-attribute='fade-from-left']",
        start: "top 20%",
        toggleActions: "play none none reverse"
      },
      opacity: 0,
      x: -100,
      duration: 1,
      stagger: 0.2,
      ease: "back.inOut"
    });
  }
});

// GSAP Animation for h1 lines
gsap.from(splitTypeInstance.lines, {
  opacity: 0,
  x: -100,
  duration: 1,
  stagger: 0.2,
  ease: "power2.out"
});


const elemetRightToLeft = document.querySelector('[data-attribute="fade-from-right"]');

// Create GSAP animation
gsap.fromTo(elemetRightToLeft, 
  {
    opacity: 0,
    x: 100
  }, 
  {
    opacity: 1,
    x: 0,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: elemetRightToLeft,
      start: 'top 85%',  // 15% from the bottom
      end: 'top 20%',    // 20% from the top
      scrub: true
    }
  }
);