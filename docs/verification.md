# Verification record

- Native implementation and the complete original invitation copy reviewed.
- Countdown before/at/after the event and the initialization boundary tested.
- UTC calendar instant corresponds to 13:30 Vietnam, 28 November 2026.
- UTF-8 calendar lines fold within 75 bytes; no invented duration or end time.
- Mobile menu, Escape, invitation dialog, download actions, share/copy and clipboard-denied fallback tested with jsdom.
- Nine Node tests pass. Asset/anchor/HTTP checks pass.
- Independent read-only review completed. Calendar METHOD protocol declaration removed and gold/muted contrast strengthened. Both calendar and countdown corrections verified with failing tests before fixes, then full green suite.
- CUA browser access host unavailable. Layout rendering, native OS sharing and actual calendar-app import remain unverified.
- Publishing uses the existing private Sites project; no audience change was requested.

## 2026-11-26 content and photo update

- Removed the requested journey heading, matching hero subtitle, event eyebrow, calendar control, invitation download control and sharing control. Removed their dialog markup and event handlers.
- Reflowed the invitation letter into one centered column after removing the large heading.
- The 2566 x 1924 OpenWay JPEG now loads eagerly at high priority and is outside the reveal animation, preventing its initial opacity/translation transition. The original photograph is unchanged.
- Removed the four interaction tests for the deleted controls. All five remaining Node tests pass.
- Verified HTTP 200 responses for the page and all eight referenced local resources; accessible labels and navigation anchors resolve. JavaScript syntax checked.
- Browser access host remains unavailable; actual mobile rendering has not been visually verified.

## Free public hosting request

- User requested free hosting and explicitly selected access for anyone with the link.
- Publish the current source to the existing Sites project and then change its audience to public.
- Canonical and Open Graph URLs now point to the free chatgpt.site hostname.
- The pending custom-domain setup was removed because the user does not own bkuopenway.com.

## 2026-11-26 Vercel social preview and time correction

- Confirmed the production page and group photo return HTTP 200 without authentication, including the Facebook crawler user agent. The production page was missing og:image.
- Restored canonical and Open Graph URLs using the confirmed Vercel production domain. Added image MIME type, actual dimensions, alternate text and Twitter large-image metadata.
- Changed website event information and share descriptions to 14:30–15:00 on 28 November 2026 (Vietnam time). Countdown targets 14:30; the calendar utility uses 07:30–08:00 UTC.
- Existing countdown and calendar tests were updated first: three failed against the old time before the implementation changed.
- Original downloadable invitation artwork is retained as an archive; the social preview uses the current group photograph rather than artwork containing the previous printed time.
