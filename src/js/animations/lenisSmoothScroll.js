
import '../../css/animations/_lenis-smooth-scroll.scss'

import Lenis from 'lenis';

const lenis = new Lenis({
  lerp: 0.1,
  wheelMultiplier: 0.9,
  infinite: false,
  guestureOrientation: 'vertical',
  normalizeWheel: false,
  smoothTouch: false
})
  
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)


// da bi ti radilo smooth scroll na anchor linkovima, moras onda da dodas ovo
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault()

    const targetId = this.getAttribute('href').substring(1)
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      lenis.scrollTo(targetElement, { offset: 0, duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    }
  })
})



export { lenis };



// scroll is not working on other elements, this is the fix
const navInnerLinks = document.querySelectorAll('[data-lenis-prevent]');

// Loop through each element and add the event listener
navInnerLinks.forEach(element => {
  element.addEventListener('wheel', (event) => {
    event.stopPropagation(); // Stop the event from propagating
  });

  element.addEventListener('mousedown', (event) => {
    event.stopPropagation(); // Stop the event from propagating for mousedown as well
  });

  element.addEventListener('mousemove', (event) => {
    event.stopPropagation(); // Stop the event from propagating for mousemove
  });

  element.style.touchAction = 'auto'; // Ensure touch-action is set to auto for touch devices
});


