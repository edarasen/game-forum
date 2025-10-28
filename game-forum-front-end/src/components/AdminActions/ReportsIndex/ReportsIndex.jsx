import axios from "axios";
import { useState, useEffect } from "react";
import { useData } from "../../../context/DataProvider";

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
      <div className="border-2 border-(--pnb-green) px-4 py-2">
        <p>Reported Posts</p>
        {
          reportsData['posts'].map((post)=>(
            <p key={`post-${post['id']}`}>{post['post_details']['title']} : {post['report_reason']}</p>
          ))
        }
      </div>
      <div className="border-2 border-(--pnb-green) px-4 py-2">
        <p>Reported Comments</p>
        {
          reportsData['comments'].map((comment)=>(
            <p key={`comment-${comment['id']}`}>{comment['comment_details']['body']} : {comment['report_reason']}</p>
          ))
        }
      </div>
    </div>
  )
}

export default ReportsIndex;