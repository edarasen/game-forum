import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useData } from "../../context/DataProvider"
import add_icon from "../../assets/add_icon.svg"
import latest_icon from "../../assets/latest_icon.svg"
import search_icon from "../../assets/search_icon.svg"

function ForumMainActions(){
  const navigate = useNavigate()
  const {userHeaders} = useData()
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const actionLink = "flex flex-row items-center gap-3 font-semibold px-4 sm:px-8 py-2 rounded-full cursor-pointer"
  const mainActionLink = `${actionLink} bg-(--pnb-green) text-(--pnb-gold)`
  const secondaryActionLink = `${actionLink} border-(--pnb-green) border-2 text-(--pnb-green)`

  const submitSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${search}`)
  }

  const searchOverlay = "absolute w-[100%] bg-(--pnb-parchment-nav) backdrop-blur-lg z-1500 h-[100vh] m-0 items-center flex-col backdrop-blur-3xl list-none text-(--pnb-text-green) py-12 gap-12"
  return (
    <div className="flex flex-row justify-around">
      <div className={`${searchOverlay} ${menuOpen ? "flex" : "hidden"}`}>
        <div className="flex flex-col items-center w-[90%] gap-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center w-full">
            <img src={search_icon} alt="Search Icon" className="w-8 h-8" />
            <p className="font-semibold text-2xl">Search</p>
            <form className="w-full" onSubmit={submitSearch}>
            <input
              type="text"
              className="rounded-md p-2 text-lg border border-(--pnb-green) h-20 w-full"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Type here"
            ></input>
          </form>
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <button className={mainActionLink} onClick={submitSearch}>
            Submit
          </button>
          <button
            className={secondaryActionLink}
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          >
            Back
          </button>
        </div>
      </div>
      {userHeaders ? (
        <Link to="/channels/posts/new" className={mainActionLink}>
          <img src={add_icon} alt="Add Icon" className="w-8 h-8" />
          New Post
        </Link>
      ) : (
        <></>
      )}
      <Link to="/latest" className={secondaryActionLink}>
        <img src={latest_icon} alt="Auto Renew Icon" className="w-8 h-8" />
        Latest Posts
      </Link>
      <button
        className={secondaryActionLink}
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        <img src={search_icon} alt="Search Icon" className="w-8 h-8" />
      </button>
    </div>
  );
}

export default ForumMainActions;