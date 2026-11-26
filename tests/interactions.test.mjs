import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSDOM } from 'jsdom';
import { getCountdown } from '../dist/event.mjs';

const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const app = (await readFile(new URL('../dist/app.mjs', import.meta.url), 'utf8')).replace(/^import[^;]+;\s*/, '');

function setup({ nowSequence } = {}) {
  const dom = new JSDOM(html, { url: 'http://127.0.0.1:4173/#hen-gap', runScripts: 'outside-only', pretendToBeVisual: true });
  const w = dom.window;
  let timeIndex = 0;
  w.getCountdown = () => nowSequence ? getCountdown(nowSequence[Math.min(timeIndex++, nowSequence.length - 1)]) : getCountdown();
  w.matchMedia = () => ({ matches: true, addEventListener() {} });
  w.eval(app);
  w.clockReads = () => timeIndex;
  return { dom, w, $: selector => w.document.querySelector(selector) };
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
