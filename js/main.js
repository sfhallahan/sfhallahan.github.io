// open and close navbar for mobile
let isOpen = false;

function closeNav() {
  $("#nav-container").removeClass("open").addClass("closed");
  $("#toggle-navigation").removeClass("open").addClass("closed");
  isOpen = false;
}

function openNav() {
  $("#nav-container").removeClass("closed").addClass("open");
  $("#toggle-navigation").removeClass("closed").addClass("open");
  isOpen = true;
}

$(document).ready(function () {
  $("#toggle-navigation").click(() => {
    isOpen == true ? closeNav() : openNav();
  });
});


// Hide Header on on scroll down

let didScroll;
let lastScrollTop = 0;
const delta = 5;
const navbarHeight = 98; //$('header').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();

    if(Math.abs(lastScrollTop - st) <= delta)
        return;

    if (st > lastScrollTop && st > navbarHeight){
        $('header').removeClass('nav-down').addClass('nav-up');
        closeNav();
    } else {
        if(st + $(window).height() < $(document).height()) {
          $('header').removeClass('nav-up').addClass('nav-down');
        }
    }

    lastScrollTop = st;
}
