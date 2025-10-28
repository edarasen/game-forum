import axios from "axios";
import {useEffect, useState} from "react"
import { useData } from "../../context/DataProvider";
import forums_cg_logo from "../../assets/forums-channelgroup-icon.webp";
import ForumNavBar from "../../components/ForumNavBar/ForumNavBar";
import Loader from "../../components/Loader/Loader";
import PostPreview from "../../components/PostPreview/PostPreview";
import ForumMainActions from "../../components/ForumMainActions/ForumMainActions";

const API_URL = import.meta.env.VITE_API_URL

async function getLatestPostsData(userHeaders){
  const requestHeaders = {
    headers: { ...userHeaders, Accept: "application/json" }
  }
  return axios.get(`${API_URL}/latest`, requestHeaders).then(
    (response)=> response.data, 
    (error) => error.response.data.error ? console.log(error.response.data.error) : console.log(error.response.data.message))
}

function LatestPosts({onLogout}){
  const [latestPostsData, setLatestPostsData] = useState([]);
  const {userHeaders} = useData();
  
  useEffect(()=>{
    let mounted = true
    getLatestPostsData(userHeaders).then((data)=>{
      if(mounted){
        setLatestPostsData(data.data);
        console.log('data mounted successfully');
        console.log(data.data)
      }
    })
    return ()=>(mounted=false);
  }, []);

  return (
    <>
      <ForumNavBar onLogout={onLogout}/>
      <ForumMainActions />
        {
          latestPostsData['posts'] ? 
          <div className="flex flex-col border-2 border-(--pnb-green) mx-2 my-6">
            <div className="bg-(--pnb-green) px-4 py-4 text-(--pnb-gold) flex flex-row items-center gap-3">
              <img src={forums_cg_logo} alt="Pluck and Brew Logo" className="w-12 h-12"/>
              <div className="flex flex-col text-left">
                <h1 className="font-semibold text-2xl">Latest Posts</h1>
                <h3 className="text-sm">Heralds bring news from across the Living Lands</h3>
              </div>        
            </div>
            {/* <div className="bg-(--pnb-green) px-4 py-4 text-(--pnb-gold) flex flex-row items-center gap-3">
              <h1 className="font-semibold text-2xl">Latest Posts</h1>
            </div> */}
            <div className="py-6 flex flex-col gap-8">
              {latestPostsData['posts'].map((post) => (
                <PostPreview 
                  key={`post-${post['id']}`} 
                  post={post}
                />
              ))}
            </div>
          </div> : <Loader/>
        }
    </>
  )
}
export default LatestPosts;