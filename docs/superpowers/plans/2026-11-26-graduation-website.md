# Graduation invitation website implementation plan

> Execute inline using the Sites workflow. The user's request authorizes the implementation of the already chosen invitation concept.

**Goal:** A complete responsive Vietnamese graduation invitation website for OpenWay colleagues.
**Architecture:** Buildless static HTML, CSS and ES modules; no application server or guest data collection. Assets and fonts are bundled locally. Publish the completed site with Sites.
**Tech stack:** HTML5, CSS, browser JavaScript, Node built-in tests.
**Spec:** Original invitation brief and approved card in ../output; confirmed campus is 268 Lý Thường Kiệt, TP.HCM.

## Constraints
- Preserve the three full names and all invitation content, including Vietnamese accents.
- Event starts at 13:30 Asia/Ho_Chi_Minh on 2026-11-28. Do not invent an end time.
- White, navy, pale blue and champagne; preserve the official OpenWay logo and watercolor artwork.
- Accessible keyboard controls, reduced-motion support, readable mobile layouts.
- No invented RSVP collection or attendance confirmations.

## Review focus
- Countdown must clamp at zero once the start time is reached, including when a device is outside Vietnam.
- Calendar file must carry the exact time and Unicode location; no guessed event duration.
- All download, map and navigation actions must work.
- Mobile menu, keyboard focus and reduced-motion behavior must be usable.
- Asset requests and page console must be error-free at desktop and mobile widths.

## Task 1: event behavior
- [x] Write tests for countdown before/at/after the event and calendar encoding.
- [x] Run tests and observe missing-feature failures.
- [x] Implement dist/event.mjs, then pass the complete suite.

## Task 2: website
- [x] Bundle illustration, original logo, fonts and both invitation downloads.
- [x] Implement dist/index.html, styles.css and app.mjs: hero, full invitation, journey, event details, live countdown, calendar, map, downloads, share and mobile navigation.
- [x] Serve locally; HTTP, asset and anchor checks pass. Nine Node/jsdom tests exercise the main controls. Actual desktop/mobile visual QA is unverified because the CUA browser host was unavailable.

## Task 3: delivery
- [x] Review the final source against the brief and fix material issues.
- [x] Run full tests and static/asset checks.
- [ ] Synchronize exact source, package, publish privately with Sites and report the verified URL.
