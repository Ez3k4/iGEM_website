document.addEventListener("DOMContentLoaded", function() {
    let headerHeight = document.querySelector('header').offsetHeight;
    // Set the CSS variable
    document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);

    const sidebar = document.getElementById('sidebar');
    const banner_hero = document.getElementById('banner-hero')
    let banner_hero_bottom = banner_hero.getBoundingClientRect().bottom
    document.documentElement.style.setProperty('--banner-hero-bottom', `${banner_hero_bottom}px`);

    window.addEventListener('scroll', function() {

      let sidebar_DOM_rect = sidebar.getBoundingClientRect()
      let banner_hero_DOM_rect = banner_hero.getBoundingClientRect()

      //console.log(banner_hero_DOM_rect)
      if (sidebar_DOM_rect.y <= headerHeight) {
          sidebar.classList.add('fixed-sidebar');
      } 
      if (banner_hero_DOM_rect.bottom - headerHeight > 0) {
          sidebar.classList.remove('fixed-sidebar');
      }
    });
  
    // Handle click events
    document.querySelectorAll('#sidebar ul li a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove 'active' class from all sidebar links
        document.querySelectorAll('#sidebar ul li a').forEach(link => {
          link.classList.remove('active');
        });
  
        // Add 'active' class to the clicked link
        this.classList.add('active');
        
        var targetElement = document.querySelector(this.getAttribute('href'));
        
        window.scrollTo({
          top: targetElement.offsetTop - headerHeight,
          behavior: 'smooth'
        });
      });
    });
  
    // Handle scroll events
    var sections = document.querySelectorAll('main section');
    var sidebarLinks = document.querySelectorAll('#sidebar ul li a');
  
    var observerOptions = {
      root: null,
      rootMargin: `-${headerHeight}px 0px 0px 0px`,
      threshold: 0.5 // Adjust this value as needed
    };
  
    var observer = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Remove 'active' class from all sidebar links
          sidebarLinks.forEach(link => {
            link.classList.remove('active');
          });
  
          // Add 'active' class to the corresponding sidebar link
          var activeLink = document.querySelector(`#sidebar ul li a[href="#${entry.target.id}"]`);
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      });
    }, observerOptions);
  
    // Observe each section
    sections.forEach(section => {
      observer.observe(section);
    });
  });
