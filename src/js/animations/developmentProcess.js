import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const processElement = document.querySelector(".process");
const stickyElement = document.querySelector(".process_sticky");
const processHeight = processElement.offsetHeight;
const processMedia = document.querySelector(".process_media");
const stickyImage = document.querySelector(".process_media-image");
const slide1 = document.querySelector("#process_slide-1 .process_slide-left");
const slide1numbers = document.querySelector("#process_slide-1 .process_slide-numbers-track");
const slide2 = document.querySelector("#process_slide-2 .process_slide-right");
const slide2numbers = document.querySelector("#process_slide-2 .process_slide-numbers-track");
const slide3 = document.querySelector("#process_slide-3 .process_slide-left");
const slide3numbers = document.querySelector("#process_slide-3 .process_slide-numbers-track");
const slide4 = document.querySelector("#process_slide-4 .process_slide-right");
const slide4numbers = document.querySelector("#process_slide-4 .process_slide-numbers-track");

// Function to create a ScrollTrigger for a specific percentage and attach an animation
function createAnimationTrigger(percentage, animationCallback, leaveBackCallback) {
  const startOffset = percentage / 100 * processHeight;
  
  ScrollTrigger.create({
    trigger: stickyElement,
    start: () => `top+=${startOffset}px bottom`,
    end: () => `top+=${startOffset + 1}px bottom`, // Slight offset to make it a single trigger
    onEnter: () => {
      animationCallback(); // Call the animation when the trigger is reached
    },
    onLeaveBack: () => {
      if (leaveBackCallback) leaveBackCallback(); 
    }
  });
}
//insert at the END of the most recently added animation
//tl.to(".class", { x: 100 }, ">");
//insert at the START of the most recently added animation
//tl.to(".class", { x: 100 }, "<");

// First animation (second trigger) - flex-start and then flex-end
createAnimationTrigger(28.57, () => {
  const timeline = gsap.timeline();

  timeline
    .to(stickyImage, {
      maxWidth: '100%',
      duration: 1,
      ease: "power2.out",
    })
    .to(slide1.children, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    }, "<")
    .to(processMedia, {
      justifyContent: 'flex-start',
      duration: 0.1
    }, ">0.5")
    .to(slide1numbers, {
      top: '-100%',
      duration: 0.2,
      ease: "power2.out",
    }, ">")
    .to(stickyImage, {
      maxWidth: '33%',
      duration: 0.4,
      ease: "power2.out",
    }, "<")
    .to(slide2.children, {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.2
    }, "<")
    .to(slide2numbers, {
      top: '-100%',
      duration: 1,
      ease: "power3.in",
    }, "<-0.2")
}, () => {
  // onLeaveBack animation
  const leaveBackTimeline = gsap.timeline();

  leaveBackTimeline
  .to(stickyImage, {
    maxWidth: '100%',
    duration: 1,
    ease: "power2.out",
  })
  .to(slide2.children, {
    opacity: 0,
    duration: 0.5,
    ease: "power2.out",
  }, "<")
  .to(processMedia, {
    justifyContent: 'flex-end',
    duration: 0.1
  }, ">0.5")
  .to(slide2numbers, {
    top: '0%',
    duration: 0.2,
    ease: "power2.out",
  }, ">")
  .to(stickyImage, {
    maxWidth: '33%',
    duration: 0.4,
    ease: "power2.out",
  }, "<")
  .to(slide1.children, {
    opacity: 1,
    duration: 0.8,
    ease: "power2.out",
    stagger: 0.2
  }, "<")
  .to(slide1numbers, {
    top: '0%',
    duration: 1,
    ease: "power3.in",
  }, "<-0.2")
});

// Second animation (third trigger) - flex-end and then flex-start
createAnimationTrigger(42.85, () => {
  const timeline = gsap.timeline();

  timeline
    .to(stickyImage, {
      maxWidth: '100%',
      duration: 1,
      ease: "power2.out",
    })
    .to(slide2.children, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    }, "<")
    .to(processMedia, {
      justifyContent: 'flex-end',
      duration: 0.1
    }, ">0.5")
    .to(slide2numbers, {
      top: '-200%',
      duration: 0.2,
      ease: "power2.out",
    }, ">")
    .to(stickyImage, {
      maxWidth: '33%',
      duration: 0.4,
      ease: "power2.out",
    }, "<")
    .to(slide3.children, {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.2
    }, "<")
    .to(slide3numbers, {
      top: '-100%',
      duration: 1,
      ease: "power3.in",
    }, "<-0.2")
}, () => {
  // onLeaveBack animation
  const leaveBackTimeline = gsap.timeline();

  leaveBackTimeline
    .to(stickyImage, {
      maxWidth: '100%',
      duration: 1,
      ease: "power2.out",
    })
    .to(slide3.children, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    }, "<")
    .to(processMedia, {
      justifyContent: 'flex-start',
      duration: 0.1
    }, ">0.5")
    .to(slide3numbers, {
      top: '-0%',
      duration: 0.2,
      ease: "power2.out",
    }, ">")
    .to(stickyImage, {
      maxWidth: '33%',
      duration: 0.4,
      ease: "power2.out",
    }, "<")
    .to(slide2.children, {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.2
    }, "<")
    .to(slide2numbers, {
      top: '-100%',
      duration: 1,
      ease: "power3.in",
    }, "<-0.2")
});

// Additional triggers
createAnimationTrigger(57.14, () => {
  const timeline = gsap.timeline();

  timeline
  .to(stickyImage, {
    maxWidth: '100%',
    duration: 1,
    ease: "power2.out",
  })
  .to(slide3.children, {
    opacity: 0,
    duration: 0.5,
    ease: "power2.out",
  }, "<")
  .to(processMedia, {
    justifyContent: 'flex-start',
    duration: 0.1
  }, ">0.5")
  .to(slide3numbers, {
    top: '-200%',
    duration: 0.2,
    ease: "power2.out",
  }, ">")
  .to(stickyImage, {
    maxWidth: '33%',
    duration: 0.4,
    ease: "power2.out",
  }, "<")
  .to(slide4.children, {
    opacity: 1,
    duration: 0.8,
    ease: "power2.out",
    stagger: 0.2
  }, "<")
  .to(slide4numbers, {
    top: '-100%',
    duration: 1,
    ease: "power3.in",
  }, "<-0.2")
}, () => {
  // onLeaveBack animation
  const leaveBackTimeline = gsap.timeline();

  leaveBackTimeline
    .to(stickyImage, {
      maxWidth: '100%',
      duration: 1,
      ease: "power2.out",
    })
    .to(slide4.children, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    }, "<")
    .to(processMedia, {
      justifyContent: 'flex-end',
      duration: 0.1
    }, ">0.5")
    .to(slide4numbers, {
      top: '-0%',
      duration: 0.2,
      ease: "power2.out",
    }, ">")
    .to(stickyImage, {
      maxWidth: '33%',
      duration: 0.4,
      ease: "power2.out",
    }, "<")
    .to(slide3.children, {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.2
    }, "<")
    .to(slide3numbers, {
      top: '-100%',
      duration: 1,
      ease: "power3.in",
    }, "<-0.2")
});

createAnimationTrigger(71.42, () => {
  // Add any additional animations for the fifth trigger
});

createAnimationTrigger(85.71, () => {
  // Add any additional animations for the sixth trigger
});

createAnimationTrigger(100, () => {
  // Add any additional animations for the seventh trigger
});
