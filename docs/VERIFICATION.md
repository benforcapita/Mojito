# Verification

## Automated checks

`npm run check` runs:

1. ESLint over the TypeScript app and test files.
2. TypeScript checking for the full app, test suite, and Vite/Vitest/Playwright configuration.
3. Seven component regressions covering mobile navigation dismissal, selection, carousel wraparound and keyboard input, working section destinations, demo labeling, and named controls.
4. The production static build.
5. Relative asset existence and a 400 KB raw / 130 KB gzip static asset budget.

The component regressions were first run against the original application and all seven failed on the missing behavior, then passed with the completed implementation.

## Browser coverage

`npm run test:browser` uses the actual production build, one worker, and Chromium's sandbox. It runs five scenarios in each of three configurations: desktop (1440 × 1000), mobile touch (390 × 664, 1× device scale), and desktop with reduced motion.

Coverage includes six-section navigation, repeated navigation, browser Back/Forward, first-load asset requests, console/runtime errors, rapid drink changes and wraparound, keyboard arrows/Home/End, screen-reader announcements, skip link, mobile Escape/outside click/breakpoint recovery, a 320 px layout, live reduced-motion preference changes, and automated WCAG 2 A/AA and 2.1 AA checks through axe-core.

Browser screenshots and JSON results are written to `test-results/`, excluded from source control. CI uploads the directory as a verification artifact. On the Ubuntu 24.04 runner it uses the preinstalled Google Chrome binary at `/opt/google/chrome/chrome`, with the Chromium sandbox enabled, rather than changing host security settings to launch a downloaded browser.

## Boundaries

Automated accessibility checks do not replace manual assistive-technology testing. Real iOS Safari, Firefox, and screen readers are not covered by the Chromium suite. The mobile configuration emulates a touch viewport; it is not a physical-device test. Bundle budgets are reproducible performance safeguards, not a Lighthouse score or a claim about real-world network timing.

This is a static fictional showcase, not a real bar, booking system, or ordering product. It intentionally has no contact capture, external service, backend, or payment integration. Asset provenance and runtime licenses are documented in [ASSETS.md](ASSETS.md).

## Dependency review

The runtime and full dependency audits both reported zero known vulnerabilities on October 9, 2026. The locked toolchain was updated, and unused Tailwind dependencies removed. Run `npm audit` again when reviewing or updating dependencies; an audit result is time-bound and is not a guarantee of security. CI fails on high or critical audit findings.
