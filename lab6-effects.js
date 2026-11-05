// 3D flip kart: tovch darah esvel Enter / Space-eer ergüülne,
// hulgana kartnaas holdoh (esvel Tab-aar gadagsh garah) uyd butsna
document.querySelectorAll('.flip-btn').forEach(btn => {
  const setFlipped = flipped => btn.setAttribute('aria-pressed', flipped);

  btn.addEventListener('click', () => {
    setFlipped(btn.getAttribute('aria-pressed') !== 'true');
  });
  btn.addEventListener('mouseleave', () => setFlipped(false));
  btn.addEventListener('blur', () => setFlipped(false));
});

// Dark mode
const root = document.documentElement;
const themeBtn = document.querySelector('.theme-toggle');
const isDark = () =>
  (root.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) === 'dark';

themeBtn.setAttribute('aria-pressed', isDark());
themeBtn.addEventListener('click', () => {
  const next = isDark() ? 'light' : 'dark';
  root.dataset.theme = next;
  themeBtn.setAttribute('aria-pressed', next === 'dark');
  try { localStorage.setItem('theme', next); } catch (e) {}
});