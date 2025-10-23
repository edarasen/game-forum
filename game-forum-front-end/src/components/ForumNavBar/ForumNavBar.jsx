import {useState} from "react"
import { useData } from "../../context/DataProvider";
import { Link } from "react-router-dom";
import logo from "../../assets/pnb logo.webp";

function ForumNavBar({onLogout}){
  const {userHeaders, resetHeadersDetails, userDetails} = useData();
  const [menuOpen, setMenuOpen] = useState(false);
  const navListTailwind = "absolute w-[100%] bg-(--pnb-parchment) opacity-94 z-1500 h-[100vh] m-0 items-center flex-col backdrop-blur-3xl list-none text-(--pnb-text-green) text-2xl py-4 gap-6"

  const handleLogout = () => {
    onLogout()
    resetHeadersDetails()
  }

  return (
    <nav>
      <div className="flex justify-between items-center bg-(--pnb-green) px-4 py-2">
        {userHeaders ? <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F6%2F69%2FWikimedia_logo_family_complete-2023.svg%2F1200px-Wikimedia_logo_family_complete-2023.svg.png%3F20230824201106&f=1&nofb=1&ipt=370c744281553dfb0122bf436fc2e6ad963a98392e23778fb315f83c06d2f399" className="w-10 h-10"></img> : <Link to="/"><img src={logo} alt="Pluck and Brew Logo" className="w-10 h-10"/></Link>}
        <h1 className="text-(--pnb-gold) text-lg font-medium">P&B Forums</h1>
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
        <p>{userDetails['username']}</p>
        <Link to="/">Main Site</Link>
        <Link to="/forums">My Posts</Link>
        <Link to="/forums">Profile</Link>
        {userHeaders ? <button onClick={handleLogout}>Log Out</button> : <Link to="/login-test">Log In</Link> }
      </div>
    </nav>
  )
        
}

export default ForumNavBar;