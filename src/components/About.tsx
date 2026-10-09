import { Leaf, Citrus, Sparkles } from "lucide-react";
import { useSectionMotion } from "../lib/gsap";

export default function About() {
  const scope = useSectionMotion();
  return (
    <section
      ref={scope}
      id="about"
      tabIndex={-1}
      className="section-pad section-target about-section"
      aria-labelledby="about-title"
    >
      <div className="shell about-grid">
        <div data-reveal>
          <p className="eyebrow">02 / A fresh perspective</p>
          <h2 id="about-title">
            Small details.
            <br />
            <em>Big personality.</em>
          </h2>
        </div>
        <div className="about-copy" data-reveal>
          <p className="large-copy">
            The best ideas start simple. A leaf of mint, a squeeze of lime, a
            moment to slow down.
          </p>
          <p>
            Mojito is a design concept celebrating that simplicity. A fictional
            collection of drinks, original illustrations, and a little motion,
            brought together in one refreshing place.
          </p>
        </div>
        <div className="values-grid" data-reveal>
          <article>
            <Leaf aria-hidden="true" />
            <span className="eyebrow">Fresh by nature</span>
            <h3>Start with the green.</h3>
            <p>
              Mint is the thread that connects every drink in the collection.
            </p>
          </article>
          <article>
            <Citrus aria-hidden="true" />
            <span className="eyebrow">Balance in the glass</span>
            <h3>Find the bright side.</h3>
            <p>Citrus brings a crisp counterpoint to the sweetness of fruit.</p>
          </article>
          <article>
            <Sparkles aria-hidden="true" />
            <span className="eyebrow">A playful finish</span>
            <h3>Leave room for sparkle.</h3>
            <p>
              Five colorful variations give one familiar idea a new perspective.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
