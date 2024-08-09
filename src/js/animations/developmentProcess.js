import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

$(".process").each(function () {
  let wrap = $(this);
  let track = $(this).find(".process_track");
  let inner = $(this).find(".process_inner");

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

  // Create a ScrollTrigger for each process_screen element
  wrap.find(".process_screen").each(function (index) {
    let screen = $(this);

    // Calculate the start position dynamically and convert to negative
    let startPosition = screen.offset().left - inner.offset().left;
    let start = `left ${-startPosition}px top`;

    console.log('index', index);

    // Create a ScrollTrigger for each screen
    ScrollTrigger.create({
      trigger: screen[0],
      start: start, // Use the negative start position
      end: "left+=50% center", // Adjust the end point as needed
      scrub: true,
      onEnter: () => {
        if (index % 2 === 0) {
          console.log('even enter', index);
          gsap.to(mediaImage, { maxWidth: "100%" });
          gsap.to(mediaContainer, { justifyContent: "flex-end" });
        } else {
          console.log('odd enter', index);
          gsap.to(mediaImage, { maxWidth: "33%" });
          gsap.to(mediaContainer, { justifyContent: "flex-start" });
        }
      },
      onLeaveBack: () => {
        if (index % 2 === 0) {
          console.log('even leave', index);
          gsap.to(mediaImage, { maxWidth: "100%" });
          gsap.to(mediaContainer, { justifyContent: "flex-end" });
          
        } else {
          console.log('odd leave', index);
          gsap.to(mediaImage, { maxWidth: "33%" });
          gsap.to(mediaContainer, { justifyContent: "flex-start" });
         
        }
      }
    });
  });
});
