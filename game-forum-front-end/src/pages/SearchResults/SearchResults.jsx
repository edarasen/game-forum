import axios from "axios";
import {useEffect, useState} from "react"
import { useData } from "../../context/DataProvider";
import { useSearchParams, useNavigate } from "react-router-dom";
import ForumNavBar from "../../components/ForumNavBar/ForumNavBar";
import search_icon from "../../assets/search_icon.svg"
import left_icon from "../../assets/arrow_left_icon.svg"
import down_icon from "../../assets/arrow_down_icon.svg"
import PostPreview from "../../components/PostPreview/PostPreview";
import UserPreview from "../../components/UserPreview/UserPreview";

const API_URL = import.meta.env.VITE_API_URL

async function getSearchResultsData(userHeaders, queryParam){
  const requestHeaders = {
    headers: { ...userHeaders, Accept: "application/json" }
  }
  return await axios.get(`${API_URL}/search?query=${queryParam}`, requestHeaders).then(
    (response)=> response.data, 
    (error) => error.response.data.error ? console.log(error.response.data.error) : console.log(error.response.data.message))
}

function SearchResultsRenderUsers({users}){
  return users.length > 0 ? 
  users.map((user) => (
    <UserPreview key={`postpreview-${user['id']}`} user={user}/>
  )) : <p className="text-xl p-8 font-bold">No users found</p>
}

function SearchResultsRenderPosts({posts}){
  return posts.length > 0 ? 
  posts.map((post) => (
    <PostPreview key={`postpreview-${post['id']}`} post={post}/>
  )) : <p className="text-xl p-8 font-bold">No posts found</p>
}

function SearchResults({onLogout}){
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [collapseUsers, setCollapseUsers] = useState(false);
  const [collapsePosts, setCollapsePosts] = useState(false);

  const submitSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${search}`)
    window.location.reload(true);
  }
  const actionLink = "flex flex-row items-center gap-3 font-semibold px-4 sm:px-8 py-2 rounded-full cursor-pointer"
  const mainActionLink = `${actionLink} bg-(--pnb-green) text-(--pnb-gold)`
  
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  
  const [searchResultsData, setSearchResultsData] = useState('');
  const {userHeaders} = useData();
    
  useEffect(()=>{
    let mounted = true
    getSearchResultsData(userHeaders, query).then((data)=>{
      if(mounted){
        setSearchResultsData(data.data);
        console.log(data.data)
        console.log('data mounted successfully');
      }
    })
    return ()=>(mounted=false);
  }, []);

  return (
    <>
      <ForumNavBar onLogout={onLogout}/>
      <div className="mx-2 flex flex-col gap-4 text-(--pnb-text-green)">
        <div className="mt-6 flex flex-row gap-4 items-center justify-center w-full">
          <img src={search_icon} alt="Search Icon" className="w-8 h-8"/>
          <p className="font-semibold text-2xl">Search Results for : "{query}"</p>
        </div>
        <form className="w-full flex flex-col items-center gap-2" onSubmit={submitSearch}>
          <input type='text' className="rounded-md p-2 text-lg border border-(--pnb-green) h-20 w-full" onChange={(e) => {setSearch(e.target.value)}} placeholder="Type here"></input>
          <button className={mainActionLink} onClick={submitSearch}>Submit</button>
        </form>
        <div className="flex flex-col gap-2">
          {
            searchResultsData ? 
            <div className="flex flex-col border-2 border-(--pnb-green)">
              <div className="bg-(--pnb-green) px-4 py-4 text-(--pnb-gold) flex flex-row justify-between items-center gap-3">
                  <h1 className="font-semibold text-2xl">Posts</h1>
                  <img src={collapsePosts ? left_icon : down_icon} alt={collapsePosts ? "Expand Posts" : "Collapse Posts"} className="w-8 h-8" onClick={()=>{setCollapsePosts(!collapsePosts)}}/>
              </div>
              <div className={collapsePosts ? "hidden" : ""}>
                <SearchResultsRenderPosts posts={searchResultsData['posts']}/>
              </div>
            </div> : <></>
          }
        </div>
        <div className="flex flex-col gap-2">
          {
            searchResultsData ? 
            <div className="flex flex-col border-2 border-(--pnb-green)">
              <div className="bg-(--pnb-green) px-4 py-4 text-(--pnb-gold) flex flex-row justify-between items-center gap-3">
                  <h1 className="font-semibold text-2xl">Users</h1>
                  <img src={collapseUsers ? left_icon : down_icon} alt={collapseUsers ? "Expand Posts" : "Collapse Posts"} className="w-8 h-8" onClick={()=>{setCollapseUsers(!collapseUsers)}}/>
              </div>
              <div className={collapseUsers ? "hidden" : ""}>
                <SearchResultsRenderUsers users={searchResultsData['users']}/>
              </div>
            </div> : <></>
          }
        </div>
      </div>
    </>
  )
}

export default SearchResults