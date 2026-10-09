import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";
import Navbar from "../src/components/Navbar";
import Menu from "../src/components/Menu";

describe("navigation", () => {
  it("opens mobile navigation, closes on Escape, and returns focus", async () => {
    render(<Navbar />);
    const user = userEvent.setup();
    const toggle = screen.getByRole("button", { name: "Open navigation" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    await user.tab();
    await user.keyboard("{Escape}");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveFocus();
  });
  it("closes mobile navigation after choosing a real section link", async () => {
    render(<Navbar />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Open navigation" }));
    await user.click(screen.getByRole("link", { name: "Menu" }));
    expect(
      screen.getByRole("button", { name: "Open navigation" }),
    ).toHaveAttribute("aria-expanded", "false");
  });
});

describe("cocktail menu", () => {
  it("cycles in both directions and wraps after repeated clicks", async () => {
    render(<Menu />);
    const user = userEvent.setup();
    const next = screen.getByRole("button", { name: "Next cocktail" });
    const previous = screen.getByRole("button", { name: "Previous cocktail" });
    expect(
      screen.getByRole("heading", { name: "Classic Mojito" }),
    ).toBeVisible();
    await user.click(previous);
    expect(
      screen.getByRole("heading", { name: "Watermelon Mojito" }),
    ).toBeVisible();
    await user.click(next);
    for (let i = 0; i < 5; i += 1) await user.click(next);
    expect(
      screen.getByRole("heading", { name: "Classic Mojito" }),
    ).toBeVisible();
  });
  it("selects named drinks and supports Arrow, Home and End keys", async () => {
    render(<Menu />);
    const user = userEvent.setup();
    const selector = screen.getByRole("button", {
      name: "Show Coconut Mojito",
    });
    await user.click(selector);
    expect(selector).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByRole("heading", { name: "Coconut Mojito" }),
    ).toBeVisible();
    await user.keyboard("{ArrowRight}");
    expect(
      screen.getByRole("heading", { name: "Watermelon Mojito" }),
    ).toBeVisible();
    await user.keyboard("{Home}");
    expect(
      screen.getByRole("heading", { name: "Classic Mojito" }),
    ).toBeVisible();
    await user.keyboard("{End}");
    expect(
      screen.getByRole("heading", { name: "Watermelon Mojito" }),
    ).toBeVisible();
    expect(screen.getByRole("status")).toHaveTextContent(
      "5 of 5: Watermelon Mojito",
    );
  });
});

describe("complete, honest showcase", () => {
  it("provides a main landmark, skip link and six working section destinations", () => {
    render(<App />);
    const main = screen.getByRole("main");
    expect(
      screen.getByRole("link", { name: "Skip to content" }),
    ).toHaveAttribute("href", "#main-content");
    for (const id of ["hero", "cocktails", "about", "art", "menu"])
      expect(main.querySelector(`#${id}`)).not.toBeNull();
    expect(document.querySelector("#contact")).not.toBeNull();
  });
  it("labels the fictional experience and never offers fake contact or booking links", () => {
    render(<App />);
    expect(screen.getAllByText(/fictional.*showcase/i).length).toBeGreaterThan(
      0,
    );
    for (const link of screen.getAllByRole("link")) {
      const href = link.getAttribute("href") ?? "";
      expect(href).not.toBe("#");
      expect(href).not.toMatch(/^(mailto:|tel:)/);
    }
    expect(
      within(screen.getByRole("contentinfo")).getByText(/no real venue/i),
    ).toBeVisible();
  });
  it("has accessible names for all buttons and no missing or third-party media", () => {
    render(<App />);
    for (const button of screen.getAllByRole("button"))
      expect(button).toHaveAccessibleName();
    expect(document.querySelector("video")).toBeNull();
    for (const img of screen.getAllByRole("img"))
      expect(img.getAttribute("src") ?? "").not.toMatch(/^https?:/);
  });
});
