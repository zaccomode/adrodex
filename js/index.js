var slideIndex = 1;

window.onscroll = function() {scrollCheck()};

// NAV SCROLL
function scrollCheck() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementById("nav").classList.add("on-scroll");
    } else {
        document.getElementById("nav").classList.remove("on-scroll");
    }
}

// SLIDESHOW
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    slideIndex = n;
    var slides = document.getElementsByClassName("header-slide");
    var slideshowContainer = document.getElementById("slideshow-container");
    var dots = document.getElementsByClassName("ticker");
    if (n > slides.length) {slideIndex = 1}    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    } 
    slideshowContainer.style.marginLeft = -200 * (n - 1) + "%" 
    dots[slideIndex-1].className += " active";
}

// NAV OPEN/CLOSE
function openNav() {
    document.getElementById("fullPageNav").style.width = "100%";
    document.getElementById("navContent").style.display = "flex";
}

function closeNav() {
    document.getElementById("fullPageNav").style.width = "0%";
    document.getElementById("navContent").style.display = "none";
}