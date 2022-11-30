/*
Functions used for Mark Yamane's website
*/
function toggleNav() {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links li');

  // toggle nav
  nav.classList.toggle('nav-active');

  // animate links
  navLinks.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = '';
    } else {
      link.style.animation = 'navLinkFade 0.5s ease forwards ' + (index/7 + 0.5) + 's';
    }
  });

  // burger animation
  burger.classList.toggle('toggle');
}
function navSlide() {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links li');

  // toggle nav
  burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');

    // animate links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = 'navLinkFade 0.5s ease forwards ' + (index/7 + 0.5) + 's';
      }
    });

    // burger animation
    burger.classList.toggle('toggle');
    
  });
}

// Scroll to "About Me"
function toAbout() {
  const sticky = document.getElementById("title");
  document.body.scrollTop = window.innerHeight-sticky.offsetHeight + 5;
  document.documentElement.scrollTop = window.innerHeight-sticky.offsetHeight + 5;
}

// Scroll to top
function toTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Scroll to "About Me" from navbar
function toAboutNav() {
  if (window.innerWidth <= 576) {
    toTop();
    toggleNav();      
  } else {
    toAbout();
  }
}
// Scroll to "Projects" from navbar
function toProjectsNav() {
  const sticky = document.getElementById("title");
  const about = document.getElementById("about");
  
  // scroll below "about me"
  var scrollOffset = about.offsetHeight + 5;
  
  if (window.innerWidth > 576) {
    // add header offset
    scrollOffset += window.innerHeight-sticky.offsetHeight;
  }
  document.body.scrollTop = scrollOffset;
  document.documentElement.scrollTop = scrollOffset;
  if (window.innerWidth <= 576) {
    toggleNav();
  }
  
}
// Scroll to "Research" from navbar
function toResearchNav() {
  const sticky = document.getElementById("title");
  const about = document.getElementById("about");
  const proj = document.getElementById("projects");
  
  // scroll below "about me"
  var scrollOffset = about.offsetHeight + proj.offsetHeight + 5;
  
  if (window.innerWidth > 576) {
    // add header offset
    scrollOffset += window.innerHeight-sticky.offsetHeight;
  }
  document.body.scrollTop = scrollOffset;
  document.documentElement.scrollTop = scrollOffset;
  if (window.innerWidth <= 576) {
    toggleNav();
  }
}

// Change opacity of box shadow and header with the scroll
function changeOpacity() {
  const sticky = document.getElementById("title");
  const background = document.getElementById("topHeader");
  const layer = document.getElementById("layer");
  const scrollAbout = document.getElementById("scrollAbout");
  var offset = (window.innerHeight-sticky.offsetHeight + 1)*.95;
  var offsetTracker = Math.min(window.pageYOffset, offset)/offset;
  var boxOpacity = .6 + (.4 * offsetTracker);
  var headerOpacity = Math.max((2.25 - (offsetTracker*5)),0);
  var buttonOpacity = Math.max(6 - (offsetTracker*6.5),0);
  background.style.boxShadow = "inset 0 0 0 1000px rgba(9,32,63," + boxOpacity + ")";
  layer.style.opacity = headerOpacity;
  scrollAbout.style.opacity = buttonOpacity;
}

// Create sticky title
var animateWords = true; // global variable, toggle title (sticky header) animation
function stickyHeader() {
  const sticky = document.getElementById("title");
  const offset = document.getElementById("stickyOffset");
  // different options for mobile (750px wide) and web
  if (window.innerWidth >= 576) {
    // as soon as scrolling starts, hide the title
    sticky.style.opacity = "0";
    offset.style.paddingTop = "0px";
    sticky.style.position = "fixed";
    sticky.style.top = "0";
    // change opacity of title and padding of offset
    if (window.pageYOffset >= (window.innerHeight-sticky.offsetHeight)) {
      if (animateWords) {
        // restart animation
        reanimateWords();
      }
      sticky.style.opacity = "1";
    } else {
      sticky.style.opacity = "0";
      offset.style.paddingTop = "0px";
      animateWords = true;  // moving out of animation range
    }
  } else {
      // let sticky header appear as soon as at mobile width
      sticky.style.opacity = "1";
      sticky.style.position = "fixed";
      sticky.style.top = "0";
      offset.style.paddingTop = sticky.offsetHeight + "px";
  }
}

function reanimateWords() {
  var sticky = document.getElementById("title");
  // restart animation
  var elm = sticky;
  var sticky = elm.cloneNode(true);
  elm.parentNode.replaceChild(sticky, elm);
  animateWords = false;
}

// Toggle bouncing animation when scrolling starts
function stopBounce() {
  var scrollAbout = document.getElementById("scrollAbout");
  if (window.pageYOffset > 2) {
    scrollAbout.style = "paused";
  } else {
    scrollAbout.style = "running";
  }
}

// call functions
stickyHeader();
navSlide();
window.onscroll = function() {
    changeOpacity();
    stopBounce();
    stickyHeader();
}
window.onresize = function() {
    stickyHeader();
}