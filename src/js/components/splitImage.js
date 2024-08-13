import gsap from 'gsap';
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Flip);
ScrollTrigger.normalizeScroll(true);

// SETUP ELEMENTS
const travelZoneLeft = document.querySelectorAll("[split-image-left='zone']");
const targetImageLeft = document.querySelector("[split-image-left='target']");
const travelZoneRight = document.querySelectorAll("[split-image-right='zone']");
const targetImageRight = document.querySelector("[split-image-right='target']");


// Function to create timeline for a set of elements
function splitTimeline(zones, target) {
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
splitTimeline(travelZoneLeft, targetImageLeft);
splitTimeline(travelZoneRight, targetImageRight);

// SETUP RESIZE
let resizeTimer;
window.addEventListener("resize", function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    splitTimeline(travelZoneLeft, targetImageLeft);
    splitTimeline(travelZoneRight, targetImageRight);
  }, 250);
});


// Select all elements with the custom attribute "animate-from-bottom"
const textBottomToTop = document.querySelectorAll('[animate-from-bottom="true"]');

// Loop through each element and create an animation
textBottomToTop.forEach(element => {
  gsap.fromTo(element, {
    y: 50, // Start 50px below the original position
    opacity: 0, // Start fully transparent
  }, {
    y: 0, // End at the original position
    opacity: 1, // Fully visible
    duration: 1, // Animation duration (in seconds)
    ease: "power2.out", // Easing for smooth effect
    scrollTrigger: {
      trigger: element, // Use the element as the trigger
      start: "top 80%", // Start the animation when the top of the element is 80% from the top of the viewport
      end: "top 20%", // End when the top of the element reaches 20% from the top
      toggleActions: "play reverse play reverse", // Play forward and reverse based on scroll
    }
  });
});