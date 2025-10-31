import axios from "axios";
import { useData } from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ForumNavBar from "../../components/ForumNavBar/ForumNavBar"
import Loader from "../../components/Loader/Loader";

const API_URL = import.meta.env.VITE_API_URL;

function NewChannel(){
  const navigate = useNavigate();
  const { userHeaders } = useData();
  const [allChannelGroupsData, setAllChannelGroupsData] = useState();
  const [channelGroupId, setChannelGroupId] = useState('');
  const [newChannelTitle, setNewChannelTitle] = useState('');
  const [newChannelDescription, setNewChannelDescription] = useState('');

  const getAllChannelGroupsData = async (e) => {
    try {
      const requestHeaders = {
        headers: { ...userHeaders, Accept: "application/json" }
      }
      const response = await axios.get(`${API_URL}/channelgroups`, requestHeaders)
      const {data} = response;
      if(data.data){
        setAllChannelGroupsData(data.data);
      }
    } catch (error) {
      if(error){
        console.log(error)
      }
    }
  }
  useEffect(()=>{
    getAllChannelGroupsData();
  }, []);

  if (!allChannelGroupsData){
    return <Loader/>
  }

  const handleChannelGroupChange = (e) => {
    setChannelGroupId(e.target.value);
  };

  async function createChannel(userHeaders, title, description) {
    const requestHeaders = {
      headers: { ...userHeaders, Accept: "application/json" }
    }
    return await axios.post(
      `${API_URL}/channelgroups/${channelGroupId}/channels`,
      { channel: { title, description } },
      requestHeaders
    ).then(
      (response) => response.data,
      (error) => {
        console.error("Channel create error:", error);
        return null;
      }
    )
  }

  const handleCreateChannel = async (e) => {
    e.preventDefault();
    
    if (!newChannelTitle.trim() || !newChannelDescription.trim()) {
      alert("Title and description cannot be empty");
      return;
    }

    const result = await createChannel(userHeaders, newChannelTitle, newChannelDescription);
    
    if (result) {
      alert("Channel created successfully");
      navigate(-1);
    } else {
      alert("Failed to create channel");
    }
  }

  return (
    <>
      <ForumNavBar/>
      <div className="mx-2 mt-6 text-left">
        <button
          onClick={() => navigate(-1)}
          className="w-1/9 mb-4 px-4 py-2 cursor-pointer text-left text-[#5B6153] hover:text-[#6B796A] transition-colors"
        >
          ← <span className="underline">Back</span> 
        </button>
        <div className="border-2 border-(--pnb-green)">
          <div className="bg-(--pnb-green) px-4 py-4 text-(--pnb-gold) flex flex-row items-center gap-3 justify-between">
            <h1 className="font-semibold text-2xl">Create Channel</h1>
          </div>
          <form onSubmit={handleCreateChannel} className="flex flex-col gap-3 px-4 mt-4">
            <p className="text-xl text-(--pnb-text-green)">Channel Group</p>
            {allChannelGroupsData.map((channelgroup) => (
              <div className="flex flex-row gap-2 px-4 text-(--pnb-text-green)">
                <input
                  type="radio"
                  id={channelgroup['channelgroup_details']["title"]}
                  name="channelgroup_id"
                  value={channelgroup['channelgroup_details']["id"]}
                  onChange={handleChannelGroupChange}
                  required
                />
                <label>
                  {channelgroup['channelgroup_details']["title"]}
                </label>
              </div>
            ))}
            <p className="text-xl text-(--pnb-text-green)">Channel Title</p>
            <input
              type="text"
              value={newChannelTitle}
              onChange={(e) => setNewChannelTitle(e.target.value)}
              className="w-full text-3xl font-bold text-[#5B6153] bg-white px-4 py-2 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#F7D480]"
              placeholder="Channel group title..."
            />
            <p className="text-xl text-(--pnb-text-green)">Description</p>
            <input
              type="text"
              value={newChannelDescription}
              onChange={(e) => setNewChannelDescription(e.target.value)}
              className="w-full text-3xl font-bold text-[#5B6153] bg-white px-4 py-2 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#F7D480]"
              placeholder="Channel group description..."
            />
          </form>
          <div className="flex flex-row gap-4 justify-between px-4 py-4">
            <button className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors font-semibold" onClick={()=>(navigate(-1))}>Cancel</button>
            <button className="px-6 py-2 bg-[#6B796A] text-[#F7D480] rounded hover:bg-[#5B6153] transition-colors font-semibold" onClick={handleCreateChannel}>Create</button>
          </div>
        </div>
      </div>
    </>
  )
}
export default NewChannel