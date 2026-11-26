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
