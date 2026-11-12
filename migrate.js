// lab6.html + lab6-effects.js  ->  lab7.html + lab7-effects.js (BEM нэр)
// Ажиллуулах: node migrate.js   (lab6 файлууд энэ script-тэй ижил folder-т байна)
const fs = require('fs');

const MAP = {
  'page': 'layout__main',
  'site-header': 'header', 'site-title': 'header__title',
  'main-nav': 'nav', 'nav-list': 'nav__list', 'nav-link': 'nav__link',
  'bars': 'nav-toggle__bars', 'bar': 'nav-toggle__bar', 'nav-toggle-text': 'nav-toggle__text',
  'form-grid': 'form__grid', 'group': 'form__group', 'group-title': 'form__legend',
  'field': 'form__field', 'label': 'form__label', 'input': 'form__input',
  'select': 'form__select', 'textarea': 'form__textarea', 'badge': 'form__badge',
  'choices': 'form__choices', 'choice': 'form__choice', 'actions': 'form__actions',
  'btn-primary': 'btn--primary', 'btn-secondary': 'btn--secondary',
  'tooltip-text': 'tooltip__text',
  'site-footer': 'footer', 'footer-links': 'footer__links',
  'sub-title': 'showcase__subtitle',
  'flip': 'flip-grid__item flip-card', 'flip-btn': 'flip-card__btn', 'flip-inner': 'flip-card__inner',
  'flip-face': 'flip-card__face', 'flip-front': 'flip-card__face--front',
  'flip-back': 'flip-card__face--back', 'flip-img': 'flip-card__img',
  'stagger': 'u-stagger', 'embed': 'media__embed', 'bar-rect': 'chart__bar',
  'device-btn': 'device-bar__btn', 'device-frame': 'device-stage__frame',
};
// Нэр нь хэвээр үлдэх (аль хэдийн block нэр болсон) class-ууд
const KEEP = new Set(['theme-toggle', 'nav-toggle', 'layout', 'section-title', 'lead', 'btn', 'tooltip',
  'sidebar', 'card', 'interest-list', 'grade-table', 'showcase', 'media', 'chart', 'device-bar',
  'device-stage', 'flip-grid']);
// Зөвхөн HTML-д бүтцийн hook болж, өөрийн CSS дүрэмгүй class-ууд
const NO_CSS = new Set(['layout__main', 'form', 'flip-card']);

let html = fs.readFileSync('lab6.html', 'utf8');
let js = fs.readFileSync('lab6-effects.js', 'utf8');
const unknown = new Set();

// 1) class="..." доторх нэрсийг BEM болгоно
html = html.replace(/class="([^"]*)"/g, (_, v) => 'class="' + v.split(/\s+/).filter(Boolean)
  .map(t => MAP[t] || (KEEP.has(t) || unknown.add(t), t)).join(' ') + '"');

// 2) Бусад нэг удаагийн солилт (олдохгүй бол анхааруулна)
function sub(label, from, to) {
  const n = html.split(from).length - 1;
  if (!n) console.warn('АНХААРУУЛГА: олдсонгүй ->', label);
  html = html.split(from).join(to);
}
const csslinks = /<link rel="stylesheet" href="lab5\.css">\s*<link rel="stylesheet" href="lab6\.css">/;
if (csslinks.test(html)) html = html.replace(csslinks, '<link rel="stylesheet" href="css/main.css">');
else console.warn('АНХААРУУЛГА: lab5.css/lab6.css <link> олдсонгүй');
sub('<body>', '<body>', '<body class="app">');
sub('<form>', '<form action', '<form class="form" action');
sub('svg icon', '<svg viewBox="0 0 24 24" aria-hidden', '<svg class="theme-toggle__icon" viewBox="0 0 24 24" aria-hidden');
sub('is-open', "'is-open'", "'nav--open'");
sub('is-preview', "'is-preview'", "'app--preview'");
sub('.device-btn', '.device-btn', '.device-bar__btn');
sub('script src', 'src="lab6-effects.js"', 'src="lab7-effects.js"');

// 3) JS
if (!js.includes('.flip-btn')) console.warn('АНХААРУУЛГА: .flip-btn олдсонгүй JS-д');
js = js.split('.flip-btn').join('.flip-card__btn');

fs.writeFileSync('lab7.html', html);
fs.writeFileSync('lab7-effects.js', js);

// 4) Шалгалт: HTML-д ашигласан class бүр compile хийсэн CSS-д байна уу
if (unknown.size) console.warn('АНХААРУУЛГА: мэдэхгүй class:', [...unknown].join(', '));
if (fs.existsSync('css/main.css')) {
  const css = fs.readFileSync('css/main.css', 'utf8');
  const used = new Set();
  html.replace(/class="([^"]*)"/g, (_, v) => v.split(/\s+/).forEach(t => t && used.add(t)));
  const missing = [...used].filter(c => !NO_CSS.has(c) && !new RegExp('\\.' + c + '(?![\\w-])').test(css));
  console.log(missing.length ? 'CSS-д олдоогүй class: ' + missing.join(', ') : 'OK: бүх class CSS-д байна (' + used.size + ')');
}
console.log('Үүссэн: lab7.html, lab7-effects.js');
