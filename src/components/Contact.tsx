import { ArrowUpRight, Leaf } from "lucide-react";

export default function Contact() {
  return (
    <footer
      id="contact"
      tabIndex={-1}
      className="section-target site-footer"
      aria-labelledby="footer-title"
    >
      <div className="shell">
        <div className="footer-top">
          <div>
            <p className="eyebrow">05 / One last sip</p>
            <h2 id="footer-title">
              Stay curious.
              <br />
              <em>Keep it fresh.</em>
            </h2>
          </div>
          <div className="demo-note">
            <span className="demo-badge">Demo notes</span>
            <p>
              A fictional cocktail showcase, made to explore design,
              illustration, and motion.
            </p>
            <p>
              No real venue, reservations, sales, or contact service is
              provided. Enjoy the design, and drink responsibly.
            </p>
            <a href="#menu" className="text-link light-link">
              Back to the collection{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <a href="#hero" className="brand">
            <Leaf size={23} aria-hidden="true" /> mojito.
          </a>
          <p>Original vector artwork · React + GSAP</p>
          <a href="#hero" className="text-link light-link">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
