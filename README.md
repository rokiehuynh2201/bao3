# Một cột mốc – Ngàn lời tri ân

A complete Vietnamese graduation invitation website for Huỳnh Gia Bảo, Đinh Lê Phúc Duy and Nguyễn Anh Duy, dedicated to OpenWay Việt Nam.

- Event: **13:30, Saturday 28 November 2026 (UTC+7)**.
- Venue: **Trường Đại học Bách khoa – ĐHQG TP.HCM, cơ sở Lý Thường Kiệt, 268 Lý Thường Kiệt, TP.HCM**.
- Responsive layout, local Vietnamese fonts, reduced-motion support and keyboard navigation.
- Live countdown, `.ics` calendar export, Google Maps link, share/copy fallback, invitation preview and high-resolution PNG/PDF downloads.

## Run locally

Requires Node.js. The website itself has no runtime dependencies or build step.

```sh
npm run dev
```

Open the printed local URL, normally `http://127.0.0.1:4173`.

## Test

```sh
npm ci
npm test
```

Tests cover time conversion, countdown boundaries, UTF-8 calendar format, mobile navigation, download actions, dialog focus restoration and clipboard fallback. The development dependency `jsdom` is used only for tests.

## Hosting

Serve the `dist/` directory on a static host. All fonts, artwork and download files are local. The `.openai/hosting.json` file binds this checkout to its Sites project. Social metadata in `dist/index.html` should be updated if deploying to a different domain.

## Assets

- OpenWay logo: original file from https://openwaygroup.com/hubfs/Imported%20images/OW_Logotype_RGB_99x28_s2.png, unchanged colors and proportions.
- Architecture illustration: generated using the built-in imagegen tool, based on the Bách khoa alumni site's main-entrance photograph: https://bka.hcmut.edu.vn/portal-contact-us. Original illustration and prompt remain in the parent workspace's `assets/` directory.
- Cormorant Garamond and Be Vietnam Pro: bundled with their SIL Open Font License notices in `dist/assets/fonts/`.
- The invitation PNG and PDF contain the full supplied Vietnamese text. They are preserved from the preceding invitation-design task.

## Verification limit

Actual browser visual QA could not run in this environment: the CUA browser access host was unavailable. Static HTTP/asset checks and the Node/jsdom tests were run. jsdom does not verify layout rendering.
