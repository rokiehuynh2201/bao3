export const EVENT_START = Date.parse('2026-11-28T13:30:00+07:00');
export const EVENT_LOCATION = 'Trường Đại học Bách khoa – ĐHQG TP.HCM, 268 Lý Thường Kiệt, TP.HCM';

export function getCountdown(now = Date.now()) {
  const remaining = Math.max(0, Math.ceil((EVENT_START - now) / 1000));
  return {
    days: Math.floor(remaining / 86400),
    hours: Math.floor(remaining / 3600) % 24,
    minutes: Math.floor(remaining / 60) % 60,
    seconds: remaining % 60,
    started: now >= EVENT_START,
  };
}

function escapeText(text) {
  return text.replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/;/g, '\\;').replace(/,/g, '\\,');
}

function foldLine(line) {
  const lines = [];
  let part = '';
  let bytes = 0;
  for (const char of line) {
    const length = new TextEncoder().encode(char).length;
    if (bytes + length > 75) {
      lines.push(part);
      part = ' ';
      bytes = 1;
    }
    part += char;
    bytes += length;
  }
  lines.push(part);
  return lines.join('\r\n');
}

export function createCalendarEvent() {
  const description = 'Lời mời tốt nghiệp của Huỳnh Gia Bảo, Đinh Lê Phúc Duy và Nguyễn Anh Duy gửi đại gia đình OpenWay Việt Nam. Hẹn anh chị lúc 13:30 tại cơ sở Lý Thường Kiệt để chung vui và lưu giữ khoảnh khắc ý nghĩa này.';
  return [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Graduation OpenWay//Invitation VI//EN',
    'CALSCALE:GREGORIAN', 'BEGIN:VEVENT',
    'UID:graduation-20261128-bao-phucduy-anhduy@openway-graduation',
    'DTSTAMP:20261126T000000Z', 'DTSTART:20261128T063000Z',
    `SUMMARY:${escapeText('Một cột mốc – Ngàn lời tri ân | Lễ tốt nghiệp')}`,
    `DESCRIPTION:${escapeText(description)}`,
    `LOCATION:${escapeText(EVENT_LOCATION)}`,
    'STATUS:CONFIRMED', 'TRANSP:TRANSPARENT', 'END:VEVENT', 'END:VCALENDAR',
  ].map(foldLine).join('\r\n') + '\r\n';
}
