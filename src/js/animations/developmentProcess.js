import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

$(".process").each(function () {
  let wrap = $(this);
  let track = $(this).find(".process_track");

  // Set section height
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

  let mediaImage = document.querySelector(".process_media-image");
  let mediaContainer = document.querySelector(".process_media");

  // Create a timeline for each process_screen element
  wrap.find(".process_screen").each(function (index) {
    let screen = $(this);

    // Create a timeline for mediaImage's width animation
    let screenTl = gsap.timeline({
      scrollTrigger: {
        trigger: screen,
        start: "center center",
        end: "left+=50% center", // Adjust the end point as needed
        scrub: true,
        duration: 1,
      },
      defaults: { ease: "none" },
    });

    if (index % 2 === 0) {
      console.log('even')
      // Even index: maxWidth 33%, justify-content flex-start
      screenTl.to(mediaImage, { maxWidth: "33%" })
              .to(mediaContainer, { justifyContent: "flex-start" }, 0);
    } else {
      console.log('odd')
      // Odd index: maxWidth 100%, justify-content flex-end
      screenTl.to(mediaImage, { maxWidth: "100%" })
              .to(mediaContainer, { justifyContent: "flex-end" }, 0);
    }
  });
});
