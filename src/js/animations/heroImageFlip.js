import gsap from 'gsap';
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Flip);
ScrollTrigger.normalizeScroll(true);

// SETUP ELEMENTS
const zonesLeft = document.querySelectorAll("[js-scrollflip-element-left='zone']");
const targetLeft = document.querySelector("[js-scrollflip-element-left='target']");
const zonesRight = document.querySelectorAll("[js-scrollflip-element-right='zone']");
const targetRight = document.querySelector("[js-scrollflip-element-right='target']");
const videoWrapper = document.querySelector('.home-hero_video');
const videoElement = document.querySelector('.home-hero_video video');

// Function to create timeline for a set of elements
function createTimeline(zones, target) {
  let tl;
  if (tl) {
    tl.kill();
    gsap.set(target, { clearProps: "all" });
  }

  const originalClipPath = target.style.clipPath || '';

  tl = gsap.timeline({
    scrollTrigger: {
      trigger: zones[0],
      start: "center center",
      endTrigger: zones[zones.length - 1],
      end: "top 30%",
      scrub: true,
      onUpdate: (self) => {
        if (self.direction === 1 && self.progress > (1 / zones.length)) {
          target.style.clipPath = 'none';
        } else if (self.direction === -1 && self.progress <= (1 / zones.length)) {
          target.style.clipPath = originalClipPath;
        }
      },
      onLeave: () => {
        gsap.to(target, { opacity: 0, duration: 0.5 });
        gsap.to(videoWrapper, { opacity: 1, duration: 0.5, onComplete: () => videoElement.play() });
      },
      onEnterBack: () => {
        gsap.to(videoWrapper, { opacity: 0, duration: 0.5, onComplete: () => videoElement.pause() });
        gsap.to(target, { opacity: 1, duration: 0.5 });
      }
    }
  });

  zones.forEach((zone, index) => {
    let nextZone = zones[index + 1];
    if (nextZone) {
      let nextZoneDistance = nextZone.getBoundingClientRect().top + nextZone.offsetHeight / 2;
      let thisZoneDistance = zone.getBoundingClientRect().top + zone.offsetHeight / 2;
      let zoneDifference = nextZoneDistance - thisZoneDistance;
      tl.add(
        Flip.fit(target, nextZone, {
          duration: zoneDifference / 1000, // Convert to seconds for duration
          ease: "power2.inOut"
        })
      );
    } else {
      const firstZone = zones[0];
      const firstZoneRect = firstZone.getBoundingClientRect();
      target.style.width = `${firstZoneRect.width}px`;
      target.style.height = `${firstZoneRect.height}px`;
    }
  });
}

// Initialize timelines for both sets of elements
createTimeline(zonesLeft, targetLeft);
createTimeline(zonesRight, targetRight);

// SETUP RESIZE
let resizeTimer;
window.addEventListener("resize", function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    createTimeline(zonesLeft, targetLeft);
    createTimeline(zonesRight, targetRight);
  }, 250);
});
