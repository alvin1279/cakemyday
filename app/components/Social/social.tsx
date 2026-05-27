import "./social.css";
import { useRef } from "react";
import { SOCIAL_LINKS } from "./social.data";
import { GalleryCarousel } from "./Gallerycarousel";
import { useSnapIntoView } from "./hooks/useSnapIntoView";

export default function Social() {
  const sectionRef = useRef<HTMLElement>(null);
  useSnapIntoView(sectionRef);

  return (
    <section ref={sectionRef} className="social-section">
      <Header />
      <div className="social-gallery">
        <GalleryCarousel />
      </div>
      <Divider />
      <FooterLinks />
    </section>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Header() {
  return (
    <div className="social-header">
      <div>
        <span className="social-eyebrow">Sweet moments</span>
        <h2 className="social-title">
          Our Gallery &<br />
          <em>Find Us</em>
        </h2>
      </div>

      <div className="social-header-right">
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-header-link"
          >
            <span className="social-header-handle">{link.handle}</span>
            <span className="social-header-name">{link.name}</span>
            <span className="social-header-arrow" />
          </a>
        ))}
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="social-divider">
      <span className="social-divider-line" />
      <span className="social-divider-label">Follow along</span>
      <span className="social-divider-line" />
    </div>
  );
}

function FooterLinks() {
  return (
    <div className="social-links">
      {SOCIAL_LINKS.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          {link.name}
          <span className="social-link-underline" />
        </a>
      ))}
    </div>
  );
}