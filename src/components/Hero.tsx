import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import DrinkIllustration from "./DrinkIllustration";
import { useSectionMotion } from "../lib/gsap";

export default function Hero() {
  const scope = useSectionMotion();
  return (
    <section
      ref={scope}
      id="hero"
      tabIndex={-1}
      className="hero section-target"
      aria-labelledby="hero-title"
    >
      <div className="shell hero-grid">
        <div className="hero-copy" data-reveal>
          <p className="eyebrow">
            <span className="status-dot" /> A fictional cocktail showcase
          </p>
          <h1 id="hero-title">
            Fresh mint.
            <br />
            Good spirits.
            <br />
            <em>Pure mojito.</em>
          </h1>
          <p className="hero-description">
            A little citrus. A little sparkle. A fresh perspective on a timeless
            classic. Explore five playful expressions of the mojito.
          </p>
          <a className="button button-dark" href="#menu">
            Explore the collection <ArrowUpRight size={19} aria-hidden="true" />
          </a>
          <div className="hero-footnote">
            <span>05 signature concepts</span>
            <span className="fine-rule" /> Endless summer energy
          </div>
        </div>
        <div className="hero-art" data-reveal>
          <div className="art-circle" />
          <span className="art-label art-label-top">THE CLASSIC / 01</span>
          <DrinkIllustration className="hero-drink" />
          <div className="ingredient-label">
            <span className="status-dot" /> Mint. Lime. Sparkle.
          </div>
          <span className="art-label art-label-bottom">
            ILLUSTRATED WITH A TWIST
          </span>
        </div>
      </div>
      <div className="shell hero-bottom">
        <span>Crafted to be explored</span>
        <a href="#cocktails" aria-label="Discover cocktails and mocktails">
          <ArrowDownRight aria-hidden="true" size={25} />
        </a>
      </div>
    </section>
  );
}
