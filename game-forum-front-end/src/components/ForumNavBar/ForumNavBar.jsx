import {useState} from "react"
import { useData } from "../../context/DataProvider";
import { Link, Navigate, useNavigate } from "react-router-dom";
import logo from "../../assets/pnb logo.webp";

function ForumNavBar({onLogout}){
  const navigate = useNavigate()
  const {userHeaders, resetHeadersDetails, userDetails} = useData();
  const [menuOpen, setMenuOpen] = useState(false);
  const navListTailwind = "absolute w-[100%] bg-(--pnb-parchment-nav) backdrop-blur-lg z-1500 h-[100vh] m-0 items-center flex-col backdrop-blur-3xl list-none text-(--pnb-text-green) text-2xl py-12 gap-16"
  const navButton = "hover:font-semibold"

  const handleLogout = () => {
    onLogout()
    resetHeadersDetails()
  }

  return (
    <nav>
      <div className="flex justify-between items-center bg-(--pnb-green) px-4 py-2">
        {userHeaders ? <img src={userDetails['profile_picture']} className="w-10 h-10 border border-(--pnb-gold) cursor-pointer" onClick={()=>{navigate('/forums')}}></img> : <Link to="/forums"><img src={logo} alt="Pluck and Brew Logo" className="w-10 h-10"/></Link>}
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
        <Link to="/" className={navButton}>Main Site</Link>
        <Link to="/forums" className={navButton}>My Posts</Link>
        <Link to="/forums" className={navButton}>Profile</Link>
        {userHeaders ? <button onClick={handleLogout} className={navButton}>Log Out</button> : <Link to="/login-test" className={navButton}>Log In</Link> }
        {userHeaders ? 
          <div className="flex flex-row items-center gap-10 bg-(--pnb-green) px-6 py-4 text-(--pnb-gold) rounded-2xl">
            <img src={userDetails['profile_picture']} className="w-28 h-28 border-3 border-(--pnb-gold)"></img>
            <div className="flex flex-col text-left text-2xl">
              <p className="font-semibold">{userDetails['username']}</p>
              <p>{userDetails['role']}</p>
            </div>
          </div>
        : <></>}
      </div>
    </nav>
  )
}

export default ForumNavBar;