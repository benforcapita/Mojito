import { useRef, useState, type KeyboardEvent } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { menuItems } from "../constants";
import DrinkIllustration from "./DrinkIllustration";

export default function Menu() {
  const [index, setIndex] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const current = menuItems[index];
  const move = (delta: number) =>
    setIndex((value) => (value + delta + menuItems.length) % menuItems.length);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(panel.current?.querySelector(".menu-illustration") ?? null, {
          x: 12,
          duration: 0.35,
          ease: "power2.out",
        });
      });
      return () => media.revert();
    },
    { dependencies: [index], scope: panel, revertOnUpdate: true },
  );

  function handleKeys(event: KeyboardEvent<HTMLElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === "ArrowRight") move(1);
    else if (event.key === "ArrowLeft") move(-1);
    else if (event.key === "Home") setIndex(0);
    else if (event.key === "End") setIndex(menuItems.length - 1);
    else return;
    event.preventDefault();
  }

  return (
    <section
      id="menu"
      tabIndex={-1}
      className="section-pad section-target menu-section"
      aria-labelledby="menu-title"
      onKeyDown={handleKeys}
    >
      <div className="shell">
        <div className="section-heading menu-heading">
          <div>
            <p className="eyebrow">04 / The collection</p>
            <h2 id="menu-title">
              Pick your <em>kind of fresh.</em>
            </h2>
          </div>
          <p>
            Five illustrated concepts.
            <br />
            Find your favorite flavor story.
          </p>
        </div>
        <div
          className="menu-selectors"
          role="group"
          aria-label="Choose a cocktail"
        >
          {menuItems.map((drink, i) => (
            <button
              type="button"
              key={drink.id}
              aria-label={`Show ${drink.name}`}
              aria-pressed={i === index}
              aria-controls="cocktail-detail"
              onClick={() => setIndex(i)}
            >
              {drink.name.replace(" Mojito", "")}
            </button>
          ))}
        </div>
        <div
          ref={panel}
          id="cocktail-detail"
          className="menu-panel"
          role="group"
          aria-roledescription="slide"
          aria-label={`${index + 1} of ${menuItems.length}: ${current.name}`}
        >
          <div
            className="menu-art"
            style={{ backgroundColor: `${current.color}33` }}
          >
            <span className="menu-art-number" aria-hidden="true">
              0{index + 1}
            </span>
            <DrinkIllustration
              className="menu-illustration"
              color={current.color}
              deep={current.deep}
              label={`Original illustration of ${current.name}`}
            />
          </div>
          <div className="menu-copy">
            <p className="eyebrow">{current.note}</p>
            <h3>{current.name}</h3>
            <p className="flavor-note">{current.flavor}</p>
            <p className="menu-description">{current.description}</p>
            <h4>In the glass</h4>
            <ul className="ingredients">
              {current.ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
            <p className="concept-note">
              Illustrative drink concept. No ordering or booking.
            </p>
          </div>
        </div>
        <div className="menu-controls">
          <p className="keyboard-hint">
            Use the buttons or ← → keys to explore.
          </p>
          <div>
            <button
              type="button"
              className="round-button"
              aria-label="Previous cocktail"
              aria-controls="cocktail-detail"
              onClick={() => move(-1)}
            >
              <ArrowLeft size={20} aria-hidden="true" />
            </button>
            <span className="slide-count" aria-hidden="true">
              0{index + 1} / 05
            </span>
            <button
              type="button"
              className="round-button"
              aria-label="Next cocktail"
              aria-controls="cocktail-detail"
              onClick={() => move(1)}
            >
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
        <p
          className="sr-only"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {index + 1} of {menuItems.length}: {current.name}
        </p>
      </div>
    </section>
  );
}
