// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// $(".process").each(function () {
//   let wrap = $(this);
//   let track = $(this).find(".process_track");
//   let inner = $(this).find(".scroll_horizontal_inner");
//   let mediaImage = $(this).find(".process_media-image");
//   let firstSlide = $(this).find(".first-slide");

//   // Set section height
//   function setScrollDistance() {
//     wrap.css("height", "calc(" + track.outerWidth() + "px + 100vh)");
//   }
//   setScrollDistance();
//   ScrollTrigger.refresh();
//   window.addEventListener("resize", setScrollDistance);

//   // Create main horizontal scroll timeline
//   let tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: wrap,
//       start: "top top",
//       end: "bottom bottom",
//       scrub: true,
//     },
//     defaults: { ease: "none" },
//   });

//   tl.to(track, { xPercent: -100 });

//   function containerLeft() {
//     return inner.offset().left + "px";
//   }
//   // get container right position
//   function containerRight() {
//     return (inner.offset().left + inner.innerWidth()) + "px";
//   }

//     // Create the second timeline for scaling the image
//     let tl2 = gsap.timeline({
//         scrollTrigger: {
//           trigger: firstSlide,
//           start: "left " + containerLeft(),
//           end: "right " + containerRight(),
//           scrub: true,
//         },
//       });
    
//       // Scale the image from 33% to 100% and back
//       tl2.fromTo(mediaImage, { scale: 0.33 }, { scale: 1, ease: "none" })
//          .to(mediaImage, { scale: 0.33, ease: "none" });


// });
