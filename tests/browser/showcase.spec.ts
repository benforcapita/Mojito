import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("all sections, repeated navigation, history, and first-load assets work", async ({
  page,
  isMobile,
}, testInfo) => {
  const errors: string[] = [];
  const failed: string[] = [];
  const remote: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("response", (response) => {
    if (response.status() >= 400)
      failed.push(`${response.status()} ${response.url()}`);
  });
  page.on("request", (request) => {
    if (!request.url().startsWith("http://127.0.0.1:4187"))
      remote.push(request.url());
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  for (const name of [
    "Menu",
    "About",
    "Art",
    "Cocktails",
    "Demo notes",
    "Home",
    "Menu",
  ]) {
    if (isMobile)
      await page.getByRole("button", { name: "Open navigation" }).click();
    const link = page
      .getByRole("navigation")
      .getByRole("link", { name, exact: true });
    const href = await link.getAttribute("href");
    await link.click();
    await expect(page).toHaveURL(new RegExp(`${href}$`));
    const target = page.locator(href!);
    await expect(target).toBeInViewport();
    await expect.poll(() => target.evaluate((element) => {
      const scrollMargin = parseFloat(getComputedStyle(element).scrollMarginTop);
      const scrollPadding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop);
      const targetY = window.scrollY + element.getBoundingClientRect().top - scrollMargin - scrollPadding;
      const expectedY = Math.max(0, Math.min(targetY, document.documentElement.scrollHeight - window.innerHeight));
      return Math.abs(window.scrollY - expectedY);
    })).toBeLessThan(2);
    await expect(target.locator("h1,h2").first()).toBeVisible();
    await expect
      .poll(() =>
        target.evaluate((element) =>
          Math.round(element.getBoundingClientRect().top),
        ),
      )
      .toBeGreaterThanOrEqual(60);
    if (isMobile)
      await expect(
        page.getByRole("button", { name: "Open navigation" }),
      ).toHaveAttribute("aria-expanded", "false");
  }
  await page.goBack();
  await expect(page).toHaveURL(/#hero$/);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await page.goForward();
  await expect(page).toHaveURL(/#menu$/);
  await expect.poll(() => page.locator('#menu').evaluate((element) => {
    const offset = parseFloat(getComputedStyle(element).scrollMarginTop) + parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop);
    return Math.abs(element.getBoundingClientRect().top - offset);
  })).toBeLessThan(2);
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    )
    .toBe(true);
  await page.screenshot({
    path: `test-results/${testInfo.project.name}-menu.png`,
    fullPage: false,
  });
  await page.goto("/#hero");
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await page.screenshot({
    path: `test-results/${testInfo.project.name}-hero.png`,
    fullPage: false,
  });
  expect(errors).toEqual([]);
  expect(failed).toEqual([]);
  expect(remote).toEqual([]);
});

test("menu remains consistent through repeated, rapid and keyboard selections", async ({
  page,
}) => {
  await page.goto("/#menu");
  const heading = page.locator("#cocktail-detail h3");
  await expect(heading).toHaveText("Classic Mojito");
  const next = page.getByRole("button", { name: "Next cocktail" });
  const previous = page.getByRole("button", { name: "Previous cocktail" });
  for (let i = 0; i < 12; i += 1) await next.click({ delay: 5 });
  await expect(heading).toHaveText("Passion Fruit Mojito");
  await previous.click();
  await expect(heading).toHaveText("Strawberry Mojito");
  const coconut = page.getByRole("button", { name: "Show Coconut Mojito" });
  await coconut.click();
  await expect(coconut).toHaveAttribute("aria-pressed", "true");
  await expect(heading).toHaveText("Coconut Mojito");
  await next.focus();
  await page.keyboard.press("ArrowRight");
  await expect(heading).toHaveText("Watermelon Mojito");
  await page.keyboard.press("ArrowRight");
  await expect(heading).toHaveText("Classic Mojito");
  await page.keyboard.press("End");
  await expect(heading).toHaveText("Watermelon Mojito");
  await page.keyboard.press("Home");
  await expect(heading).toHaveText("Classic Mojito");
  await expect(page.getByRole("status")).toHaveText("1 of 5: Classic Mojito");
  await expect(heading).toBeVisible();
  await expect(page.locator(".menu-illustration")).toBeVisible();
});

test("keyboard access and mobile disclosure recover after dismissal and resize", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
  if (isMobile) {
    const toggle = page.getByRole("button", { name: "Open navigation" });
    await toggle.focus();
    await page.keyboard.press("Enter");
    await page.keyboard.press("Tab");
    await expect(
      page
        .getByRole("navigation")
        .getByRole("link", { name: "Home", exact: true }),
    ).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(toggle).toBeFocused();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();
    await page.locator(".hero-footnote").click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();
    await page.setViewportSize({ width: 1100, height: 900 });
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
  }
});

test("accessible semantics, readable colors and reduced-motion preferences", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  if (testInfo.project.name === "reduced-motion") {
    expect(
      await page.evaluate(
        () => matchMedia("(prefers-reduced-motion: reduce)").matches,
      ),
    ).toBe(true);
    expect(
      await page.evaluate(
        () => getComputedStyle(document.documentElement).scrollBehavior,
      ),
    ).toBe("auto");
    await page.goto("/#menu");
    await page.getByRole("button", { name: "Next cocktail" }).click();
    expect(
      await page
        .locator(".menu-illustration")
        .evaluate((element) => (element as SVGElement).style.transform),
    ).toBe("");
    expect(
      await page
        .locator("[data-reveal]")
        .evaluateAll((elements) =>
          elements.every(
            (element) => !(element as HTMLElement).style.transform,
          ),
        ),
    ).toBe(true);
  }
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});

test("narrow layouts and live motion preference changes preserve controls", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto("/#menu");
  await expect(
    page.getByRole("button", { name: "Next cocktail" }),
  ).toBeVisible();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(320);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.getByRole("button", { name: "Next cocktail" }).click();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect
    .poll(() =>
      page
        .locator(".menu-illustration")
        .evaluate((element) => (element as SVGElement).style.transform),
    )
    .toBe("");
  await expect(page.locator("#cocktail-detail h3")).toHaveText(
    "Strawberry Mojito",
  );
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Art", exact: true })
    .click();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Menu", exact: true })
    .click();
  await expect(page).toHaveURL(/#menu$/);
  await expect(page.locator("#menu")).toBeInViewport();
});
