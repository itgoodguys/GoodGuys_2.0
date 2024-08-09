import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

$(".process").each(function () {
  let wrap = $(this);
  let track = $(this).find(".process_track");
  let inner = $(this).find(".process_inner");
  let mediaImage = $(".process_media-image");
  let mediaContainer = $(".process_media");

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

  triggerPoints.forEach((point, index) => {
    const startPos = -point * totalScrollDistance;
    const endPos = -point * totalScrollDistance + 1;

    // Create ScrollTrigger for each trigger point
    ScrollTrigger.create({
      trigger: wrap[0],
      start: `top ${startPos}px`,
      end: `top ${endPos}px`,
      onEnter: () => {
        console.log('enter', index)
        handleEnter(index);
      },
      onLeaveBack: () => {
        console.log('leave', index)
        handleLeaveBack(index);
      }
    });
  });

  function handleEnter(index) {
    switch (index) {
      case 0:
        gsap.timeline()
          .to(mediaImage, { maxWidth: "100%" })
          .to(mediaContainer, { justifyContent: "flex-start" }, "+=1");
        break;
      case 1:
        gsap.timeline()
          .to(mediaImage, { maxWidth: "33%" })
          .to(mediaContainer, { justifyContent: "flex-start" }, "+=1");
        break;
      case 2:
        gsap.timeline()
          .to(mediaImage, { maxWidth: "100%" })
          .to(mediaContainer, { justifyContent: "flex-end" }, "+=1");
        break;
      case 3:
        gsap.timeline()
          .to(mediaImage, { maxWidth: "33%" })
          .to(mediaContainer, { justifyContent: "flex-end" }, "+=1");
        break;
      case 4:
        gsap.timeline()
          .to(mediaImage, { maxWidth: "100%" })
          .to(mediaContainer, { justifyContent: "flex-start" }, "+=1");
        break;
      case 5:
        gsap.timeline()
          .to(mediaImage, { maxWidth: "33%" })
          .to(mediaContainer, { justifyContent: "flex-start" }, "+=1");
        break;
      case 6:
        gsap.timeline()
          .to(mediaImage, { maxWidth: "100%" })
          .to(mediaContainer, { justifyContent: "flex-end" }, "+=1");
        break;
      case 7:
        gsap.timeline()
          .to(mediaImage, { maxWidth: "33%" })
          .to(mediaContainer, { justifyContent: "flex-end" }, "+=1");
        break;
      // Repeat for additional cases if needed
      default:
        break;
    }
  }

  function handleLeaveBack(index) {
    switch (index) {
      case 0:
        gsap.timeline()
          .to(mediaContainer, { justifyContent: "flex-end" })
          .to(mediaImage, { maxWidth: "33%" }, "+=1");
        break;
      case 1:
        gsap.timeline()
          .to(mediaImage, { maxWidth: "100%" })
          .to(mediaContainer, { justifyContent: "flex-end" }, "+=1");
        break;
      case 2:
        gsap.timeline()
          .to(mediaContainer, { justifyContent: "flex-start" })
          .to(mediaImage, { maxWidth: "33%" }, "+=1");
        break;
      case 3:
        gsap.timeline()
          .to(mediaImage, { maxWidth: "100%" })
          .to(mediaContainer, { justifyContent: "flex-start" }, "+=1");
        break;
      case 4:
        gsap.timeline()
          .to(mediaContainer, { justifyContent: "flex-end" })
          .to(mediaImage, { maxWidth: "33%" }, "+=1");
        break;
      case 5:
        gsap.timeline()
          .to(mediaImage, { maxWidth: "100%" })
          .to(mediaContainer, { justifyContent: "flex-end" }, "+=1");
        break;
      case 6:
        gsap.timeline()
          .to(mediaContainer, { justifyContent: "flex-start" })
          .to(mediaImage, { maxWidth: "33%" }, "+=1");
        break;
      case 7:
        gsap.timeline()
          .to(mediaImage, { maxWidth: "100%" })
          .to(mediaContainer, { justifyContent: "flex-start" }, "+=1");
        break;
      // Repeat for additional cases if needed
      default:
        break;
    }
  }
});
