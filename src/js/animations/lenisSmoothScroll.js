
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