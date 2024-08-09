import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

$(".process").each(function () {
  let wrap = $(this);
  let track = $(this).find(".process_track");
  let inner = $(this).find(".process_inner");

  // Set section height based on track width
  function setScrollDistance() {
    wrap.css("height", "calc(" + track.outerWidth() + "px + 100vh)");
  }
  setScrollDistance();
  ScrollTrigger.refresh();
  window.addEventListener("resize", setScrollDistance);

  // Create main horizontal scroll timeline
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: wrap,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
    },
    defaults: { ease: "none" },
  });

  tl.to(track, { xPercent: -100 });

  // Define trigger points as percentages of the total scroll distance
  const triggerPoints = [0, 0.1665, 0.333, 0.5, 0.6665, 0.833, 1];
  const totalScrollDistance = track.outerWidth();

  triggerPoints.forEach(point => {
    ScrollTrigger.create({
      trigger: wrap[0],
      start: `top ${-point * totalScrollDistance}px`, // Adjust for negative translation
      end: `top ${-point * totalScrollDistance + 1}px`, // Small end point to ensure trigger
      onEnter: () => {
        console.log(`Triggered at ${point * 100}% of scroll distance`);
        // Add your animation logic here
      },
      onLeaveBack: () => {
        console.log(`Leaving ${point * 100}% of scroll distance`);
        // Optional: Add your animation logic for leaving here
      }
    });
  });
});
