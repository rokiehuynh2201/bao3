import test from 'node:test';
import assert from 'node:assert/strict';

const event = await import('../dist/event.mjs').catch(() => ({}));

test('countdown uses the absolute event instant in Vietnam', () => {
  assert.equal(typeof event.getCountdown, 'function', 'countdown feature must exist');
  assert.deepEqual(event.getCountdown(Date.parse('2026-11-26T07:30:00Z')), { days: 2, hours: 0, minutes: 0, seconds: 0, started: false });
  assert.deepEqual(event.getCountdown(Date.parse('2026-11-28T07:29:59Z')), { days: 0, hours: 0, minutes: 0, seconds: 1, started: false });
});

test('countdown never shows negative values at or after the event', () => {
  assert.equal(typeof event.getCountdown, 'function', 'countdown feature must exist');
  for (const time of ['2026-11-28T07:30:00Z', '2026-12-01T00:00:00Z']) {
    assert.deepEqual(event.getCountdown(Date.parse(time)), { days: 0, hours: 0, minutes: 0, seconds: 0, started: true });
  }
});

test('calendar carries the confirmed 14:30-15:00 Vietnam time range, names and campus', () => {
  assert.equal(typeof event.createCalendarEvent, 'function', 'calendar feature must exist');
  const ics = event.createCalendarEvent();
  const unfolded = ics.replace(/\r\n[ \t]/g, '');
  assert.match(ics, /DTSTART:20261128T073000Z\r\n/);
  assert.match(unfolded, /Huỳnh Gia Bảo/);
  assert.match(unfolded, /Đinh Lê Phúc Duy/);
  assert.match(unfolded, /Nguyễn Anh Duy/);
  assert.match(unfolded, /268 Lý Thường Kiệt/);
  assert.match(ics, /DTEND:20261128T080000Z\r\n/);
  assert.doesNotMatch(ics, /DURATION/);
  assert.doesNotMatch(ics, /METHOD:/, 'standalone calendar export must not declare the organizer-based iTIP PUBLISH protocol');
  assert.ok(ics.endsWith('END:VCALENDAR\r\n'));
  assert.ok(ics.split('\r\n').every(line => Buffer.byteLength(line, 'utf8') <= 75), 'ICS lines must fold on UTF-8 boundaries');
});
