import { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useData } from "../../context/DataProvider";
import { Link } from "react-router-dom";
import ForumNavBar from "../../components/ForumNavBar/ForumNavBar";

const API_URL = import.meta.env.VITE_API_URL;

function Login({ setShowLoginModal }) {
  const { onLogin, onLogout } = useData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [showPassword, setShowPassword] = useState(false);
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [showCreateAccount, setShowCreateAccount] = useState(false);

  const navigate = useNavigate();
  const { handleHeaders, handleDetails } = useData();
  const [errorMessage, setErrorMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { userHeaders, resetHeadersDetails, userDetails } = useData();
  const navListTailwind =
    "absolute w-[100%] bg-(--pnb-parchment) opacity-94 z-1500 h-[100vh] m-0 items-center flex-col backdrop-blur-3xl list-none text-(--pnb-text-green) text-2xl py-4 gap-6";

  const isModal = !!onLogin;

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMessage("");
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
        const isAdmin = data.data["role"] === "admin";
        onLogin(true);
        if (data.data["deactivated"] === true) {
          resetHeadersDetails();
          onLogout();
          setErrorMessage("Your account was deactivated. You can send your appeals through here: edaresen@dragons.com");
          return;
        };
        setShowLoginModal(false);
        navigate("/"); // Changed from "/forums" to "/" to route to home
      }
    } catch (error) {
      if (error) {
        console.log(error);
        setErrorMessage(
          "Invalid Email or password, please check the spelling of your email or password or you can Sign up for a new account"
        );
      }
    }
  };

  return (
    <>
      {/* No navbar when used inside modal */}
      {/* <div
        className="min-h-screen flex flex-col items-center justify-center"
        style={{ backgroundColor: "#FCE5CD" }}
      > */}
      {errorMessage && (
        <p
          className="w-full p-3 mt-3 text-center text-red-300 font-semibold rounded-md"
          style={{ backgroundColor: "#f05252ff", color: "#ffffffff" }}
        >
          &#9888; {errorMessage}
        </p>
      )}
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
        {!isModal && <ForumNavBar onLogout={onLogout} />}
        <form onSubmit={handleSignIn} className="space-y-4">
          <label>Email</label>
          <input
            type="email"
            placeholder="E-mail"
            className="w-full p-3 rounded-md outline-none text-(--pnb-text-green)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ background: "#FCE5CD" }}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-md outline-none text-(--pnb-text-green)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ background: "#FCE5CD" }}
          />

          <button
            type="submit"
            className="w-full p-3 rounded-md font-bold"
            style={{ backgroundColor: "#f7d486", color: "#677365" }}
          >
            Log In
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-center-lg" style={{ color: "#f7d486" }}>
            Not a member yet?{" "}
            <Link to="/sign-up" className="underline">
              Click here!
            </Link>
          </p>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default Login;
