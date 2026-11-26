import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSDOM } from 'jsdom';
import { getCountdown, createCalendarEvent } from '../dist/event.mjs';

const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const app = (await readFile(new URL('../dist/app.mjs', import.meta.url), 'utf8')).replace(/^import[^;]+;\s*/, '');

function setup({ clipboardFails = false, nowSequence } = {}) {
  const dom = new JSDOM(html, { url: 'http://127.0.0.1:4173/#hen-gap', runScripts: 'outside-only', pretendToBeVisual: true });
  const w = dom.window;
  const downloaded = [];
  let timeIndex = 0;
  w.getCountdown = () => nowSequence ? getCountdown(nowSequence[Math.min(timeIndex++, nowSequence.length - 1)]) : getCountdown();
  w.createCalendarEvent = createCalendarEvent;
  w.matchMedia = () => ({ matches: true, addEventListener() {} });
  w.URL.createObjectURL = () => 'blob:calendar';
  w.URL.revokeObjectURL = () => {};
  Object.defineProperty(w.navigator, 'clipboard', { value: { writeText: async text => { if (clipboardFails) throw new Error('Permission denied'); w.copiedText = text; } } });
  w.HTMLDialogElement.prototype.showModal = function () { this.open = true; };
  w.HTMLDialogElement.prototype.close = function () { this.open = false; this.dispatchEvent(new w.Event('close')); };
  w.HTMLAnchorElement.prototype.click = function () { downloaded.push({ name: this.download, href: this.href }); };
  w.eval(app);
  w.clockReads = () => timeIndex;
  return { dom, w, $: selector => w.document.querySelector(selector), downloaded };
}

test('mobile menu opens, closes on navigation and supports Escape', t => {
  const { dom, w, $ } = setup(); t.after(() => dom.window.close());
  $('.menu-toggle').click();
  assert.equal($('#mobile-nav').hidden, false);
  assert.equal($('.menu-toggle').getAttribute('aria-expanded'), 'true');
  const link = $('#mobile-nav a');
  link.addEventListener('click', event => event.preventDefault());
  link.dispatchEvent(new w.MouseEvent('click', { bubbles: true, cancelable: true }));
  assert.equal($('#mobile-nav').hidden, true);
  $('.menu-toggle').click();
  w.document.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'Escape' }));
  assert.equal($('#mobile-nav').hidden, true);
  assert.equal(w.document.activeElement, $('.menu-toggle'));
});

test('countdown initializes from one clock read so the event boundary cannot stop updates early', t => {
  const start = Date.parse('2026-11-28T06:30:00Z');
  const { dom, w, $ } = setup({ nowSequence: [start - 1, start] }); t.after(() => dom.window.close());
  assert.equal(w.clockReads(), 1);
  assert.equal($('[data-count="seconds"]').textContent, '01');
});

test('invitation preview opens, downloads both files and restores focus', t => {
  const { dom, w, $ } = setup(); t.after(() => dom.window.close());
  const opener = $('[data-open-invitation]');
  opener.click();
  assert.equal($('#invitation-dialog').open, true);
  assert.equal(w.document.body.classList.contains('modal-open'), true);
  for (const link of w.document.querySelectorAll('.dialog-actions a')) assert.ok(link.download !== undefined && /\.(png|pdf)$/.test(link.href));
  $('[data-close-dialog]').click();
  assert.equal($('#invitation-dialog').open, false);
  assert.equal(w.document.body.classList.contains('modal-open'), false);
  assert.equal(w.document.activeElement, opener);
});

test('save calendar produces an ICS download and clear next-step feedback', t => {
  const { dom, $, downloaded } = setup(); t.after(() => dom.window.close());
  $('#save-calendar').click();
  assert.deepEqual(downloaded, [{ name: 'tot-nghiep-bach-khoa-28-11-2026.ics', href: 'blob:calendar' }]);
  assert.match($('#toast').textContent, /Mở tệp .ics/);
});

test('share copies the clean page URL', async t => {
  const { dom, w, $ } = setup(); t.after(() => dom.window.close());
  $('#share-invitation').click();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(w.copiedText, 'http://127.0.0.1:4173/');
  assert.match($('#toast').textContent, /Đã sao chép/);
});

test('denied clipboard access exposes a selectable URL and restores sharing focus', async t => {
  const { dom, w, $ } = setup({ clipboardFails: true }); t.after(() => dom.window.close());
  const opener = $('#share-invitation');
  opener.click();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal($('#share-dialog').open, true);
  assert.equal($('#share-url').value, 'http://127.0.0.1:4173/');
  $('[data-close-share]').click();
  assert.equal(w.document.activeElement, opener);
});
