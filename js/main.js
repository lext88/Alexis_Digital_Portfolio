/* ─── PAGE ROUTING ──────────────────────────────── */
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'instant' });
    // Init carousels on newly shown page
    target.querySelectorAll('[data-carousel]').forEach(initCarousel);
  }
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.remove('active');
    if (a.dataset.page === pageId) a.classList.add('active');
  });
}
 
function showProject(num) {
  showPage('project-' + num);
}
 
/* ─── CAROUSEL ──────────────────────────────────── */
function initCarousel(carousel) {
  if (carousel.dataset.initialized) return;
  carousel.dataset.initialized = 'true';
 
  const track    = carousel.querySelector('.carousel-track');
  const slides   = carousel.querySelectorAll('.carousel-slide');
  const dotsWrap = carousel.querySelector('.carousel-dots');
  const label    = carousel.querySelector('.carousel-label');
  const count    = slides.length;
  let current    = 0;
  let autoTimer  = null;
 
  carousel.dataset.slides = count;
  
  // Set explicit start positioning parameters on execution
  track.style.transform = 'translateX(0%)';
 
  // Generate dot elements if tracking panel layout maps are found
  if (dotsWrap) {
    dotsWrap.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
  }

  // Updates the slide label text using the image's alt attribute
  function updateLabel() {
    if (!label) return;
    const currentImg = slides[current].querySelector('img');
    if (currentImg && currentImg.getAttribute('alt') && currentImg.getAttribute('alt') !== '...') {
      label.textContent = currentImg.getAttribute('alt');
      label.style.opacity = '1';
    } else {
      label.textContent = '';
      label.style.opacity = '0';
    }
  }
 
  function goTo(idx) {
    current = (idx + count) % count;
    track.style.transform = `translateX(-${current * 100}%)`;
    
    if (dotsWrap) {
      dotsWrap.querySelectorAll('.carousel-dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
    }
    updateLabel();
  }
 
  // Attach structural bindings directly to elements
  carousel._goTo = goTo;
  carousel._current = () => current;
 
  // Initialize initial label tracking states on runtime kick-off 
  updateLabel();

  // Automatic cycling configuration loop logic assignments
  function startAuto() {
    stopAuto();
    if (count <= 1) return;
    autoTimer = setInterval(() => goTo(current + 1), 1500);
  }
 
  function stopAuto() {
    clearInterval(autoTimer);
  }
 
  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);
  startAuto();
}
 
function carouselMove(btn, direction) {
  const carousel = btn.closest('[data-carousel]');
  if (!carousel || !carousel._goTo) return;
  
  const currentIdx = typeof carousel._current === 'function' ? carousel._current() : 0;
  carousel._goTo(currentIdx + direction);
}

// Automatically fire loop registrations once viewport tracking settles down
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-carousel]').forEach(carousel => {
    initCarousel(carousel);
  });
});

/* ─── CONTACT FORM ──────────────────────────────── */
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-submit');
  btn.disabled = true;
  btn.textContent = 'Sending…';
  setTimeout(() => {
    e.target.reset();
    btn.style.display = 'none';
    document.getElementById('form-success').style.display = 'block';
  }, 900);
}
 
/* ─── SCROLL: fade nav shadow ───────────────────── */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  nav.style.boxShadow = window.scrollY > 10
    ? '0 1px 0 rgba(240,237,228,0.08)'
    : 'none';
}, { passive: true });
 
/* ─── INIT on load ──────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Init carousels on the active (home) page — none on home, but future-proof
  document.querySelectorAll('.page.active [data-carousel]').forEach(initCarousel);
 
  // Hash routing
  const hash = location.hash.replace('#', '');
  if (hash) showPage(hash);
});