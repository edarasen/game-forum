import axios from "axios";
import { useData } from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ForumNavBar from "../../components/ForumNavBar/ForumNavBar"

const API_URL = import.meta.env.VITE_API_URL;

function NewChannelGroup(){
  const navigate = useNavigate();
  const { userHeaders } = useData();

  const [newChannelGroupTitle, setNewChannelGroupTitle] = useState('');
  const [newChannelGroupDescription, setNewChannelGroupDescription] = useState('');

  async function createChannelGroup(userHeaders, title, description) {
    const requestHeaders = {
      headers: { ...userHeaders, Accept: "application/json" }
    }
    return await axios.post(
      `${API_URL}/channelgroups`,
      { channelgroup: { title, description } },
      requestHeaders
    ).then(
      (response) => response.data,
      (error) => {
        console.error("Channel group create error:", error);
        return null;
      }
    )
  }

  const handleCreateChannelGroup = async (e) => {
    e.preventDefault();
    
    if (!newChannelGroupTitle.trim() || !newChannelGroupDescription.trim()) {
      alert("Title and description cannot be empty");
      return;
    }

    const result = await createChannelGroup(userHeaders, newChannelGroupTitle, newChannelGroupDescription);
    
    if (result) {
      alert("Channel group created successfully");
      navigate(-1);
    } else {
      alert("Failed to create channel group");
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
            <h1 className="font-semibold text-2xl">Create Channel Group</h1>
          </div>
          <form onSubmit={handleCreateChannelGroup} className="flex flex-col gap-3 px-4 mt-4">
            <p className="text-xl text-(--pnb-text-green)">Channel Group Title</p>
            <input
              type="text"
              value={newChannelGroupTitle}
              onChange={(e) => setNewChannelGroupTitle(e.target.value)}
              className="w-full text-3xl font-bold text-[#5B6153] bg-white px-4 py-2 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#F7D480]"
              placeholder="Channel group title..."
            />
            <p className="text-xl text-(--pnb-text-green)">Description</p>
            <input
              type="text"
              value={newChannelGroupDescription}
              onChange={(e) => setNewChannelGroupDescription(e.target.value)}
              className="w-full text-3xl font-bold text-[#5B6153] bg-white px-4 py-2 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#F7D480]"
              placeholder="Channel group description..."
            />
          </form>
          <div className="flex flex-row gap-4 justify-between px-4 py-4">
            <button className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors font-semibold" onClick={()=>(navigate(-1))}>Cancel</button>
            <button className="px-6 py-2 bg-[#6B796A] text-[#F7D480] rounded hover:bg-[#5B6153] transition-colors font-semibold" onClick={handleCreateChannelGroup}>Create</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewChannelGroup