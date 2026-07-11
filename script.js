document.addEventListener('DOMContentLoaded', () => {

  // ===================== LOADER =====================
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('loader').classList.add('hidden');
    }, 800);
  });

  // ===================== NAVBAR SCROLL =====================
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  });

  // ===================== MOBILE MENU =====================
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileClose = document.getElementById('mobileClose');

  function openMenu() {
    mobileMenu.classList.add('open');
    mobileOverlay.classList.add('open');
    menuToggle.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    mobileOverlay.classList.remove('open');
    menuToggle.classList.remove('active');
    document.body.style.overflow = '';
  }

  menuToggle.addEventListener('click', openMenu);
  mobileClose.addEventListener('click', closeMenu);
  mobileOverlay.addEventListener('click', closeMenu);

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // ===================== ACTIVE NAV LINK =====================
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function setActiveLink() {
    let current = '';
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', setActiveLink);

  // ===================== SCROLL REVEAL =====================
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay) || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ===================== STAT COUNTER =====================
  const statNumbers = document.querySelectorAll('.stat-num');

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target);
        animateCount(entry.target, target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => statObserver.observe(el));

  function animateCount(el, target) {
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 50));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current + '+';
    }, 25);
  }

  // ===================== EXPERIENCE TABS =====================
  const expTabs = document.querySelectorAll('.exp-tab');
  const panels = {
    career: document.getElementById('panelCareer'),
    education: document.getElementById('panelEducation')
  };

  expTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      expTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      Object.values(panels).forEach(p => p.classList.remove('active'));
      const target = panels[tab.dataset.tab];
      if (target) target.classList.add('active');
    });
  });

  // ===================== SMOOTH SCROLL =====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ===================== EDUCATION NAV LINK =====================
  document.querySelectorAll('a[href="#education"]').forEach(link => {
    link.addEventListener('click', () => {
      setTimeout(() => {
        const eduTab = document.querySelector('.exp-tab[data-tab="education"]');
        if (eduTab && !eduTab.classList.contains('active')) {
          eduTab.click();
        }
      }, 150);
    });
  });

  // ===================== HERO ENTRANCE ANIMATION =====================
  function startHeroAnimation() {
    const navbar = document.getElementById('navbar');
    const heroEls = document.querySelectorAll('[data-delay]');
    const heroPng = document.getElementById('heroPng');
    const heroGlow = document.querySelector('.hero-glow');

    if (window.innerWidth <= 768) {
      // MOBILE SEQUENCE

      // Step 1: Navbar fades in
      setTimeout(() => navbar.classList.add('visible'), 200);

      // Step 2: Blue glow fades in
      setTimeout(() => {
        if (heroGlow) heroGlow.classList.add('visible');
      }, 400);

      // Step 3: Image appears (1200ms animation: translateY(80px) scale(0.92) -> translateY(0) scale(1))
      setTimeout(() => {
        if (heroPng) heroPng.classList.add('visible');
      }, 800);

      // Step 4: Text elements fade in (greeting, name, subtitle, description)
      heroEls.forEach(el => {
        if (el.closest('.hero-actions')) return;
        const delay = parseInt(el.dataset.delay);
        setTimeout(() => el.classList.add('visible'), delay + 600);
      });

      // Step 5: Buttons fade in
      const btns = document.querySelectorAll('.hero-actions .btn');
      btns.forEach((btn, i) => {
        setTimeout(() => btn.classList.add('visible'), 2200 + i * 100);
      });

      return;
    }

    // DESKTOP SEQUENCE (unchanged)
    setTimeout(() => navbar.classList.add('visible'), 200);

    heroEls.forEach(el => {
      const delay = parseInt(el.dataset.delay);
      setTimeout(() => el.classList.add('visible'), delay);
    });

    setTimeout(() => {
      if (heroPng) heroPng.classList.add('visible');
      if (heroGlow) heroGlow.classList.add('visible');
    }, 1400);
  }

  if (document.getElementById('loader').classList.contains('hidden')) {
    startHeroAnimation();
  } else {
    document.getElementById('loader').addEventListener('transitionend', startHeroAnimation, { once: true });
  }

});
