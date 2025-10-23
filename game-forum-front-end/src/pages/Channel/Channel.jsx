import axios from "axios";
import {useEffect, useState} from "react"
import { useParams } from "react-router-dom";
import { useData } from "../../context/DataProvider";
import ForumNavBar from "../../components/ForumNavBar/ForumNavBar";
import PostPreview from "../../components/PostPreview/PostPreview";

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
        console.log(data.data)
      }
    })
    return ()=>(mounted=false);
  }, []);

  return (
    <>
      <ForumNavBar onLogout={onLogout}/>
      {
        channelData ? 
        <div className="my-6 border-2 border-solid border-(--pnb-green) mx-2 text-left">
          <div className="bg-(--pnb-green) px-4 py-4 text-(--pnb-gold) flex flex-col">
            <h3 className="text-sm">{channelData['channelgroup_details']['title']}</h3>  
            <h1 className="font-semibold text-2xl">{channelData['channel_details']['title']}</h1> 
          </div>

          <div className="py-6 flex flex-col gap-2">
            {
              channelData['posts'].map(
                (post) => (
                  <PostPreview
                    key={`postpreview-${post['id']}`}
                    post={post}
                  />
                )
              )
            }
          </div>
        </div> : "Retrieving channel data..."
      } 
    </>
  )
}

export default Channel;