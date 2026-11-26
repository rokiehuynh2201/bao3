import { getCountdown } from './event.mjs';

const $ = (selector) => document.querySelector(selector);
const menuToggle = $('.menu-toggle');
const mobileNav = $('#mobile-nav');
function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Mở menu');
  mobileNav.hidden = true;
}

menuToggle.addEventListener('click', () => {
  const opened = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!opened));
  menuToggle.setAttribute('aria-label', opened ? 'Mở menu' : 'Đóng menu');
  mobileNav.hidden = opened;
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileNav.hidden) {
    closeMenu();
    menuToggle.focus();
  }
});
matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

let countdownInterval;
function updateCountdown() {
  const countdown = getCountdown();
  for (const unit of ['days', 'hours', 'minutes', 'seconds']) {
    $(`[data-count="${unit}"]`).textContent = String(countdown[unit]).padStart(2, '0');
  }
  if (countdown.started) {
    $('#countdown-heading').textContent = 'Một cột mốc, ngàn lời tri ân';
    $('#countdown-message').hidden = false;
    clearInterval(countdownInterval);
  }
}
countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();
document.addEventListener('visibilitychange', () => { if (!document.hidden) updateCountdown(); });

if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .08 });
  document.documentElement.classList.add('motion-ready');
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}
