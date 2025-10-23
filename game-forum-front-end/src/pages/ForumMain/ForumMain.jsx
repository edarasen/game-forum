import axios from "axios";
import {useEffect, useState} from "react"
import { useData } from "../../context/DataProvider";
import './ForumMain.css';
import ChannelGroup from "../../components/ChannelGroup/ChannelGroup";
import ForumNavBar from "../../components/ForumNavBar/ForumNavBar";

const API_URL = import.meta.env.VITE_API_URL

function getChannelGroupsData(userHeaders){
  const requestHeaders = {
    headers: { ...userHeaders, Accept: "application/json" }
  }
  return axios.get(`${API_URL}/channelgroups`, requestHeaders).then(
    (response)=> response.data, 
    (error) => error.response.data.error ? console.log(error.response.data.error) : console.log(error.response.data.message))
}

function ForumMain({onLogout}){
  const [channelGroupsData, setChannelGroupsData] = useState([]);
  const {userHeaders} = useData();
  
  useEffect(()=>{
    let mounted = true
    getChannelGroupsData(userHeaders).then((data)=>{
      if(mounted){
        setChannelGroupsData(data.data);
        console.log('data mounted successfully');
      }
    })
    return ()=>(mounted=false);
  }, []);

  return (
    <>
      <ForumNavBar onLogout={onLogout}/>
        {
          channelGroupsData.length > 0 ? 
          <div className="py-6 flex flex-col gap-8">
            {channelGroupsData.map((channelgroup) => (
              <ChannelGroup 
                key={`channelgroup-${channelgroup['channelgroup_details']['id']}`} 
                channelgroup={channelgroup}
              />
            ))}
          </div> : "Retrieving channel groups data..."
        }
    </>
  )
}

export default ForumMain;