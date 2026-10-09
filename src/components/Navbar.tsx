import { useEffect, useRef, useState } from "react";
import { Leaf, Menu, X } from "lucide-react";
import { navLinks } from "../constants";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (!nav.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 900px)");
    const close = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", close);
    return () => desktop.removeEventListener("change", close);
  }, []);

  return (
    <header className="site-header">
      <nav
        ref={nav}
        className="navigation shell"
        aria-label="Main navigation"
        onKeyDown={(event) => {
          if (event.key === "Escape" && open) {
            setOpen(false);
            toggle.current?.focus();
          }
        }}
      >
        <a
          href="#hero"
          className="brand"
          aria-label="Mojito home"
          onClick={() => setOpen(false)}
        >
          <Leaf aria-hidden="true" size={27} /> mojito
          <span className="brand-period">.</span>
        </a>
        <button
          ref={toggle}
          type="button"
          className="nav-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="navigation-links"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <ul
          id="navigation-links"
          className={`nav-links ${open ? "is-open" : ""}`}
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => {
                  setOpen(false);
                  document
                    .querySelector<HTMLElement>(link.href)
                    ?.focus({ preventScroll: true });
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
