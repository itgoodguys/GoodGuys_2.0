import '../../css/animations/_development-process.scss';

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
const slide5 = document.querySelector("#process_slide-5");
const slide5numbers = document.querySelector("#process_slide-5 .process_slide-numbers-track");

// Shared promise to control the order of animations
let lastAnimation = Promise.resolve();

// Function to disable scroll
function disableScroll() {
    document.body.style.overflow = 'hidden'; 
    document.body.style.height = '100%';
}

// Function to enable scroll
function enableScroll() {
    document.body.style.overflow = '';
    document.body.style.height = '';
}

// Function to create a ScrollTrigger for a specific percentage and attach an animation
function createAnimationTrigger(percentage, animationCallback, leaveBackCallback) {
  const startOffset = percentage / 100 * processHeight;

  ScrollTrigger.create({
    trigger: stickyElement,
    start: () => `top+=${startOffset}px bottom`,
    end: () => `top+=${startOffset + 1}px bottom`, // Slight offset to make it a single trigger
    onEnter: () => {
      lastAnimation = lastAnimation.then(() => {
        return new Promise(resolve => {
          // Disable scroll at the start of the animation
          disableScroll();

          const timeline = gsap.timeline({
            onComplete: () => {
              // Re-enable scroll after the animation is complete
              enableScroll();
              resolve();
            }
          });

          animationCallback(timeline); // Call the animation and pass the timeline
        });
      });
    },
    onLeaveBack: () => {
      if (leaveBackCallback) {
        lastAnimation = lastAnimation.then(() => {
          return new Promise(resolve => {
            // Disable scroll at the start of the leaveBack animation
            disableScroll();

            const leaveBackTimeline = gsap.timeline({
              onComplete: () => {
                // Re-enable scroll after the leaveBack animation is complete
                enableScroll();
                resolve();
              }
            });

            leaveBackCallback(leaveBackTimeline); // Call the leaveBack animation and pass the timeline
          });
        });
      }
    }
  });
}

// First animation (second trigger) - flex-start and then flex-end
createAnimationTrigger(28.57, (timeline) => {
  timeline
    .to(stickyImage, {
      maxWidth: '100%',
      duration: 0.6,
      ease: "power2.out",
    })
    .to(slide1.children, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    }, "<")
    .to(processMedia, {
      justifyContent: 'flex-start',
    }, ">")
    .to(slide1numbers, {
      top: '-100%',
      ease: "power2.out",
    }, ">")
    .to(stickyImage, {
      maxWidth: '33%',
      duration: 0.2,
      ease: "power2.out",
    }, 0.6)
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
    }, "<-0.2");
}, (leaveBackTimeline) => {
  // onLeaveBack animation
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
    }, "<-0.2");
});

// Second animation (third trigger) - flex-end and then flex-start
createAnimationTrigger(42.85, (timeline) => {
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
    }, ">0.5")
    .to(slide2numbers, {
      top: '-200%',
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
    }, "<-0.2");
}, (leaveBackTimeline) => {
  // onLeaveBack animation
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
    }, "<-0.2");
});

// Additional triggers
createAnimationTrigger(57.14, (timeline) => {
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
    }, ">0.5")
    .to(slide3numbers, {
      top: '-200%',
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
    }, "<-0.2");
}, (leaveBackTimeline) => {
  // onLeaveBack animation
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
    }, ">0.5")
    .to(slide4numbers, {
      top: '0%',
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
    }, "<-0.2");
});


createAnimationTrigger(71.42, (timeline) => {
  timeline
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
  }, ">0.5")
  .to(slide4numbers, {
    top: '-200%',
    ease: "power2.out",
  }, ">")
  .to(stickyImage, {
    maxWidth: '0%',
    duration: 0.4,
    ease: "power2.out",
  }, "<")
  .to(slide5.children, {
    opacity: 1,
    duration: 0.8,
    ease: "power2.out",
    stagger: 0.2
  }, "<")
  .to(slide5numbers, {
    top: '-100%',
    duration: 1,
    ease: "power3.in",
  }, "<-0.2")
  .add(() => {
    document.querySelector('.page-wrapper').classList.add('dark-background');
  }, "<");
}, (leaveBackTimeline) => {
// onLeaveBack animation
leaveBackTimeline
  .to(stickyImage, {
    maxWidth: '100%',
    duration: 1,
    ease: "power2.out",
  })
  .to(slide5.children, {
    opacity: 0,
    duration: 0.5,
    ease: "power2.out",
  }, "<")
  .to(processMedia, {
    justifyContent: 'flex-start',
  }, ">0.5")
  .add(() => {
    document.querySelector('.page-wrapper').classList.remove('dark-background');
  }, "<")
  .to(slide5numbers, {
    top: '0%',
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
  }, "<-0.2");
});

createAnimationTrigger(85.71, () => {
  // Add any additional animations for the sixth trigger
});

createAnimationTrigger(100, () => {
  // Add any additional animations for the seventh trigger
});