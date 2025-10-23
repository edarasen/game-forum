import {useState} from "react"
import { useData } from "../../context/DataProvider";
import { Link } from "react-router-dom";
import logo from "../../assets/pnb logo.webp";

function ForumNavBar({onLogout}){
  const {userHeaders, resetHeaders} = useData();
  const [menuOpen, setMenuOpen] = useState(false);
  const navListTailwind = "absolute w-[100%] bg-(--pnb-parchment) opacity-70 z-1000 h-[100vh] m-0 items-center flex-col backdrop-blue-xs list-none text-(--pnb-text-green) text-2xl py-4 gap-6"

  const handleLogout = () => {
    onLogout()
    resetHeaders()
  }

  return (
    <nav>
      <div className="flex justify-between items-center bg-(--pnb-green) px-4 py-2">
        <Link to="/">
          <img src={logo} alt="Pluck and Brew Logo" className="w-10"/>
        </Link>
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
        <Link to="/">Main Site</Link>
        <Link to="/forums">My Posts</Link>
        <Link to="/forums">Profile</Link>
        {userHeaders ? <button onClick={handleLogout}>Log Out</button> : <Link to="/login-test">Log In</Link> }
      </div>
    </nav>
  )
        
}

export default ForumNavBar;