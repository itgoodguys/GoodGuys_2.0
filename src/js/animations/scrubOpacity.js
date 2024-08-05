import '../../css/animations/_scrubOpacity.scss'

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);


let typeSplit;

// Split the text up
// add data-attribute 'mask-text' to the element
function runSplit() {
  typeSplit = new SplitType("[data-attribute='mask-text']", {
    types: "lines, words"
  });
  $("[data-attribute='mask-text'] .word").append("<div class='line-mask'></div>");
  createAnimation();
}

runSplit();


// Create staggered animation
function createAnimation() {
  let allMasks = $("[data-attribute='mask-text'] .word").map(function() {
    return $(this).find(".line-mask");
  }).get();

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: "[data-attribute='mask-text']",
      start: "top 90%",
      end: "bottom 80%",
      scrub: 1
    }
  });

  tl.to(allMasks, {
    width: "0%",
    duration: 1,
    stagger: 0.5
  });
}

// ovo je druga varijanta gde ne koristimo pseudo element .line-mask
// vec samo manipulisemo sa opcitijem
// ova opcija nije toliko smooth

// // Function to initialize the scrub opacity animation
// function initializeScrubOpacityAnimation() {
//   // Select all elements with the scrubOpacity attribute
//   const elements = document.querySelectorAll('[scrubOpacity]');

//   // Loop through each element and apply the animation
//   elements.forEach(el => {
//     // Split the text into lines, words, and chars
//     let typeSplit = new SplitType(el, {
//       types: 'lines, words, chars',
//       tagName: 'span'
//     });

//     // Apply the GSAP animation
//     gsap.from(el.querySelectorAll('.word'), {
//       opacity: 0.2,
//       duration: 0.1,
//       ease: 'power1.out',
//       stagger: 0.1,
//       scrollTrigger: {
//         trigger: el,
//         start: 'top bottom',
//         end: "bottom center",
//         scrub: true
//       }
//     });
//   });
// }

// // Initialize the animation
// initializeScrubOpacityAnimation();
