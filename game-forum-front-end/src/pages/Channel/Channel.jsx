import axios from "axios";
import {useEffect, useState} from "react"
import { useParams } from "react-router-dom";
import { useData } from "../../context/DataProvider";
import forums_cg_logo from "../../assets/forums-channelgroup-icon.webp";
import ForumNavBar from "../../components/ForumNavBar/ForumNavBar";
import PostPreview from "../../components/PostPreview/PostPreview";
import ForumMainActions from "../../components/ForumMainActions/ForumMainActions";
import Loader from "../../components/Loader/Loader";

const API_URL = import.meta.env.VITE_API_URL

function getChannelData(userHeaders, id){
  const requestHeaders = {
    headers: { ...userHeaders, Accept: "application/json" }
  }
  return axios.get(`${API_URL}/channels/${id}`, requestHeaders).then(
    (response)=> response.data, 
    (error) => error.response.data.error ? console.log(error.response.data.error) : console.log(error.response.data.message))
}

function Channel({onLogout}){
  const [channelData, setChannelData] = useState('');
  let {channel_id} = useParams();
  let {userHeaders} = useData();

  useEffect(()=>{
    let mounted = true
    getChannelData(userHeaders, channel_id).then((data)=>{
      if(mounted){
        setChannelData(data.data);
        console.log('data mounted successfully');
      }
    })
    return ()=>(mounted=false);
  }, []);

  return (
    <>
      <ForumNavBar onLogout={onLogout}/>
      <ForumMainActions/>
      {
        channelData ? 
        <div className="my-6 border-2 border-solid border-(--pnb-green) mx-2 text-left">
          <div className="bg-(--pnb-green) px-4 py-4 text-(--pnb-gold) flex flex-row items-center gap-3">
            <img src={forums_cg_logo} alt="Pluck and Brew Logo" className="w-12 h-12"/>
            <div className="flex flex-col">
              <h1 className="text-sm">{channelData['channelgroup_details']['title']}</h1>
              <h3 className="font-semibold text-2xl">{channelData['channel_details']['title']}</h3>
            </div>        
          </div>

          <div className="py-6 flex flex-col gap-2">
            {
              channelData['posts'].length > 0 ? channelData['posts'].map(
                (post) => (
                  <PostPreview
                    key={`postpreview-${post['id']}`}
                    post={post}
                  />
                )
              ) : <h2 className="text-(--pnb-text-green) text-center">No posts in channel</h2>
            }
          </div>
        </div> : <Loader/>
      } 
    </>
  )
}

export default Channel;