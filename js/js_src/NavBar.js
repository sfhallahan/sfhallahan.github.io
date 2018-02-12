function NavBar(navbarHeight, delta) {
  this.isOpen = false;
  this.navContainer = document.getElementById('nav-container');
  this.toggleNavigationBtn = document.getElementById('toggle-navigation');
  this.header = document.getElementById('header');
  this.lastScrollTop = 0;
  this.navbarHeight = navbarHeight;
  this.delta = delta;
}

NavBar.prototype.closeNav = function() {
  this.navContainer.classList.replace('open', 'closed');
  this.toggleNavigationBtn.classList.replace('open', 'closed');
  this.toggleNavigationBtn.setAttribute('aria-expanded', 'false');
  this.isOpen = false;
}

NavBar.prototype.openNav = function() {
  this.navContainer.classList.replace('closed', 'open');
  this.toggleNavigationBtn.classList.replace('closed', 'open');
  this.toggleNavigationBtn.setAttribute('aria-expanded', 'true');
  this.isOpen = true;
}

NavBar.prototype.handleScroll = function() {
  var st = window.scrollY;

  if(Math.abs(this.lastScrollTop - st) <= delta)
      return;

  if (st > this.lastScrollTop && st > navbarHeight){
      this.header.classList.replace('nav-down', 'nav-up');
      this.closeNav();
  } else {
      if(st + window.innerHeight < document.body.clientHeight) {
        this.header.classList.replace('nav-up', 'nav-down');
      }
  }
  this.lastScrollTop = st;
}
