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

});
