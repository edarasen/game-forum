import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataProvider";
import logo from "../../assets/pnb logo.webp";

const Signup = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const { userHeaders, resetHeadersDetails, userDetails } = useData();
  const navListTailwind =
    "absolute w-[100%] bg-(--pnb-parchment) opacity-94 z-1500 h-[100vh] m-0 items-center flex-col backdrop-blur-3xl list-none text-(--pnb-text-green) text-2xl py-4 gap-6";


  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const handleSignup = (e) => {
    e.preventDefault();
    setIsLoading(true);

   
    setTimeout(() => {
      navigate("/login-test");
    }, 3000); 
  };

  return (
    <>
      <nav>
        <div className="flex justify-between items-center bg-(--pnb-green) px-4 py-2">
          {userHeaders ? (
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F6%2F69%2FWikimedia_logo_family_complete-2023.svg%2F1200px-Wikimedia_logo_family_complete-2023.svg.png%3F20230824201106&f=1&nofb=1&ipt=370c744281553dfb0122bf436fc2e6ad963a98392e23778fb315f83c06d2f399"
              className="w-10 h-10"
            ></img>
          ) : (
            <Link to="/">
              <img src={logo} alt="Pluck and Brew Logo" className="w-10 h-10" />
            </Link>
          )}
          <h1 className="text-(--pnb-gold) text-lg font-medium">Sign Up</h1>
          <div
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className={`${navListTailwind} ${menuOpen ? "flex" : "hidden"}`}>
          <p>{userDetails["username"]}</p>
          <Link to="/">Main Site</Link>
          <Link to="/forums">My Posts</Link>
          <Link to="/forums">Profile</Link>
          {userHeaders ? (
            <button onClick={handleLogout}>Log Out</button>
          ) : (
            <Link to="/login-test">Log In</Link>
          )}
        </div>
      </nav>
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#FCE5CD" }}
      >
        {/* pang loading UI */}
        {isLoading && (
          <div
            className="fixed inset-0 flex items-center justify-center"
            style={{ backgroundColor: "#FCE5CD" }}
          >
            <div className="hourglassBackground">
              <div className="hourglassContainer">
                <div className="hourglassCurves"></div>
                <div className="hourglassCapTop"></div>
                <div className="hourglassGlassTop"></div>
                <div className="hourglassSand"></div>
                <div className="hourglassSandStream"></div>
                <div className="hourglassCapBottom"></div>
                <div className="hourglassGlass"></div>
              </div>
            </div>

            
            <style>{`
            /* From Uiverse.io by SouravBandyopadhyay */ 
            .hourglassBackground {
              position: relative;
              background-color: rgb(71, 60, 60);
              height: 130px;
              width: 130px;
              border-radius: 50%;
              margin: 30px auto;
            }

            .hourglassContainer {
              position: absolute;
              top: 30px;
              left: 40px;
              width: 50px;
              height: 70px;
              animation: hourglassRotate 2s ease-in 0s infinite;
              transform-style: preserve-3d;
              perspective: 1000px;
            }

            .hourglassContainer div,
            .hourglassContainer div:before,
            .hourglassContainer div:after {
              transform-style: preserve-3d;
            }

            @keyframes hourglassRotate {
              0% { transform: rotateX(0deg); }
              50% { transform: rotateX(180deg); }
              100% { transform: rotateX(180deg); }
            }

            .hourglassCapTop { top: 0; }
            .hourglassCapTop:before { top: -25px; }
            .hourglassCapTop:after { top: -20px; }
            .hourglassCapBottom { bottom: 0; }
            .hourglassCapBottom:before { bottom: -25px; }
            .hourglassCapBottom:after { bottom: -20px; }

            .hourglassGlassTop {
              transform: rotateX(90deg);
              position: absolute;
              top: -16px;
              left: 3px;
              border-radius: 50%;
              width: 44px;
              height: 44px;
              background-color: #999999;
            }

            .hourglassGlass {
              perspective: 100px;
              position: absolute;
              top: 32px;
              left: 20px;
              width: 10px;
              height: 6px;
              background-color: #999999;
              opacity: 0.5;
            }

            .hourglassGlass:before,
            .hourglassGlass:after {
              content: '';
              display: block;
              position: absolute;
              background-color: #999999;
              left: -17px;
              width: 44px;
              height: 28px;
            }

            .hourglassGlass:before {
              top: -27px;
              border-radius: 0 0 25px 25px;
            }

            .hourglassGlass:after {
              bottom: -27px;
              border-radius: 25px 25px 0 0;
            }

            .hourglassCurves:before,
            .hourglassCurves:after {
              content: '';
              display: block;
              position: absolute;
              top: 32px;
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background-color: #333;
              animation: hideCurves 2s ease-in 0s infinite;
            }

            .hourglassCurves:before { left: 15px; }
            .hourglassCurves:after { left: 29px; }

            @keyframes hideCurves {
              0% { opacity: 1; }
              25% { opacity: 0; }
              30% { opacity: 0; }
              40% { opacity: 1; }
              100% { opacity: 1; }
            }

            .hourglassSandStream:before {
              content: '';
              display: block;
              position: absolute;
              left: 24px;
              width: 3px;
              background-color: white;
              animation: sandStream1 2s ease-in 0s infinite;
            }

            .hourglassSandStream:after {
              content: '';
              display: block;
              position: absolute;
              top: 36px;
              left: 19px;
              border-left: 6px solid transparent;
              border-right: 6px solid transparent;
              border-bottom: 6px solid #fff;
              animation: sandStream2 2s ease-in 0s infinite;
            }

            @keyframes sandStream1 {
              0% { height: 0; top: 35px; }
              50% { height: 0; top: 45px; }
              60% { height: 35px; top: 8px; }
              85% { height: 35px; top: 8px; }
              100% { height: 0; top: 8px; }
            }

            @keyframes sandStream2 {
              0% { opacity: 0; }
              50% { opacity: 0; }
              51% { opacity: 1; }
              90% { opacity: 1; }
              91% { opacity: 0; }
              100% { opacity: 0; }
            }

            .hourglassSand:before,
            .hourglassSand:after {
              content: '';
              display: block;
              position: absolute;
              left: 6px;
              background-color: white;
            }

            .hourglassSand:before {
              top: 8px;
              width: 39px;
              border-radius: 3px 3px 30px 30px;
              animation: sandFillup 2s ease-in 0s infinite;
            }

            .hourglassSand:after {
              border-radius: 30px 30px 3px 3px;
              animation: sandDeplete 2s ease-in 0s infinite;
            }

            @keyframes sandFillup {
              0% { opacity: 0; height: 0; }
              60% { opacity: 1; height: 0; }
              100% { opacity: 1; height: 17px; }
            }

            @keyframes sandDeplete {
              0% { opacity: 0; top: 45px; height: 17px; width: 38px; left: 6px; }
              1% { opacity: 1; top: 45px; height: 17px; width: 38px; left: 6px; }
              24% { opacity: 1; top: 45px; height: 17px; width: 38px; left: 6px; }
              25% { opacity: 1; top: 41px; height: 17px; width: 38px; left: 6px; }
              50% { opacity: 1; top: 41px; height: 17px; width: 38px; left: 6px; }
              90% { opacity: 1; top: 41px; height: 0; width: 10px; left: 20px; }
            }
          `}</style>
          </div>
        )}

        
        {!isLoading && (
          <div
            className="w-full max-w-sm p-8 rounded-xl shadow-lg"
            style={{ backgroundColor: "#677365" }}
          >
            <h2
              className="text-2xl font-bold text-center mb-6"
              style={{ color: "#f7d486" }}
            >
              Signup
            </h2>

            <form onSubmit={handleSignup} className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                className="w-full p-3 rounded-md outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded-md outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded-md outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="submit"
                className="w-full p-3 rounded-md font-bold"
                style={{ backgroundColor: "#f7d486", color: "#677365" }}
              >
                Sign Up
              </button>
            </form>

            <p className="text-center mt-4" style={{ color: "#f7d486" }}>
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login-test")}
                className="underline cursor-pointer"
              >
                Login
              </span>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Signup;
