import { cocktailLists, mocktailLists } from "../constants";
import { useSectionMotion } from "../lib/gsap";
import { ArrowUpRight } from "lucide-react";

export default function Cocktails() {
  const scope = useSectionMotion();
  return (
    <section
      ref={scope}
      id="cocktails"
      tabIndex={-1}
      className="section-pad section-target dark-section"
      aria-labelledby="cocktails-title"
    >
      <div className="shell">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">01 / The lineup</p>
          <h2 id="cocktails-title">
            Something for
            <br />
            <em>every kind of summer.</em>
          </h2>
        </div>
        <div className="lineup-grid" data-reveal>
          <div>
            <div className="list-heading">
              <h3>With a little spirit</h3>
              <span>Cocktails</span>
            </div>
            <ol className="drink-list">
              {cocktailLists.map((drink, i) => (
                <li key={drink}>
                  <span className="list-number">0{i + 1}</span>
                  <span>{drink}</span>
                  <span className="list-spark" aria-hidden="true">
                    ✳
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <div className="list-heading">
              <h3>All the freshness</h3>
              <span>Zero-proof ideas</span>
            </div>
            <ol className="drink-list">
              {mocktailLists.map((drink, i) => (
                <li key={drink}>
                  <span className="list-number">0{i + 1}</span>
                  <span>{drink}</span>
                  <span className="list-spark" aria-hidden="true">
                    ✳
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <a href="#menu" className="text-link light-link">
          Meet the five signature cocktails{" "}
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
