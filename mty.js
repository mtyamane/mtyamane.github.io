// TODO: BREAKPOINTS

// Scroll to "About Me"
function toAbout() {
  var sticky = document.getElementById("title");
  document.body.scrollTop = window.innerHeight-sticky.offsetHeight + 5;
  document.documentElement.scrollTop = window.innerHeight-sticky.offsetHeight + 5;
}

// Change opacity of box shadow and header with the scroll
function changeOpacity() {
  var sticky = document.getElementById("title");
  var background = document.getElementById("topHeader");
  var layer = document.getElementById("layer");
  var scrollAbout = document.getElementById("scrollAbout");
  var offset = (window.innerHeight-sticky.offsetHeight + 1)*.95;
  var offsetTracker = Math.min(window.pageYOffset, offset)/offset;
  var boxOpacity = .6 + (.4 * offsetTracker);
  var headerOpacity = Math.max((2.25 - (offsetTracker*5)),0);
  var buttonOpacity = Math.max(6 - (offsetTracker*6.5),0);
  background.style.boxShadow = "inset 0 0 0 1000px rgba(9,32,63," + boxOpacity + ")";
  layer.style.opacity = headerOpacity;
  scrollAbout.style.opacity = buttonOpacity;
}

// Scroll to top
function toTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Create sticky title
var animateWords = true; // global variable, toggle title (sticky header) animation
function stickyHeader() {
  var sticky = document.getElementById("title");
  var offset = document.getElementById("stickyOffset");
  // different options for mobile (750px wide) and web
  if (window.innerWidth >= 768) {
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
