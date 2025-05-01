/**
 * Site Performance Optimizations
 * - Implements lazy loading for images
 * - Optimizes resource loading 
 * - Enhances responsiveness
 */

// Initialize optimization features when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Implement lazy loading for images
  setupLazyLoading();
  
  // Initialize responsive navigation enhancements
  enhanceResponsiveNav();
  
  // Add smooth scrolling to anchor links
  setupSmoothScrolling();
  
  // Monitor page performance
  monitorPerformance();
});

/**
 * Sets up lazy loading for images and iframes
 */
function setupLazyLoading() {
  // Check if native lazy loading is supported
  if ('loading' in HTMLImageElement.prototype) {
    // Use native lazy loading
    const lazyImages = document.querySelectorAll('img:not([loading])');
    lazyImages.forEach(img => {
      img.loading = 'lazy';
    });
    
    // Also apply to iframes if any
    const lazyIframes = document.querySelectorAll('iframe:not([loading])');
    lazyIframes.forEach(iframe => {
      iframe.loading = 'lazy';
    });
  } else {
    // Fallback for browsers that don't support native lazy loading
    const lazyImages = document.querySelectorAll('.lazy-image');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            if (img.dataset.srcset) {
              img.srcset = img.dataset.srcset;
            }
            img.classList.remove('lazy-image');
            imageObserver.unobserve(img);
          }
        });
      });
      
      lazyImages.forEach(img => {
        imageObserver.observe(img);
      });
    } else {
      // Fallback for older browsers without IntersectionObserver
      // Simple scroll event based lazy loading
      let lazyLoadThrottleTimeout;
      
      function lazyLoad() {
        if (lazyLoadThrottleTimeout) {
          clearTimeout(lazyLoadThrottleTimeout);
        }
        
        lazyLoadThrottleTimeout = setTimeout(() => {
          const scrollTop = window.pageYOffset;
          lazyImages.forEach(img => {
            if (img.offsetTop < window.innerHeight + scrollTop) {
              img.src = img.dataset.src;
              if (img.dataset.srcset) {
                img.srcset = img.dataset.srcset;
              }
              img.classList.remove('lazy-image');
            }
          });
          
          if (lazyImages.length === 0) {
            document.removeEventListener('scroll', lazyLoad);
            window.removeEventListener('resize', lazyLoad);
            window.removeEventListener('orientationChange', lazyLoad);
          }
        }, 20);
      }
      
      document.addEventListener('scroll', lazyLoad);
      window.addEventListener('resize', lazyLoad);
      window.addEventListener('orientationChange', lazyLoad);
    }
  }
}

/**
 * Enhances mobile navigation experience
 */
function enhanceResponsiveNav() {
  const navToggle = document.querySelector('.navbar-toggler');
  
  if (navToggle) {
    // Improve animation smoothness for mobile menu
    const navbarCollapse = document.getElementById('navbarCollapse');
    
    if (navbarCollapse) {
      navbarCollapse.addEventListener('show.bs.collapse', function() {
        document.body.classList.add('nav-open');
      });
      
      navbarCollapse.addEventListener('hide.bs.collapse', function() {
        document.body.classList.remove('nav-open');
      });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isNavbarOpen = navbarCollapse && navbarCollapse.classList.contains('show');
      const isClickInsideNavbar = navbarCollapse && navbarCollapse.contains(event.target);
      const isToggleButton = navToggle.contains(event.target);
      
      if (isNavbarOpen && !isClickInsideNavbar && !isToggleButton) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    });
  }
}

/**
 * Sets up smooth scrolling for anchor links
 */
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for fixed header
          behavior: 'smooth'
        });
        
        // Update URL hash without scrolling
        history.pushState(null, null, targetId);
      }
    });
  });
}

/**
 * Monitors page performance metrics
 */
function monitorPerformance() {
  if ('performance' in window && 'PerformanceObserver' in window) {
    // Create performance observer to monitor page loading metrics
    const observer = new PerformanceObserver((list) => {
      const perfEntries = list.getEntries();
      
      perfEntries.forEach((entry) => {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', Math.round(entry.startTime));
        }
        if (entry.entryType === 'first-input') {
          console.log('FID:', Math.round(entry.processingStart - entry.startTime));
        }
        if (entry.entryType === 'layout-shift') {
          console.log('CLS increment:', entry.value);
        }
      });
    });
    
    // Observe various performance metrics
    observer.observe({entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift']});
  }
}

// Prefetch content when hovering over links for faster navigation
document.addEventListener('DOMContentLoaded', function() {
  const internalLinks = document.querySelectorAll('a[href^="/"]:not([href*="#"]), a[href^="./"]:not([href*="#"]), a[href^="../"]:not([href*="#"])');
  
  internalLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      const linkUrl = this.href;
      
      if (!linkUrl || linkUrl === window.location.href) {
        return;
      }
      
      // Create prefetch link
      const linkPrefetch = document.createElement('link');
      linkPrefetch.rel = 'prefetch';
      linkPrefetch.href = linkUrl;
      document.head.appendChild(linkPrefetch);
    });
  });
});