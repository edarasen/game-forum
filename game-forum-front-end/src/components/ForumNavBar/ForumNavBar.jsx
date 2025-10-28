import {useState} from "react"
import { useData } from "../../context/DataProvider";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/pnb logo.webp";

function ForumNavBar({onLogout}){
  const navigate = useNavigate()
  const {userHeaders, resetHeadersDetails, userDetails} = useData();
  const [menuOpen, setMenuOpen] = useState(false);
  const navOverlay = "absolute w-[100%] bg-(--pnb-parchment-nav) backdrop-blur-lg h-[100vh] m-0 items-center flex-col backdrop-blur-3xl list-none text-(--pnb-text-green) text-2xl py-12 gap-16"
  const navButton = "hover:font-semibold"

  const handleLogout = () => {
    onLogout()
    resetHeadersDetails()
  }

  return (
      <nav className="sticky top-0 z-50">
      <div className="flex justify-between items-center bg-(--pnb-green) px-4 py-2">
        <div className="flex flex-row items-center gap-2">
          {userHeaders ? <img src={userDetails['profile_picture']} className="w-10 h-10 border border-(--pnb-gold) cursor-pointer" onClick={()=>{navigate('/forums')}}/> : <Link to="/"><img src={logo} alt="Pluck and Brew Logo" className="w-10 h-10"/></Link>}
          <h1 className="text-(--pnb-gold) text-lg font-medium">{
          window.location.pathname === "/" ? 
            "About P&B" : "P&B Forums"
          }</h1>
        </div>
        <div className="hidden flex-row lg:flex text-(--pnb-gold) gap-18 text-md">
          <Link to="/" className={navButton}>Main Site</Link>
          {
            window.location.pathname === "/" ? 
            <a className={navButton}
              href="https://nalshiragames.itch.io"
              target="_blank"
            >
             Play Demo 
            </a> : <></>
          }
          <Link to="/forums" className={navButton}>Forums</Link>
          {
            (window.location.pathname === "/forums" || window.location.pathname === "/admin-tools")  && userDetails['role'] === 'admin' ? 
            <Link to="/admin-tools" className={navButton}>
             Admin Tools 
            </Link> : <></>
          }
          {/* shows only when userHeaders exist */}
          {userHeaders ?
            <>
            <Link to="/my-posts" className={navButton}>My Posts</Link>
            <Link to="/my-profile" className={navButton}>Profile</Link>
            </> :
            <> </>}
          {userHeaders ? <button onClick={handleLogout} className={navButton}>Log Out</button> : <Link to="/login" className={navButton}>Log In</Link> }
        </div>
        <div
          className={`hamburger flex ${menuOpen ? "open" : ""} lg:hidden`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      {
        window.location.pathname === "/" ? 
        <div className="flex flex-row justify-around py-2 md:px-20 lg:px-40 bg-(--pnb-parchment)">
          <a className={`${navButton} underline`}
                href="#about"> About </a>
          <a className={`${navButton} underline`}
                href="#features"> Features </a>
          <a className={`${navButton} underline`}
                href="#roadmap"> Roadmap </a>
          <a className={`${navButton} underline`}
                href="#team"> Team </a>
          <a className={`${navButton} underline`}
                href="#community"> Community </a>
          <a className={`${navButton} underline`}
                href="#contact"> Contact </a>
        </div> : <></> 
      }
      <div className={`${navOverlay} ${menuOpen ? "flex" : "hidden"}`}>
        <Link to="/" className={navButton}>Main Site</Link>
        {
            window.location.pathname === "/" ? 
            <a className={navButton}
              href="https://nalshiragames.itch.io"
              target="_blank"
            >
             Play Demo 
            </a> : <></>
          }
        <Link to="/forums" className={navButton}>Forums</Link>
        {/* shows only when userHeaders exist */}
        {userHeaders ?
          <>
          <Link to="/my-posts" className={navButton}>My Posts</Link>
          <Link to="/my-profile" className={navButton}>Profile</Link>
          </> :
          <> </>}
        {userHeaders ? <button onClick={handleLogout} className={navButton}>Log Out</button> : <Link to="/login" className={navButton}>Log In</Link> }
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