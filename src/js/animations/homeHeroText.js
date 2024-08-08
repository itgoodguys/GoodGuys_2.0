import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

// Function to initialize animations
function initializeAnimations() {
  const fadeFromLeftElements = document.querySelectorAll("[fade-from-left='true']");
  const fadeFromRightElement = document.querySelector("[fade-from-right='true']");
  const splitLinesElement = document.querySelector("[split-lines='true']");

// for this animation to work, wou need to add a fade-from-left='true'
// to the parent element that wraps all animated elements
// if there is a text that you would like to split to lines, you need to add
// split-lines='true'

  if (fadeFromLeftElements.length > 0) {
    // Initialize SplitType if splitLinesElement exists
    let splitTypeInstance;
    if (splitLinesElement) {
      splitTypeInstance = new SplitType("[split-lines='true']", { types: 'lines' });
    }

    // GSAP Animation for appearing from left
    gsap.from("[fade-from-left='true'] > *,  [fade-from-left='true'] h1 > *", {
      opacity: 0,
      x: -100,
      duration: 1,
      stagger: 0.3,
      ease: "back.inOut",
      onComplete: () => {
        // Add ScrollTrigger animations after the initial animation completes
        gsap.to("[fade-from-left='true'] > *",{
          scrollTrigger: {
            trigger: "[fade-from-left='true']",
            start: "top 20%",
            toggleActions: "play none none reverse"
          },
          opacity: 0,
          x: -100,
          duration: 1,
          stagger: 0.3,
          ease: "back.inOut"
        });

        // ScrollTrigger animation for h1 lines if splitLinesElement exists
        if (splitTypeInstance) {
          gsap.to(splitTypeInstance.lines, {
            scrollTrigger: {
              trigger: "[fade-from-left='true']",
              start: "top 20%",
              toggleActions: "play none none reverse"
            },
            opacity: 0,
            x: -100,
            duration: 1,
            stagger: 0.2,
            ease: "back.inOut"
          });
        }
      }
    });

    // GSAP Animation for h1 lines if splitLinesElement exists
    if (splitTypeInstance) {
      gsap.from(splitTypeInstance.lines, {
        opacity: 0,
        x: -100,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out"
      });
    }
  }

  if (fadeFromRightElement) {
    // Create GSAP animation for element fading from right
    gsap.fromTo(fadeFromRightElement, 
      {
        opacity: 0,
        x: 100
      }, 
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: fadeFromRightElement,
          start: 'top 85%',  // 15% from the bottom
          end: 'top 20%',    // 20% from the top
          scrub: true
        }
      }
    );
  }
}

// Initialize the animations
initializeAnimations();
