import axios from "axios";
import { useState, useEffect } from "react";
import { useData } from "../../../context/DataProvider";
import Loader from "../../Loader/Loader";
import ChannelGroup from "../../ChannelGroup/ChannelGroup";

const API_URL = import.meta.env.VITE_API_URL

function ChannelsIndex(){
  const {userHeaders} = useData()
  const [channelsData, setChannelsData] = useState('');
  const getChannelsData = async (e) => {
    try {
      const requestHeaders = {
        headers: { ...userHeaders, Accept: "application/json" }
      }
      const response = await axios.get(`${API_URL}/channelgroups`, requestHeaders)
      const {data} = response;
      if(data.data){
        setChannelsData(data.data);
      }
    } catch (error) {
      if(error){
        console.log(error)
      }
    }
  }
  useEffect(()=>{
    getChannelsData();
  }, []);
  if (!channelsData){
    return <Loader/>
  }
  return (
      <div>
        {
          <div className="py-6 flex flex-col gap-8">
            {channelsData.map((channelgroup) => (
              <ChannelGroup 
                key={`channelgroup-${channelgroup['channelgroup_details']['id']}`} 
                channelgroup={channelgroup}
              />
            ))}
          </div>
        }
      </div>
  )
}

export default ChannelsIndex;