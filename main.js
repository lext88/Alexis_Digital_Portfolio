/* ─── PAGE ROUTING ──────────────────────────────── */
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.remove('active');
    if (a.dataset.page === pageId) a.classList.add('active');
  });
}

function showProject(num) {
  showPage('project-' + num);
}

/* ─── CONTACT FORM (placeholder handler) ─────────── */
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-submit');
  btn.disabled = true;
  btn.textContent = 'Sending…';

  /* Simulate a send — replace this with your real backend / Formspree */
  setTimeout(() => {
    e.target.reset();
    btn.style.display = 'none';
    document.getElementById('form-success').style.display = 'block';
  }, 900);
}

/* ─── SCROLL: fade nav border in ────────────────── */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 10) {
    nav.style.boxShadow = '0 1px 0 rgba(193,162,84,0.15)';
  } else {
    nav.style.boxShadow = 'none';
  }
}, { passive: true });

/* ─── HASH ROUTING (for GitHub Pages deep links) ─── */
(function () {
  const hash = location.hash.replace('#', '');
  if (hash) showPage(hash);
})();
