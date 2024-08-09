import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const processElement = document.querySelector(".process");
const stickyElement = document.querySelector(".process_sticky");
const processHeight = processElement.offsetHeight;

// Function to create a ScrollTrigger for a specific percentage
function createTrigger(percentage, label) {
  const startOffset = percentage / 100 * processHeight;
  
  ScrollTrigger.create({
    trigger: stickyElement,
    start: () => `top+=${startOffset}px bottom`,
    end: () => `top+=${startOffset + 1}px bottom`, // Slight offset to make it a single trigger
    onEnter: () => {
      console.log(`Sticky element passed ${label} while scrolling down`);
    },
    onLeaveBack: () => {
      console.log(`Sticky element passed ${label} while scrolling up`);
    }
  });
}

// Create triggers based of the process element height
createTrigger(14.28, '1');
createTrigger(28.57, '2');
createTrigger(42.85, '3');
createTrigger(57.14, '4');
createTrigger(71.42, '5');
createTrigger(85.71, '6');
createTrigger(100, '7');
