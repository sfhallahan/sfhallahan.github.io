// open and close navbar for mobile
var didScroll;
var delta = 5;
var navbarHeight = 98;

window.onscroll = function(event) {
    didScroll = true;
};

document.addEventListener("DOMContentLoaded", function() {
  var navBar = new NavBar(navbarHeight, delta);

  // Mobile navigation
  var toggleNavigationBtn = document.getElementById('toggle-navigation');
  toggleNavigationBtn.onclick = function() {
    navBar.isOpen === true ? navBar.closeNav() : navBar.openNav()
  }

  // Nav bar up on scroll
  setInterval(function() {
    if (didScroll) {
      navBar.handleScroll();
      didScroll = false;
    }
  }, 250);

  // Replace Email Octopus jQuery with vanilla js
  var subscribeForm = document.getElementById('subscribe-form');
  var emailAddress = document.getElementById('email');
  var errorMsg = document.getElementById('error-message');
  var subscribe = new Subscribe();

  // Subscribe Form
  subscribeForm.onsubmit = function(e) {
    e.preventDefault()
    errorMsg.innerHTML = "";
    if(subscribe.isBotPost(subscribeForm)) {
      errorMsg.innerHTML = subscribe.botSubmissionErrorMessage;
    } else if(emailAddress.value.trim().length === 0) {
      errorMsg.innerHTML = subscribe.missingEmailAddressMessage;
    } else if(!subscribe.basicValidateEmail(emailAddress.value)) {
      errorMsg.innerHTML = subscribe.invalidEmailAddressMessage;
    } else {
      subscribe.formSubmit(subscribeForm, subscribe);
    }
    return false;
  }
});
