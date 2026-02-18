document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const sections = document.querySelectorAll('section[id]');
  const backToTop = document.getElementById('backToTop');

  // Combined scroll handler
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        // Navbar scroll effect
        navbar.classList.toggle('scrolled', scrollY > 50);

        // Back to top visibility
        if (backToTop) backToTop.classList.toggle('visible', scrollY > 600);

        // Active nav link on scroll
        let current = '';
        sections.forEach(section => {
          if (scrollY >= section.offsetTop - 100) {
            current = section.getAttribute('id');
          }
        });
        document.querySelectorAll('.nav-links a').forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });

        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Mobile nav toggle
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  // Close mobile nav on link click
  navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      navLinks.classList.remove('active');
      navToggle.classList.remove('active');
    }
  });

  // Back to top click
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // FAQ toggle (replaces inline onclick)
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.parentElement.classList.toggle('open');
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Scroll animations (CSS class approach — content visible if JS fails)
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.commitment-item, .advisory-card, .about-text, .services-text').forEach(el => {
      el.classList.add('animate-in');
      observer.observe(el);
    });
  }

  // Form handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(contactForm));
      const subject = 'Website Enquiry from ' + data.firstName + ' ' + data.lastName;
      const body = 'Name: ' + data.firstName + ' ' + data.lastName + '\nEmail: ' + data.email + '\nPhone: ' + (data.phone || 'N/A') + '\nMessage: ' + (data.message || 'N/A');
      window.location.href = 'mailto:WalthamstowCycles@live.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.textContent = 'Opening email client...';
      setTimeout(() => { btn.textContent = 'Send Message'; }, 3000);
    });
  }
});
