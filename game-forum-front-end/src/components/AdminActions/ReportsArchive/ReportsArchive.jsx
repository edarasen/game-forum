import axios from "axios";
import { useState, useEffect } from "react";
import { useData } from "../../../context/DataProvider";
import ReportPostPreview from "../../ReportPostPreview/ReportPostPreview";
import ReportCommentPreview from "../../ReportCommentPreview/ReportCommentPreview";
import Loader from "../../Loader/Loader";
import left_icon from "../../../assets/arrow_left_icon.svg"
import down_icon from "../../../assets/arrow_down_icon.svg"

const API_URL = import.meta.env.VITE_API_URL

function ReportsArchive(){
  const {userHeaders} = useData()
  const [reportsData, setReportsData] = useState('');
  const [collapseComments, setCollapseComments] = useState(false);
  const [collapsePosts, setCollapsePosts] = useState(false);

  const resetData = async(e) => {
    getReportsData()
  }

  const getReportsData = async (e) => {
    try {
      const requestHeaders = {
        headers: { ...userHeaders, Accept: "application/json" }
      }
      const response = await axios.get(`${API_URL}/reports/archive`, requestHeaders)
      const {data} = response;
      if(data.data){
        setReportsData(data.data);
      }
    } catch (error) {
      if(error){
        console.log(error)
      }
    }
  }
  useEffect(()=>{
    getReportsData();
  }, []);
  if (!reportsData){
    return <Loader/>
  }
  return (
    <div className="flex flex-col gap-4 py-6 px-4 text-(--pnb-text-green)">
      <div className="border-2 border-(--pnb-green) mx-4 my-2">
        <div className="bg-(--pnb-green) px-4 py-4 text-(--pnb-gold) flex flex-row items-center justify-between gap-3">
          <h1 className="font-semibold text-2xl">Archived Reported Posts</h1>
          <img src={collapsePosts ? left_icon : down_icon} alt={collapsePosts ? "Expand Posts" : "Collapse Posts"} className="w-8 h-8" onClick={()=>{setCollapsePosts(!collapsePosts)}}/>
        </div>
        <div className={collapsePosts ? "hidden" : ""}>
          {
            reportsData['posts'].length > 0 ? reportsData['posts'].map((post)=>(
              <ReportPostPreview key={`post-${post['report_details']['id']}`} post={post} resetData={resetData}/>
            )) : <p className="text-xl p-8 font-bold">No Reported Posts</p>
          }
        </div>
      </div>
      <div className="border-2 border-(--pnb-green) mx-4 my-2">
        <div className="bg-(--pnb-green) px-4 py-4 text-(--pnb-gold) flex flex-row items-center justify-between gap-3">
          <h1 className="font-semibold text-2xl">Ardchived Reported Comments</h1>
          <img src={collapseComments ? left_icon : down_icon} alt={collapseComments ? "Expand Comments" : "Collapse Comments"} className="w-8 h-8" onClick={()=>{setCollapseComments(!collapseComments)}}/>
        </div>
        <div className={collapseComments ? "hidden" : ""}>
          {
            reportsData['comments'].length > 0 ? reportsData['comments'].map((comment)=>(
              <ReportCommentPreview key={`comment-${comment['report_details']['id']}`} comment={comment} resetData={resetData}/>
            )) : <p className="text-xl p-8 font-bold">No Reported Posts</p>
          }
        </div>
      </div>
    </div>
  )
}

export default ReportsArchive;