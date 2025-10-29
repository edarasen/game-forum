import axios from "axios";
import { useState, useEffect } from "react";
import { useData } from "../../../context/DataProvider";
import ReportPostPreview from "../../ReportPostPreview/ReportPostPreview";
import ReportCommentPreview from "../../ReportCommentPreview/ReportCommentPreview";

const API_URL = import.meta.env.VITE_API_URL

function ReportsIndex(){
  const {userHeaders} = useData()
  const [reportsData, setReportsData] = useState('');
  const getReportsData = async (e) => {
    try {
      const requestHeaders = {
        headers: { ...userHeaders, Accept: "application/json" }
      }
      const response = await axios.get(`${API_URL}/reports`, requestHeaders)
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
    return <></>
  }
  return (
    <div className="flex flex-col gap-4 py-6 px-4">
      <div className="border-2 border-(--pnb-green) mx-4 my-2">
        <div className="bg-(--pnb-green) px-4 py-4 text-(--pnb-gold) flex flex-row items-center gap-3">
          <h1 className="font-semibold text-2xl">Reported Posts</h1>
        </div>
        {
          reportsData['posts'].map((post)=>(
            <ReportPostPreview key={`post-${post['report_details']['id']}`} post={post}/>
          ))
        }
      </div>
      <div className="border-2 border-(--pnb-green) mx-4 my-2">
        <div className="bg-(--pnb-green) px-4 py-4 text-(--pnb-gold) flex flex-row items-center gap-3">
          <h1 className="font-semibold text-2xl">Reported Comments</h1>
        </div>
        {
          reportsData['comments'].map((comment)=>(
            <ReportCommentPreview key={`comment-${comment['report_details']['id']}`} comment={comment}/>
          ))
        }
      </div>
    </div>
  )
}

export default ReportsIndex;