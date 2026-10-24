
import "./Footer.css";
import product1 from "../../images/img (2).webp";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">

        {/* Brand */}
        <div className="footer__brand">
          <a href="#home" className="footer__logo">
            <span className="footer__logo-main">CHANEZ</span>
            <span className="footer__logo-sub">COLLECTION</span>
          </a>

          <p className="footer__tagline">
            الأناقة في كل تفصيل
          </p>

          <p className="footer__description">
           اكتشفي مجموعة من الأفكار التي تضفي لمسة من الروعة
            اطّلعي عليها فوراً واستعد أناقتك.
          </p>
        </div>

        {/* Product Image */}
        <div className="footer__product">
          <div className="footer__product-frame">
            <img
              src={product1}
              alt="Produit Chanez Collection"
              className="footer__product-image"
              loading="lazy"
            />
            <span className="footer__product-label">
              CHANEZ COLLECTION
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="footer__navigation">
          <h3 className="footer__heading">الصفحات الاخرى</h3>

          <ul className="footer__links">
            <li>
              <a href="#home">الرئيسية</a>
            </li>
            <li>
              <a href="/collection">منتجاتنا</a>
            </li>
            <li>
              <a href="#testimonials">اراء زبائننا</a>
            </li>
            <li>
              <a href="/contact">تواصلي معنا</a>
            </li>
            <li>
              <a href="/politique-confidentialite">سياسة الخصوصية</a>
            </li>
            <li>
              <a href="/mentions-legales">المعلومات القانونية</a>
            </li>
          </ul>
        </div>

        {/* Call to Action */}
        <div className="footer__cta">
          <span className="footer__eyebrow">
            فن الاناقة
          </span>

          <h3 className="footer__cta-title">
            لمسة من الأناقة،
            <br />
            أسلوبٌ يشبهك.
          </h3>

          <p className="footer__cta-text">
            اعثري على ما سيخطف قلبك 
            ضمن تشكيلتنا.
          </p>

          <a href="/collection" className="footer__button">
            اكتشفي كامل منتجاتنا
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <p className="footer__copyright">
          © {currentYear} CHANEZ COLLECTION.
          Tous droits réservés.
        </p>

        <span className="footer__bottom-note">
          FAIT AVEC ÉLÉGANCE
        </span>
      </div>
    </footer>
  );
}
