import { useSectionMotion } from "../lib/gsap";
import DrinkIllustration from "./DrinkIllustration";

export default function Art() {
  const scope = useSectionMotion();
  return (
    <section
      ref={scope}
      id="art"
      tabIndex={-1}
      className="section-pad section-target art-section"
      aria-labelledby="art-title"
    >
      <div className="shell art-grid">
        <div className="art-frame" data-reveal>
          <span className="eyebrow">A study in freshness</span>
          <DrinkIllustration
            color="#edc570"
            deep="#b98a2d"
            label="Original illustration of a golden passion fruit mojito"
          />
          <span className="art-frame-caption">
            MINT + CITRUS + A LITTLE IMAGINATION
          </span>
        </div>
        <div data-reveal>
          <p className="eyebrow">03 / The art of the mix</p>
          <h2 id="art-title">
            An everyday classic.
            <br />
            <em>A new point of view.</em>
          </h2>
          <p className="section-description">
            A few familiar elements, thoughtfully brought together. Here is the
            inspiration behind the collection.
          </p>
          <ol className="process-list">
            <li>
              <span>01</span>
              <div>
                <h3>The foundation</h3>
                <p>Bright lime and fragrant mint set the tone.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>The expression</h3>
                <p>
                  Fruit and coconut introduce color, texture, and character.
                </p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>The finishing touch</h3>
                <p>A little sparkle keeps the whole composition light.</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
