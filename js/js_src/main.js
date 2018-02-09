// open and close navbar for mobile
var isOpen = false;

function closeNav() {
  $("#nav-container").removeClass("open").addClass("closed");
  $("#toggle-navigation").removeClass("open").addClass("closed");
  $("#toggle-navigation").attr("aria-expanded", "false");
  isOpen = false;
}

function openNav() {
  $("#nav-container").removeClass("closed").addClass("open");
  $("#toggle-navigation").removeClass("closed").addClass("open");
  $("#toggle-navigation").attr("aria-expanded", "true");
  isOpen = true;
}

$(document).ready(function () {
  $("#toggle-navigation").click(function() {
    isOpen == true ? closeNav() : openNav();
  });
});


// Hide Header on on scroll down

var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = 98; //$('header').outerHeight();

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
