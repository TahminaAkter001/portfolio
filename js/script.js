document.addEventListener('DOMContentLoaded', () => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const navbar = $('.navbar');
  const backTop = $('#toTop');
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  // Sticky navigation state, section highlighting and back-to-top control.
  const sections = $$('main[id], section[id]');
  const navLinks = $$('#mainNav .nav-link');
  const updateScrollUI = () => {
    const y = window.scrollY;
    navbar?.classList.toggle('scrolled', y > 30);
    backTop?.classList.toggle('show', y > 500);
    let activeId = 'home';
    sections.forEach(section => {
      if (y >= section.offsetTop - 180) activeId = section.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
    });
  };
  updateScrollUI();
  window.addEventListener('scroll', updateScrollUI, { passive: true });
  backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Scroll reveal: elements animate into view in a staggered sequence.
  const revealElements = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        entry.target.querySelectorAll('.skill-track span').forEach(bar => {
          bar.style.width = bar.dataset.width || '0%';
        });
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealElements.forEach((element, index) => {
      element.style.transitionDelay = `${Math.min((index % 4) * 90, 270)}ms`;
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach(element => element.classList.add('visible'));
  }

  // Typewriter loop: type, pause, delete, then cycle through role phrases.
  const typed = $('#typedText');
  const phrases = [
    'Building Scalable Web Applications with Laravel',
    'Full Stack Development with PHP & MySQL',
    'Creating Dynamic Interfaces with Livewire',
    'Turning Ideas into Reliable Digital Products'
  ];
  let phraseIndex = 0;
  let characterIndex = 0;
  let deleting = false;
  let typingTimer;
  function typeLoop() {
    if (!typed) return;
    const phrase = phrases[phraseIndex];
    typed.textContent = phrase.slice(0, characterIndex);
    if (!deleting && characterIndex < phrase.length) {
      characterIndex++;
      typingTimer = window.setTimeout(typeLoop, 48);
    } else if (!deleting) {
      deleting = true;
      typingTimer = window.setTimeout(typeLoop, 1450);
    } else if (characterIndex > 0) {
      characterIndex--;
      typingTimer = window.setTimeout(typeLoop, 23);
    } else {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingTimer = window.setTimeout(typeLoop, 300);
    }
  }
  if (typed) {
    typed.textContent = '';
    typeLoop();
  }

  // Cursor-following ambient light, matching the reference's interactive glow.
  const cursorGlow = $('#cursorGlow');
  let pointerFrame = 0;
  window.addEventListener('pointermove', event => {
    if (!cursorGlow || event.pointerType === 'touch') return;
    document.body.classList.add('pointer-active');
    if (pointerFrame) cancelAnimationFrame(pointerFrame);
    pointerFrame = requestAnimationFrame(() => {
      cursorGlow.style.left = `${event.clientX}px`;
      cursorGlow.style.top = `${event.clientY}px`;
    });
  }, { passive: true });
  document.addEventListener('pointerleave', () => document.body.classList.remove('pointer-active'));

  // Interactive 3D tilt on the portrait stage; reduced on smaller screens.
  const stage = $('.reference-stage');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (stage && !reduceMotion && window.matchMedia('(pointer:fine)').matches) {
    let tiltFrame = 0;
    stage.addEventListener('pointermove', event => {
      if (window.innerWidth < 992) return;
      const rect = stage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      if (tiltFrame) cancelAnimationFrame(tiltFrame);
      tiltFrame = requestAnimationFrame(() => {
        stage.style.transform = `perspective(1100px) rotateY(${x * 7}deg) rotateX(${-y * 5}deg)`;
      });
    });
    stage.addEventListener('pointerleave', () => {
      stage.style.transform = 'perspective(1100px) rotateY(0deg) rotateX(0deg)';
    });
  }

  // Subtle 3D tilt on project cards when the pointer moves over them.
  if (!reduceMotion && window.matchMedia('(pointer:fine)').matches) {
    $$('.project-card').forEach(card => {
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-7px)`;
      });
      card.addEventListener('pointerleave', () => {
        card.style.transform = '';
      });
    });
  }

  // Count-up animation for the hero metrics.
  const counters = $$('.count-number');
  if ('IntersectionObserver' in window && counters.length) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const element = entry.target;
        const target = Number(element.dataset.count || 0);
        const suffix = element.dataset.suffix || '';
        const decimal = String(target).includes('.');
        const duration = 1500;
        const start = performance.now();
        function animateCount(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = target * eased;
          element.textContent = `${decimal ? value.toFixed(1) : Math.round(value)}${suffix}`;
          if (progress < 1) requestAnimationFrame(animateCount);
          else element.textContent = `${decimal ? target.toFixed(1) : target}${suffix}`;
        }
        requestAnimationFrame(animateCount);
        observer.unobserve(element);
      });
    }, { threshold: 0.6 });
    counters.forEach(counter => counterObserver.observe(counter));
  }

  // Close the collapsed Bootstrap menu after a navigation selection.
  $$('#navContent .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const menu = $('#navContent');
      if (menu?.classList.contains('show') && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  // Contact form: prepare a message in the visitor's email application.
  const form = $('#contactForm');
  form?.addEventListener('submit', event => {
    event.preventDefault();
    const name = $('#name').value.trim();
    const email = $('#email').value.trim();
    const subject = $('#subject').value.trim();
    const message = $('#message').value.trim();
    const body = `Hi Tahmina,%0D%0A%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0AFrom: ${encodeURIComponent(name)} (${encodeURIComponent(email)})`;
    const mailto = `mailto:tahminaakter11002@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    $('#formFeedback').textContent = 'Opening your email application…';
    window.location.href = mailto;
  });
});
