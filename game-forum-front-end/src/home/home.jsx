import { useState } from "react";
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
import stars from "../assets/stars.webp";
import nalshira from "../assets/nalshira.webp";
import roselle from "../assets/roselle.webp";
import Nel from "../assets/Nel.webp";
import Hannah from "../assets/Hannah.webp"
import symbol from "../assets/symbol.webp"
import GamesGallery from "../component/GamesGallery";
import ContactSection from "../component/ContactSection";

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
            <a href="abt">Contact</a>
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
        <br />
        <br />
      </div>
      <div className="gpFeat">
        <br />
        <br />
        <p class="text-3xl">
          <strong>Gameplay Features</strong>
        </p>
        <br />
        <br />
        <div>
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            navigation={true}
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
            }}
            slidesPerView={1}
          >
            <SwiperSlide>
              <div className="flex justify-center px-80 pb-20">
                <img src={gal1} className="w-full h-full object-cover" />
              </div>
              <div className="descript" class>
                <p>Fulfill patron requests to acquire renown</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex justify-center px-80 pb-20">
                <img src={gal2} className="w-full h-full object-cover" />
              </div>
              <div className="descript">
                <p>Solve puzzles to brew potions</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex justify-center px-80 pb-20">
                <img src={gal3} className="w-full h-full object-cover" />
              </div>
              <div className="descript">
                <p>Travel to different locations</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex justify-center px-80 pb-20">
                <img src={gal4} className="w-full h-full object-cover" />
              </div>
              <div className="descript">
                <p>Forage for magical ingredients</p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
        <div className="rdMap text-center">
          <br />
          <br />
          <p className="text-3xl font-bold mb-10">Development Roadmap</p>

          
          <div className="flex justify-center items-start gap-3 mb-6">
            <img src={stars} className="w-6 h-6" />
            <p className="font-bold text-lg">Chat & Gift</p>
          </div>
          <p>Build relationships with your patrons by giving them gifts<br /> and chatting with them around a cozy campfire</p>
          <br />
          
          <div className="flex justify-center items-start gap-3 mb-6">
            <img src={stars} className="w-6 h-6" />
            <p className="font-bold text-lg">More Renown Ranks, More Recipes</p>
          </div>
          <p>Gaining experience and advancing your renown rank allows<br /> you to learn more potion recipes</p> 
          <br />
          
          <div className="flex justify-center items-start gap-3">
            <img src={stars} className="w-6 h-6" />
            <p className="font-bold text-lg">More Ingredients, More Patrons</p>
          </div>
          <p>Gain the ability to craft potions with more ingredients and <br />fulfill the needs of more patrons</p>
          <br />
          <br />
        </div>

        <div className="abtTeam w-full bg-[#6B7160] py-16 text-white">
          
          <p className="text-3xl font-bold text-center mb-12">About the Team</p>

          
          <div className="max-w-4xl mx-auto">
            
            
            <div className="flex gap-6 mb-12 items-start">
              <img src={nalshira} className="w-20 h-20" />
              <div className="text-left">
                <p className="text-xl font-bold">Kelcie Regine Reyes</p>
                <p className="font-medium mb-3 text-sm">
                  Lead Developer, Designer, Writer, & Artist
                </p>
                <p className="text-sm leading-relaxed">
                  Kelcie has been working in the Philippine game development industry for five years and counting.
                  She has illustrated and animated 2D sprites for educational games, designed UI for mobile apps,
                  and is currently designing and integrating UI for Mega Cat Studios.
                </p>
              </div>
            </div>
            <div className="flex gap-6 mb-12 items-start">
              <img src={roselle} className="w-20 h-20" />
              <div className="text-left">
                <p className="text-xl font-bold">Roselle Mae Menchavez</p>
                <p className="font-medium mb-3 text-sm">Sound Designer and Producer</p>
                <p className="text-sm leading-relaxed">Roselle is a freelance music scorer and sound designer 
                  who has over six years of experience contributing to indie video games. She won Best Sound Design in GameJamPlus 21/22 in 
                  Brazil for the game 'Meet Me on the Mountain' along with Best Game in Asia and Game of the Year.
                </p>
              </div>
            </div>
            <div className="flex gap-6 mb-12 items-start">
              <img src={Nel} className="w-20 h-20" />
              <div className="text-left">
                <p className="text-xl font-bold">Nel Kyle Montelijao</p>
                <p className="font-medium mb-3 text-sm">[ Commission ] Concept and Background Artist</p>
                <p className="text-sm leading-relaxed">Nel has over six years of experience as a background artist. 
                  He began his career at Toei Animation PH contributing to the globally acclaimed anime One Piece. 
                  In 2023, he expanded his expertise as an environmental artist, venturing into both the VTuber and gaming industries.
                </p>
              </div>
            </div>
            <div className="flex gap-6 mb-12 items-start">
              <img src={Hannah} className="w-20 h-20" />
              <div className="text-left">
                <p className="text-xl font-bold">Hannah R. Nolasco</p>
                <p className="font-medium mb-3 text-sm">[ Commission ] Writer, Editor, Design Consultant</p>
                <p className="text-sm leading-relaxed">Hannah has more than ten years of experience in writing and design in journalism, advertising, & academia. 
                  They started as an editorial correspondent for the Philippine Daily Inquirer before pivoting into copywriting and design in marketing for FMCG and tech brands.
                  In 2021, they completed a master’s degree in Media Design at Keio University in Tokyo, Japan.
                </p>
              </div>
            </div>

          </div>
        </div>

        <div className="demo w-full py-16 p-0 m-0">
            <p className="text-3xl font-bold text-center mb-12">Play the Demo in itch.io!</p><br />
            <a href="https://nalshiragames.itch.io" target="_blank" className="text-5xl text-center">https://nalshiragames.itch.io</a><br /><br />
            <div className="record">
              <div>
                <p className="font-bold text-4xl text-center">200</p>
                <p className="text-3xl text-center">Views</p>
              </div>
              <div>
                <p className="font-bold text-4xl">200</p>
                <p className="text-3xl text-center">Downloads</p>
              </div>
            </div>
            <br />
            <div className="altar p-0 m-0">
                <img src={symbol} className="w-full block object-cover object-bottom" style={{ margin: 0, padding: 0 }} />
            </div>
        </div>
        <div className="discussion py-16">

          <p className="text-3xl font-bold text-center mb-12">Join the Discussion</p>
          <p className="text-xl text-center mb-12">The official P&B Forum is open alongside the P&B Discord to discuss<br />
           anything and everything related to the magical voyage of<br />
           your apprentice alchemists. Suggest QoL updates, report bugs, discuss the<br />
           lore, and share fanart with other players!</p>
          <div class="cta-buttons">
            <button class="cta-btn outline">Go to Forums</button>
            <button class="cta-btn outline">Join Discord</button>
          </div>
        </div>
        <div>
          <GamesGallery />
        </div>
        <div>
          <ContactSection />
        </div>
    </>
  );
};

export default LandingPage;

//use redirect rather than useNavigate for the button of pnb,
//make pnb button clickable and redirect to home/landing page



