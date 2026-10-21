// 3D flip kart: tovch darah esvel Enter / Space-eer ergüülne
document.querySelectorAll('.flip-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.setAttribute('aria-pressed', btn.getAttribute('aria-pressed') !== 'true');
  });
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