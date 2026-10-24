
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Intro from "./assets/components/intro/Intro.jsx";
import LuxuryBackground from "./assets/components/background/LuxuryBackground.jsx";
import Navbar from "./assets/components/navbar/Navbar.jsx";
import PetalFall from "./assets/components/petals/PetalFall.jsx";
import Home from "./assets/components/home/Home.jsx";
import Testimonials from "./assets/components/testimonials/Testimonials.jsx";
import CTA from "./assets/components/CTA/CTA.jsx";
import Footer from "./assets/components/Footer/Footer.jsx";
import PrivacyPolicy from "./assets/components/PrivacyPolicy/PrivacyPolicy.jsx";
import LegalNotices from "./assets/components/LegalNotices/LegalNotices.jsx";
import FAQ from "./assets/components/FAQ/FAQ";
import AboutUs from "./assets/components/AboutUs/AboutUs";
import SocialLinks from "./assets/components/SocialLinks/SocialLinks";
import BackToTop from "./assets/components/BackToTop/BackToTop";
import Collection from "./assets/components/Collection/Collection.jsx";
import Cart from "./assets/components/Cart/Cart";
import ThankYou from "./assets/components/Cart/ThankYou";

function MainLayout() {
  return (
    <>
      <LuxuryBackground />
      <PetalFall />

      <div className="site-shell" dir="rtl">
        <Navbar />
        <Home />
        <Testimonials />
        <CTA />
        <FAQ />
        <AboutUs />
        <Footer />
        <BackToTop />
      </div>
    </>
  );
}

function CollectionLayout() {
  return (
    <>
      <LuxuryBackground />
      <PetalFall />

      <div className="site-shell" dir="rtl">
        <Navbar />
        <Collection />
        <Footer />
        <BackToTop />
      </div>
    </>
  );
}

function CartLayout() {
  return (
    <>
      <LuxuryBackground />
      <div className="site-shell" dir="rtl">
        <Navbar />
        <Cart />
        <Footer />
        <BackToTop />
      </div>
    </>
  );
}

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <BrowserRouter>
      {showIntro ? (
        <Intro onComplete={() => setShowIntro(false)} />
      ) : (
        <Routes>
          <Route path="/" element={<MainLayout />} />

          <Route
            path="/collection"
            element={<CollectionLayout />}
          />

          <Route
            path="/cart"
            element={<CartLayout />}
          />

          <Route
            path="/thank-you"
            element={<ThankYou />}
          />

          <Route
            path="/politique-confidentialite"
            element={<PrivacyPolicy />}
          />

          <Route
            path="/mentions-legales"
            element={<LegalNotices />}
          />

          <Route
            path="/contact"
            element={<SocialLinks />}
          />

          <Route path="*" element={<MainLayout />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
