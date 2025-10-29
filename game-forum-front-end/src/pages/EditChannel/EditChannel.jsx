import axios from "axios";
import { useData } from "../../context/DataProvider";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import ForumNavBar from "../../components/ForumNavBar/ForumNavBar"

const API_URL = import.meta.env.VITE_API_URL;

function EditChannel(){
  const {id} = useParams();
  const navigate = useNavigate();
  const { userHeaders, userDetails} = useData();

  const [channelData, setChannelData] = useState('')
  const [editChannelTitle, setEditChannelTitle] = useState('');
  const [editChannelDescription, setEditChannelDescription] = useState('');

  const getChannelData = async (e) => {
    try {
      const requestHeaders = {
        headers: { ...userHeaders, Accept: "application/json" }
      }
      const response = await axios.get(`${API_URL}/channels/${id}`, requestHeaders)
      const {data} = response;
      if(data.data){
        setChannelData(data.data);
        setEditChannelTitle(data.data['channel_details']['title']);
        setEditChannelDescription(data.data['channel_details']['description']);
      }
    } catch (error) {
      if(error){
        console.log(error)
      }
    }
  }

  async function deleteChannel(userHeaders, id) {
    const requestHeaders = {
      headers: { ...userHeaders, Accept: "application/json" }
    }
    return await axios.delete(`${API_URL}/channels/${id}`, requestHeaders).then(
      (response) => response.data,
      (error) => {
        console.error("Channel deletion error:", error);
        return null;
      }
    )
  }

  async function updateChannel(userHeaders, channelId, title, description) {
  const requestHeaders = {
    headers: { ...userHeaders, Accept: "application/json" }
  }
  return await axios.patch(
    `${API_URL}/channels/${channelId}`,
    { channel: { title, description } },
    requestHeaders
  ).then(
    (response) => response.data,
    (error) => {
      console.error("Channel update error:", error);
      return null;
    }
  )
}

  const handleUpdateChannel = async (e)=>{
    e.preventDefault();
    
    if (!editChannelTitle.trim() || !editChannelDescription.trim()) {
      alert("Title and description cannot be empty");
      return;
    }

    const result = await updateChannel(userHeaders, id, editChannelTitle, editChannelDescription);
    
    if (result) {
      const updatedData = await getChannelData(id);
      if (updatedData) {
        setChannelData(updatedData.data);
      }
      alert("Channel updated successfully");
      navigate(-1);
    } else {
      alert("Failed to update channel");
    }
  }

  const handleDeleteChannel = async(e) => {
    if (window.confirm("Are you sure you want to delete this channel? This will also delete all posts and comments inside.")) {
      const result = await deleteChannel(userHeaders, id);
      if (result) {
        alert("Channel deleted successfully");
        navigate(-1);
      } else {
        alert("Failed to delete channel");
      }
    }
  }

  useEffect(()=>{
    getChannelData();
  }, []);

  if (!channelData){
    return <Loader/>
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
            <h1 className="font-semibold text-2xl">Edit Channel</h1>
          </div>
          <form onSubmit={handleUpdateChannel} className="flex flex-col gap-3 px-4 mt-4">
            <p className="text-xl text-(--pnb-text-green)">Channel Title</p>
            <input
              type="text"
              value={editChannelTitle}
              onChange={(e) => setEditChannelTitle(e.target.value)}
              className="w-full text-3xl font-bold text-[#5B6153] bg-white px-4 py-2 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#F7D480]"
              placeholder="Channel title..."
            />
            <p className="text-xl text-(--pnb-text-green)">Description</p>
            <input
              type="text"
              value={editChannelDescription}
              onChange={(e) => setEditChannelDescription(e.target.value)}
              className="w-full text-3xl font-bold text-[#5B6153] bg-white px-4 py-2 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#F7D480]"
              placeholder="Channel description..."
            />
          </form>
          <div className="flex flex-row gap-4 justify-between px-4 py-4">
            <button className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors font-semibold" onClick={handleDeleteChannel}>Delete</button>
            <button className="px-6 py-2 bg-[#6B796A] text-[#F7D480] rounded hover:bg-[#5B6153] transition-colors font-semibold" onClick={handleUpdateChannel}>Save Changes</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditChannel;