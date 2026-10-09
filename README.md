# Mojito

A complete, responsive React + GSAP cocktail showcase. Five original drink illustrations, an interactive collection, and six navigable sections. This is a **fictional design demo**: no real venue, orders, reservations, contact service, or payment flow.

## Run locally

Requires Node.js 22.13+ (22.x), 24.x, or 26+ and npm.

```sh
npm ci
npm run dev
```

## Build and verify

```sh
npm run check
npm run preview
```

`check` runs ESLint, TypeScript, all component tests, a production build, and a portable asset/bundle-budget check. The full app is TypeScript; the build fails on type errors.

Browser tests run against the actual production build:

```sh
npx playwright install --with-deps chromium
npm run build
npm run test:browser
```

For an existing system Chromium, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to its executable. The browser suite enables Chromium's sandbox. Run under a supported, non-root desktop/CI environment; do not disable the sandbox to work around an environment restriction.

## Static hosting

Publish the contents of `dist/` on any ordinary static host. Assets use relative URLs, so the build works at the root or under a directory such as `/demos/mojito/`. Serve over HTTP(S), rather than opening `index.html` as a `file://` URL. No backend, secrets, account, analytics, or third-party network requests are required.

## Interaction and accessibility

- Six native anchor destinations preserve deep links and browser history
- Mobile navigation supports Escape, outside-click dismissal, and breakpoint changes
- The drink collection supports named buttons, previous/next, Left/Right, Home/End, wraparound, and screen-reader announcements
- Skip link, visible focus states, semantic headings, and comfortable touch targets
- `prefers-reduced-motion` removes GSAP motion and smooth scrolling, including changes made during a session
- No autoplay, pinned scrolling, hidden content awaiting animation, or heavy video downloads

See [verification details](docs/VERIFICATION.md) and [asset provenance](docs/ASSETS.md). The older README's external demo URL referred to an earlier prototype and has intentionally been removed; it is not evidence for this revision.
