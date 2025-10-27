import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataProvider";
import logo from "../../assets/pnb logo.webp";
import Loader from "../../components/Loader/Loader";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Signup = ({ onLogin }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const {
    userHeaders,
    resetHeadersDetails,
    userDetails,
    handleHeaders,
    handleDetails,
  } = useData();
  const navListTailwind =
    "absolute w-[100%] bg-(--pnb-parchment) opacity-94 z-1500 h-[100vh] m-0 items-center flex-col backdrop-blur-3xl list-none text-(--pnb-text-green) text-2xl py-4 gap-6";

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const signUpCredentials = {
        user: {
          username,
          email,
          password,
        },
      };
      setIsLoading(true);

      const response = await axios.post(
        `${API_URL}/users/signup`,
        signUpCredentials
      );

      const { data, headers } = response;
      if (data.data && headers) {
        handleHeaders(headers);
        handleDetails(data.data);
        setIsLoading(false);
        navigate("/login-test");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Signup error:", error);
    }

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
        {isLoading && <Loader />}

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
