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
        <div className="bg-(--pnb-green) px-4 py-4 text-(--pnb-gold) flex flex-row items-center gap-3 justify-between">
          <h1 className="font-semibold text-2xl">Edit Channel Group</h1>
        </div>
        {/* text fields for title, body, buttons for save changes and delete */}
      
      </div>
    </>
  )
}

export default EditChannelGroup;