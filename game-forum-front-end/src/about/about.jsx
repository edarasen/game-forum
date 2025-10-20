import { useState } from "react";
import logo from "../assets/pnb logo.webp";

const AboutPage = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [homeRoute, setHomeRoute] = useState(false);

      const handleLogoClick = () => {
        setHomeRoute(true);
        setTimeout(() => {
          window.location.href = "/";
          setHomeRoute(false);
        }, 150);
      };

  return (
    <>
      <nav className="navbar">
        <div
          className={`logo ${homeRoute ? "clicked" : ""}`}
          onClick={handleLogoClick}
        >
          <img src={logo} alt="Pluck and Brew Logo" className="logo-img" />
        </div>

        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
      <div className="pnbBg"></div>
    </>
  );
}

export default AboutPage