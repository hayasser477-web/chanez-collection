
import "./Home.css";
import { Link } from "react-router-dom";
import LuxuryBackground from "../background/LuxuryBackground.jsx";
export default function Home() {
  return (
    <main className="home" id="home">
      <LuxuryBackground />
      <div className="home__overlay" />

      <div className="home__content">
        <p className="home__eyebrow">
          MARQUE ALGÉRIENNE DE PRÊT-À-PORTER
        </p>

        <h1 className="home__title">
          CHANEZ COLLECTION
        </h1>

        <span className="home__divider" />

        <p className="home__description">
          صُنعت بكل حب
        </p>

       <Link className="home__button" to="/collection">
  <span>اكتشفي منتجاتنا</span>

  <span className="home__arrow" aria-hidden="true">
    ←
  </span>
</Link>
</div>

<div className="home__bottom">
  <span>UNE ÉLÉGANCE QUI VOUS RESSEMBLE</span>
</div>
    </main>
  );
}
