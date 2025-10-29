import forums_cg_logo from "../../assets/forums-channelgroup-icon.webp";
import axios from "axios";
import { useData } from "../../context/DataProvider";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import ForumNavBar from "../../components/ForumNavBar/ForumNavBar"

const API_URL = import.meta.env.VITE_API_URL;

function EditChannelGroup(){
  const {id} = useParams();
  const navigate = useNavigate();
  const { userHeaders, userDetails} = useData();

  const [channelGroupData, setChannelGroupData] = useState('')
  const [editChannelGroupTitle, setEditChannelGroupTitle] = useState('');
  const [editChannelGroupDescription, setEditChannelGroupDescription] = useState('');

  const adminPermission = userDetails && (
    userDetails.role === 'admin' ||
    userDetails.role === 'moderator'
  );

  const getChannelGroupData = async (e) => {
    try {
      const requestHeaders = {
        headers: { ...userHeaders, Accept: "application/json" }
      }
      const response = await axios.get(`${API_URL}/channelgroups/${id}`, requestHeaders)
      const {data} = response;
      if(data.data){
        setChannelGroupData(data.data);
        setEditChannelGroupTitle(data.data['channelgroup_details']['title']);
        setEditChannelGroupDescription(data.data['channelgroup_details']['description']);
      }
    } catch (error) {
      if(error){
        console.log(error)
      }
    }
  }

  async function deleteChannelGroup(userHeaders, id) {
    const requestHeaders = {
      headers: { ...userHeaders, Accept: "application/json" }
    }
    return await axios.delete(`${API_URL}/channelgroups/${id}`, requestHeaders).then(
      (response) => response.data,
      (error) => {
        console.error("Channel group deletion error:", error);
        return null;
      }
    )
  }

  async function updateChannelGroup(userHeaders, channelgroupId, title, description) {
  const requestHeaders = {
    headers: { ...userHeaders, Accept: "application/json" }
  }
  return await axios.patch(
    `${API_URL}/channelgroups/${channelgroupId}`,
    { channelgroup: { title, description } },
    requestHeaders
  ).then(
    (response) => response.data,
    (error) => {
      console.error("Channel group update error:", error);
      return null;
    }
  )
}

  const handleUpdateChannelGroup = async (e)=>{
    e.preventDefault();
    
    if (!editChannelGroupTitle.trim() || !editChannelGroupDescription.trim()) {
      alert("Title and description cannot be empty");
      return;
    }

    const result = await updateChannelGroup(userHeaders, id, editChannelGroupTitle, editChannelGroupDescription);
    
    if (result) {
      const updatedData = await getChannelGroupData(id);
      if (updatedData) {
        setChannelGroupData(updatedData.data);
      }
      alert("Channel group updated successfully");
      navigate(-1);
    } else {
      alert("Failed to update channel group");
    }
  }

  const handleDeleteChannelGroup = async(e) => {
    if (window.confirm("Are you sure you want to delete this channel group? This will also delete all channels and posts inside.")) {
      const result = await deleteChannelGroup(userHeaders, id);
      if (result) {
        alert("Channel group deleted successfully");
        navigate(-1);
      } else {
        alert("Failed to delete channel group");
      }
    }
  }

  useEffect(()=>{
    getChannelGroupData();
  }, []);

  if (!channelGroupData){
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
            <h1 className="font-semibold text-2xl">Edit Channel Group</h1>
          </div>
          <form onSubmit={handleUpdateChannelGroup} className="flex flex-col gap-3 px-4 mt-4">
            <p className="text-xl text-(--pnb-text-green)">Channel Group Title</p>
            <input
              type="text"
              value={editChannelGroupTitle}
              onChange={(e) => setEditChannelGroupTitle(e.target.value)}
              className="w-full text-3xl font-bold text-[#5B6153] bg-white px-4 py-2 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#F7D480]"
              placeholder="Channel group title..."
            />
            <p className="text-xl text-(--pnb-text-green)">Description</p>
            <input
              type="text"
              value={editChannelGroupDescription}
              onChange={(e) => setEditChannelGroupDescription(e.target.value)}
              className="w-full text-3xl font-bold text-[#5B6153] bg-white px-4 py-2 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#F7D480]"
              placeholder="Channel group description..."
            />
          </form>
          <div className="flex flex-row gap-4 justify-between px-4 py-4">
            <button className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors font-semibold" onClick={handleDeleteChannelGroup}>Delete</button>
            <button className="px-6 py-2 bg-[#6B796A] text-[#F7D480] rounded hover:bg-[#5B6153] transition-colors font-semibold" onClick={handleUpdateChannelGroup}>Save Changes</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditChannelGroup;