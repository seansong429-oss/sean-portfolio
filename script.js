const root = document.documentElement;
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');
const themeLabel = document.querySelector('.theme-label');

function closeMenu() {
  nav.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', '打开导航菜单');
}

navToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? '关闭导航菜单' : '打开导航菜单');
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); navToggle.focus(); }
});
document.addEventListener('click', (event) => {
  if (!nav.contains(event.target) && !navToggle.contains(event.target)) closeMenu();
});

function syncThemeButton() {
  const dark = root.dataset.theme === 'dark';
  themeToggle.setAttribute('aria-pressed', String(dark));
  themeToggle.setAttribute('aria-label', dark ? '切换为浅色模式' : '切换为深色模式');
  themeLabel.textContent = dark ? '浅色模式' : '深色模式';
}

syncThemeButton();
themeToggle.addEventListener('click', () => {
  const dark = root.dataset.theme !== 'dark';
  if (dark) root.dataset.theme = 'dark'; else delete root.dataset.theme;
  try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (_) {}
  syncThemeButton();
});
