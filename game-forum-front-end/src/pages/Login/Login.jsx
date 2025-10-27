import { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useData } from "../../context/DataProvider";
import { Link } from "react-router-dom";
import ForumNavBar from "../../components/ForumNavBar/ForumNavBar";

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
      <ForumNavBar onLogout={onLogout}/>
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
