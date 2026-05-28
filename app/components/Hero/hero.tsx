import { useEffect, useRef, useState } from "react";
import "./hero.css";

// import logo from "./logo.png"; // if it's next to hero.jsx
const logo = "/logo.png";

const imageUrl =
  "https://preppykitchen.com/wp-content/uploads/2022/05/Strawberry-Cake-Recipe-Card.jpg";

export default function Hero() {
  const [logoLoaded, setLogoLoaded] = useState(false);

  const logoRef = useRef(null);

  useEffect(() => {
    // if image was already loaded from cache, complete is already true
    if (logoRef.current) {
      setLogoLoaded(true);
      console.log("Logo loaded (from cache)");
    }
  }, []);

  return (
    <section className="hero-container">
      <div className="hero-content">
        <div className="hero-logo-row">
          <img
            ref={logoRef}
            src={logo}
            alt="company logo"
            className={`hero-logo${logoLoaded ? " hero-logo--loaded" : ""}`}
            onLoad={() => setLogoLoaded(true)}
          />
          <span
            className={`hero-eyebrow${logoLoaded ? " hero-eyebrow--visible" : ""}`}
          >
            Made with Love for you
          </span>
        </div>
        <h1 className="hero-title">
          Custom <br />
          <em>Cakes</em>
        </h1>
        <p className="hero-subtitle">
          Mobile custom Cake services for birthdays, weddings, events and
          special moments across Central Texas.
        </p>
        <div className="hero-actions">
          <a href="forum-custom" className="btn btn-primary">
            Custom Order
          </a>
          <a href="forum-event" className="btn btn-ghost">
            Book an Event
          </a>
        </div>
      </div>

      <div className="hero-image-wrap">
        <img src={imageUrl} alt="Close-up of raindrops on leaves" />
        <div className="hero-image-overlay" />
      </div>
      <div className="hero-scroll-hint">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
