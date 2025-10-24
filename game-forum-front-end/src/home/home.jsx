import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import logo from "../assets/pnb logo.webp";
import "./new-home.css"

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [homeRoute, setHomeRoute] = useState(false)

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
        <div className={`logo ${homeRoute ? "clicked" : ""}`} onClick={handleLogoClick}>
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

        <ul className={`nav-list ${menuOpen ? "active" : ""}`}>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="https://nalshiragames.itch.io/pluck-brew-v02" target="_blank">
              Itch.io Demo
            </a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
          <li>
            <a href="#">Forums</a>
          </li>
        </ul>
      </nav>
      <div className="PnB">
        {/* <img src="landing-page.webp" alt="PnB Logo" /> */}
      </div>
    </>
  );
};

export default LandingPage;


//use redirect rather than useNavigate for the button of pnb,
//make pnb button clickable and redirect to home/landing page
