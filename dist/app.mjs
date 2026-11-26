import { getCountdown, createCalendarEvent } from './event.mjs';

const $ = (selector) => document.querySelector(selector);
const menuToggle = $('.menu-toggle');
const mobileNav = $('#mobile-nav');
const invitationDialog = $('#invitation-dialog');
const shareDialog = $('#share-dialog');
let toastTimer;
let activeDialogTrigger;

function toast(message) {
  const element = $('#toast');
  clearTimeout(toastTimer);
  element.textContent = message;
  element.classList.add('visible');
  toastTimer = setTimeout(() => element.classList.remove('visible'), 4500);
}

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

function openDialog(dialog, trigger) {
  activeDialogTrigger = trigger;
  dialog.showModal();
  document.body.classList.add('modal-open');
}

document.querySelectorAll('[data-open-invitation]').forEach(button => {
  button.addEventListener('click', () => openDialog(invitationDialog, button));
});
$('[data-close-dialog]').addEventListener('click', () => invitationDialog.close());
$('[data-close-share]').addEventListener('click', () => shareDialog.close());
for (const dialog of [invitationDialog, shareDialog]) {
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    activeDialogTrigger?.focus({ preventScroll: true });
  });
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
}

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

$('#save-calendar').addEventListener('click', () => {
  const file = new Blob([createCalendarEvent()], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'tot-nghiep-bach-khoa-28-11-2026.ics';
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
  toast('Đã tạo lịch hẹn. Mở tệp .ics vừa tải để thêm vào lịch của anh chị.');
});

const shareUrl = new URL(location.href);
shareUrl.hash = '';
shareUrl.search = '';
$('#share-url').value = shareUrl.href;

async function copyLink() {
  try {
    await navigator.clipboard.writeText(shareUrl.href);
    toast('Đã sao chép đường dẫn lời mời.');
    return true;
  } catch {
    return false;
  }
}

$('#share-invitation').addEventListener('click', async event => {
  const trigger = event.currentTarget;
  if (navigator.share) {
    try {
      await navigator.share({ title: 'Một cột mốc – Ngàn lời tri ân', text: 'Hẹn anh chị OpenWay lúc 13:30, Thứ Bảy 28.11.2026 tại Bách khoa – cơ sở Lý Thường Kiệt.', url: shareUrl.href });
      return;
    } catch (error) {
      if (error.name === 'AbortError') return;
    }
  }
  if (await copyLink()) return;
  openDialog(shareDialog, trigger);
  $('#share-url').focus();
  $('#share-url').select();
});
$('#copy-link').addEventListener('click', async () => {
  if (await copyLink()) shareDialog.close();
  else {
    $('#share-url').focus();
    $('#share-url').select();
    $('#share-title').textContent = 'Nhấn giữ hoặc Ctrl+C để sao chép';
  }
});

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
