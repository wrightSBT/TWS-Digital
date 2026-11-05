(() => {
  const header = document.querySelector('.header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const year = document.getElementById('year');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (year) year.textContent = new Date().getFullYear();

  const setMenu = open => {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('open', open);
  };
  toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('click', event => {
    if (toggle?.getAttribute('aria-expanded') === 'true' && !nav?.contains(event.target) && !toggle.contains(event.target)) setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });

  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 8);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach(item => observer.observe(item));
  } else revealItems.forEach(item => item.classList.add('visible'));

  const track = document.getElementById('work-track');
  const cards = track ? [...track.children] : [];
  const viewport = track?.parentElement;
  const prev = document.querySelector('.slider-prev');
  const next = document.querySelector('.slider-next');
  let index = 0;
  let pointerStart = null;
  let dragged = false;
  const maxIndex = () => Math.max(0, cards.length - (window.innerWidth <= 680 ? 1 : 2));
  const moveTo = requestedIndex => {
    if (!track || !cards.length) return;
    index = Math.max(0, Math.min(requestedIndex, maxIndex()));
    const gap = parseFloat(getComputedStyle(track).gap) || 20;
    const distance = cards[0].getBoundingClientRect().width + gap;
    track.style.transform = `translate3d(${-index * distance}px,0,0)`;
    if (prev) prev.disabled = index === 0;
    if (next) next.disabled = index === maxIndex();
    viewport?.setAttribute('aria-label', `Selected work, showing project ${index + 1} of ${cards.length}`);
  };
  prev?.addEventListener('click', () => moveTo(index - 1));
  next?.addEventListener('click', () => moveTo(index + 1));
  window.addEventListener('resize', () => moveTo(index));
  track?.addEventListener('dragstart', event => event.preventDefault());
  track?.addEventListener('pointerdown', event => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    pointerStart = { id: event.pointerId, x: event.clientX, y: event.clientY };
    dragged = false;
    track.setPointerCapture(event.pointerId);
  });
  track?.addEventListener('pointerup', event => {
    if (!pointerStart) return;
    const dx = event.clientX - pointerStart.x;
    const dy = event.clientY - pointerStart.y;
    dragged = Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy);
    if (dragged && Math.abs(dx) > 42) moveTo(index + (dx < 0 ? 1 : -1));
    pointerStart = null;
    if (dragged) requestAnimationFrame(() => { dragged = false; });
  });
  track?.addEventListener('pointercancel', () => { pointerStart = null; });
  track?.addEventListener('click', event => {
    if (dragged) { event.preventDefault(); event.stopPropagation(); }
  }, true);
  moveTo(0);

  const faqItems = [...document.querySelectorAll('.faq-item')];
  const requestedQuestion = Number(new URLSearchParams(window.location.search).get('open-question'));
  if (requestedQuestion > 0 && requestedQuestion <= faqItems.length) {
    faqItems.forEach((item, itemIndex) => { item.open = itemIndex === requestedQuestion - 1; });
  }
  faqItems.forEach(item => item.addEventListener('toggle', () => {
    if (item.open) faqItems.forEach(other => { if (other !== item) other.open = false; });
  }));
})();
