import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import logo from "../assets/pnb logo.webp";
import "./new-home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import gal1 from "../assets/gal1.webp";
import gal2 from "../assets/gal2.webp";
import gal3 from "../assets/gal3.webp";
import gal4 from "../assets/gal4.webp";

const LandingPage = () => {
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

        <ul className={`nav-list ${menuOpen ? "active" : ""}`}>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a
              href="https://nalshiragames.itch.io/pluck-brew-v02"
              target="_blank"
            >
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
      <div className="abt">
        <p class="font-Montserrat, text-3xl">
          <strong>About the Game</strong>
        </p>
        <br />
        <p class="font-Montserrat, text-xl">
          <strong>Pluck & Brew</strong> is a cozy potion making game in
          development – solve <br />
          puzzles to brew potions, forage for ingredients, and travel different
          <br />
          locations to sell your concoctions. Embark on the marvelous journey
          <br /> to become a master alchemist!
        </p>
      </div>
      <div className="gpFeat">
        <p class="text-3xl">
          <strong>Gameplay Features</strong>
        </p>
        <br />
        <br />
        <br />
        <div>
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            navigation
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            slidesPerView={1}
          >
            <SwiperSlide>
              <div className="flex justify-center px-80 pb-20">
                <img src={gal1} className="w-full h-full object-cover" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex justify-center px-80 pb-20">
                <img src={gal2} className="w-full h-full object-cover" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex justify-center px-80 pb-20">
                <img src={gal3} className="w-full h-full object-cover" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex justify-center px-80 pb-20">
                <img src={gal4} className="w-full h-full object-cover" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default LandingPage;

//use redirect rather than useNavigate for the button of pnb,
//make pnb button clickable and redirect to home/landing page
