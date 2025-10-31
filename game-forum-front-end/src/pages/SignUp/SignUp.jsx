import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ForumNavBar from "../../components/ForumNavBar/ForumNavBar";
import { useData } from "../../context/DataProvider";
import Loader from "../../components/Loader/Loader";
import axios from "axios";
import Modal from "../../components/Modals/Modal";
import Login from "../Login/Login";


const API_URL = import.meta.env.VITE_API_URL;
const EMAIL_RE = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const Signup = ({ onLogout }) => {
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
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

      if (showLoginModal) {
        return (
          <Modal
            isOpen={showLoginModal}
            onClose={() => setShowLoginModal(false)}
          >
            <Login setShowLoginModal={setShowLoginModal} />
          </Modal>
        );
      }

    function onBlur() {
      setError(EMAIL_RE.test(email) ? null : "Invalid e-mail");
    }

  const handleSignup = async (e) => {
    e.preventDefault();
     setErrorMessage("");
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
        navigate("/forums");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Signup error:", error);
      setErrorMessage(
        "We're sorry your Signup failed, Please try again."
      );
    }

    setTimeout(() => {
      navigate("/forums");
    }, 3000);
  };


  return (
    <>
      <ForumNavBar onLogout={onLogout} />
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
            {errorMessage && (
              <p
                className="w-full p-3 mt-3 text-center text-red-300 font-semibold rounded-md"
                style={{ backgroundColor: "#f05252ff", color: "#ffffffff" }}
              >
                &#9888; {errorMessage}
              </p>
            )}

            {error && (
              <p
                className="w-full p-3 mt-3 mb-6 text-center text-red-300 font-semibold rounded-md"
                style={{ backgroundColor: "#f05252ff", color: "#ffffffff" }}
              >
                {error}
              </p>
            )}
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
                style={{ background: "#FCE5CD" }}
              />

              <input
                type="email"
                onBlur={onBlur}
                placeholder="Email"
                className="w-full p-3 rounded-md outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ background: "#FCE5CD" }}
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded-md outline-none"
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
                Sign Up
              </button>
            </form>

            <p className="text-center mt-4" style={{ color: "#f7d486" }}>
              Already have an account?{" "}
              <span
                onClick={() => setShowLoginModal(true)}
                className="underline cursor-pointer"
              >
                Login
              </span>
            </p>
          </div>
        )}
      </div>
      <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <Login onLogin={() => setShowLoginModal(false)} onLogout={onLogout} />
      </Modal>
    </>
  );
};

export default Signup;
