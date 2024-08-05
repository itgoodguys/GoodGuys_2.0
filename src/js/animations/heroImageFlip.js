
import gsap from 'gsap';
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Flip);
ScrollTrigger.normalizeScroll(true);

// SETUP ELEMENTS
const zoneEl = document.querySelectorAll("[js-scrollflip-element='zone']");
const targetEl = document.querySelector("[js-scrollflip-element='target']");

if (zoneEl.length > 0) {
  const firstZone = zoneEl[0];
  const firstZoneRect = firstZone.getBoundingClientRect();
  targetEl.style.width = `${firstZoneRect.width}px`;
  targetEl.style.height = `${firstZoneRect.height}px`;
  console.log('targetEl.style.width', firstZoneRect.width)
  console.log('targetEl.style.height', firstZoneRect.height)
}

// SETUP TIMELINE
let tl;
function createTimeline() {
  if (tl) {
    tl.kill();
    gsap.set(targetEl, { clearProps: "all" });
  }
  tl = gsap.timeline({
    scrollTrigger: {
      trigger: zoneEl[0],
      start: "center center",
      endTrigger: zoneEl[zoneEl.length - 1],
      end: "center center",
      scrub: true
    }
  });
  zoneEl.forEach((zone, index) => {
    let nextZoneEl = zoneEl[index + 1];
    if (nextZoneEl) {
      let nextZoneDistance = nextZoneEl.getBoundingClientRect().top + nextZoneEl.offsetHeight / 2;
      let thisZoneDistance = zone.getBoundingClientRect().top + zone.offsetHeight / 2;
      let zoneDifference = nextZoneDistance - thisZoneDistance;
      tl.add(
        Flip.fit(targetEl, nextZoneEl, {
          duration: zoneDifference / 1000, // Convert to seconds for duration
          ease: "power2.inOut"
        })
      );
    }
  });
}
createTimeline();

// SETUP RESIZE
let resizeTimer;
window.addEventListener("resize", function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    createTimeline();
  }, 250);
});
