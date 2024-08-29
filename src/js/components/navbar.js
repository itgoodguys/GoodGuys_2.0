import '../../css/components/_navbar.scss';
import { lenis } from '../animations/lenisSmoothScroll.js';

// Code for all menu dropdown links and the media content on the right side of each dropdown content
// we check the index of the nav-dropdown-link that is hovered
// and then add the "show" class on the media image that has the same index
// if the screen size is less than 992px we remove the mouseenter and mouseleave events
const dropdownLinks = document.querySelectorAll('.nav-dropdown-link');
const dropdownImages = document.querySelectorAll('.nav-drop_content-media-image');


function showImage(index) {
  dropdownImages.forEach((img, idx) => {
    if (idx === index) {
      img.classList.add('show');
    } else {
      img.classList.remove('show');
    }
  });
}

let lastHoveredIndex = 0;

// function that is executed when mouse enter
function handleMouseEnter(event) {
  const index = Array.from(dropdownLinks).indexOf(event.currentTarget);
  lastHoveredIndex = index;
  showImage(index);
}

// function that is executed when mouse leave
function handleMouseLeave() {
  showImage(lastHoveredIndex);
}

// add hover event (we will triger this if screen size is more than 991px)
function addHoverEventListeners() {
  dropdownLinks.forEach((link) => {
    link.addEventListener('mouseenter', handleMouseEnter);
    link.addEventListener('mouseleave', handleMouseLeave);
  });
}

// remove hover event (we will triger this if screen size is less than 992px)
function removeHoverEventListeners() {
  dropdownLinks.forEach((link) => {
    link.removeEventListener('mouseenter', handleMouseEnter);
    link.removeEventListener('mouseleave', handleMouseLeave);
  });
}

// check the screen size on page load and screen resize 
// and apply the hover or remove the hover event listener
function applyEventListeners() {
  const mediaQuery = window.matchMedia("(min-width: 992px)");

  if (mediaQuery.matches) {
    addHoverEventListeners();
  } else {
    removeHoverEventListeners();
  }
}

// Initially show the first image
// so when you open the dropdown, one image is showed by default
showImage(0);

// Apply the event listeners on load
applyEventListeners();

// Re-apply the event listeners on window resize
window.addEventListener('resize', applyEventListeners);



///////////////////////////////////////////////
// this code is for the migration list dropdown
// the white overlay that is showing at the bottom of the list
// if the list has a scroll bar
// we check the fixed height of the element and compare with the height of its children
///////////////////////////////////////////////
// function checkOverflow() {
//   const sublinksWrapper = document.querySelectorAll('.nav-drop_content-media_sublinks');

//   sublinksWrapper.forEach(sublinks => {
//     const overlay = sublinks.previousElementSibling;

//     if (sublinks.scrollHeight > sublinks.clientHeight) {
//       overlay.style.display = 'block';
//     } else {
//       overlay.style.display = 'none';
//     }
//   });
// }

// // Run the overflow check on page load
// checkOverflow()
// // on screen reseize
// window.addEventListener('resize', checkOverflow);


///////////////////////////////////////////////
// hamburger button add class when menu is open
///////////////////////////////////////////////
const hamburgerBtn = document.querySelector('.menu-button');
const navbar = document.querySelector('.navbar');

hamburgerBtn.addEventListener('click', function () {
  navbar.classList.toggle('menu-open');
  if (navbar.classList.contains('menu-open')) {
    disablePageScroll();
  } else {
    enablePageScroll();
  }
});



/////////////
/// apply function on click only if screen size is less than 991px
//////////////////
const navDropWrapper = document.querySelectorAll('.nav-drop-wrapper');
const navDropContent = document.querySelectorAll('.nav-drop_content');

function showContent(content) {
  navDropContent.forEach(item => {
    item.classList.remove('show-drop-content');
    // stop propagation so the cleck inside the sidebar wont triger the toggle of the parent link
    // and thus close the content
    item.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  });
  content.classList.add('show-drop-content');

}

// when we click on element we add / remove the show drop content class
function toggleContent(event) {
  // event.currentTarget.classList.toggle('nav-drop-wrapper_active');
  const content = event.currentTarget.querySelector('.nav-drop_content');
  if (content) {
    if (content.classList.contains('show-drop-content')) {
      content.classList.remove('show-drop-content');
    } else {
      showContent(content);
    }
  }

}

// add click event if screen is less than 991px
function addClickEventListeners() {
  navDropWrapper.forEach(wrapper => {
    wrapper.addEventListener('click', toggleContent);
  });
}

// remove click event if screen is larger than 991px
function removeClickEventListeners() {
  navDropWrapper.forEach(wrapper => {
    wrapper.removeEventListener('click', toggleContent);
  });
}

// we check the screen size so we can add or remove click event listeners
function applyNavDropWrapperEventListeners() {
  const mediaQuery = window.matchMedia("(max-width: 991px)");

  if (mediaQuery.matches) {
    addClickEventListeners();
    navDropWrapper.forEach(wrapper => {
      wrapper.removeEventListener('mouseenter', navDropWrapperMouseEnter);
      wrapper.removeEventListener('mouseleave', navDropWrapperMouseLeave);
      wrapper.addEventListener('click', navDropWrapperClick);
    });
  } else {
    removeClickEventListeners();
    navDropWrapper.forEach(wrapper => {
      wrapper.addEventListener('mouseenter', navDropWrapperMouseEnter);
      wrapper.addEventListener('mouseleave', navDropWrapperMouseLeave);
      wrapper.removeEventListener('click', navDropWrapperClick);
    });
  }
}

function disablePageScroll(){
  lenis.stop();
  document.body.style.overflow = 'hidden';
  document.body.style.touchAction= "none";
  document.body.style.position= "fixed";
}

function enablePageScroll(){
  lenis.start();
  document.body.style.overflow = 'auto';
  document.body.style.touchAction= "auto";
  document.body.style.position= "static";
}

// adding dim class for blur effect on dropdown links
// when a dropdown is open all siblings get blured
function navDropWrapperMouseEnter() {
  navDropWrapper.forEach(sibling => {
    if (sibling !== this) {
      sibling.classList.add('dim');
      disablePageScroll()
    }
  });
}

function navDropWrapperMouseLeave() {
  navDropWrapper.forEach(sibling => {
    sibling.classList.remove('dim');
    enablePageScroll()
  });
}

// on click we add a dim class to all sibling elements 
// here we first check if we clicked again on the same element
let lastClickedwrapper = null;

function navDropWrapperClick(event) {
  const wrapper = event.currentTarget;
  const isClickedAgain = lastClickedwrapper === wrapper;

  navDropWrapper.forEach(sibling => {
    if (sibling !== wrapper) {
        sibling.classList.remove('dim');
    } else {
      wrapper.classList.remove('dim');
    }
  });

  if (!isClickedAgain) {
      navDropWrapper.forEach(sibling => {
          if (sibling !== wrapper) {
              sibling.classList.add('dim');
          }
      });
      lastClickedwrapper = wrapper;
  } else {
      lastClickedwrapper = null;
  }
}

// Apply the event listeners on load
applyNavDropWrapperEventListeners();

// Re-apply the event listeners on window resize
window.addEventListener('resize', applyNavDropWrapperEventListeners);




///////////////////////////////////////////////
// acordion for tablet / mobile integrations submenu links
// since they are no longer side by side, but one bellow the other
// we then target the second list that was hidden on desktop but showed on tablet / mobile
///////////////////////////////////////////////
const navDropList = document.querySelector('.nav-drop-list');
const linkWrappers = navDropList.querySelectorAll('.nav-drop_link-wrapper');

linkWrappers.forEach(wrapper => {
    wrapper.addEventListener('click', () => {
        linkWrappers.forEach(item => item.classList.remove('active-link-wrapper'));
        wrapper.classList.add('active-link-wrapper');
    });
});

///////////////////////////////////////////////
// menu peekaboo
///////////////////////////////////////////////
var lastScrollTop = 0;
var scrollThreshold = 10; // Set a threshold for scroll detection
var isScrolling; // Variable to hold the timeout

window.addEventListener('scroll', function() {
  clearTimeout(isScrolling); // Clear the timeout on each scroll event

  isScrolling = setTimeout(function() {
    var currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    var navbar = document.querySelector('.navbar');

    if (Math.abs(currentScroll - lastScrollTop) > scrollThreshold) { // Only proceed if the scroll is significant
      if (currentScroll > 100 && currentScroll > lastScrollTop) {
        if (!navbar.classList.contains('menu-hidden')) {
          navbar.classList.add('menu-hidden');
        }
      } else if (currentScroll < lastScrollTop) {
        if (navbar.classList.contains('menu-hidden')) {
          navbar.classList.remove('menu-hidden');
        }
      }
    }

    // Adding background class when scrolled down
    if (currentScroll > 0) {
      navbar.classList.add('menu-background');
    } else {
      navbar.classList.remove('menu-background');
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
  }, 100); // Set a 100ms delay to limit frequency of scroll detection
});






