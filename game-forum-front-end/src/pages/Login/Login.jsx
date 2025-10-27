import { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useData } from "../../context/DataProvider";
import { Link } from "react-router-dom";
import logo from "../../assets/pnb logo.webp";

const API_URL = import.meta.env.VITE_API_URL;

function Login({ onLogin, onLogout }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [showPassword, setShowPassword] = useState(false);
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [showCreateAccount, setShowCreateAccount] = useState(false);

  const navigate = useNavigate();
  const { handleHeaders, handleDetails } = useData();
  const [menuOpen, setMenuOpen] = useState(false);
  const { userHeaders, resetHeadersDetails, userDetails } = useData();
  const navListTailwind =
    "absolute w-[100%] bg-(--pnb-parchment) opacity-94 z-1500 h-[100vh] m-0 items-center flex-col backdrop-blur-3xl list-none text-(--pnb-text-green) text-2xl py-4 gap-6";

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const loginCredentials = {
        user: {
          email,
          password,
        },
      };

      const response = await axios.post(
        `${API_URL}/users/login`,
        loginCredentials
      );
      const { data, headers } = response;
      if (data.data && headers) {
        handleHeaders(headers);
        handleDetails(data.data);
        onLogin(true);
        navigate("/"); // Changed from "/forums" to "/" to route to home
      }
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
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
            <button onClick={onLogout}>Log Out</button>
          ) : (
            <Link to="/login-test">Log In</Link>
          )}
        </div>
      </nav>
      <div
        className="min-h-screen flex flex-col items-center justify-center"
        style={{ backgroundColor: "#FCE5CD" }}
      >
        <div
          className="w-full max-w-sm p-8 rounded-xl shadow-lg"
          style={{ backgroundColor: "#677365" }}
        >
          <h1
            className="text-2xl font-bold text-center mb-6"
            style={{ color: "#f7d486" }}
          >
            Log In
          </h1>

          <form onSubmit={handleSignIn} className="space-y-4">
            <label>Email</label>
            <input
              type="email"
              className="w-full p-3 rounded-md outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
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
              Log In
            </button>
          </form>
        </div>
        <div className="mt-6 text-center">
          <p className="text-center" style={{ color: "#677365" }}>
            Not a member yet?{" "}
            <Link to="/sign-up" className="underline">
              Click here!
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
