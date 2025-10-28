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
    <>
      <p>Reports Index</p>
      <p>Reported Posts</p>
      {
        reportsData['posts'].map((post)=>(
          <p key={`post-${post['id']}`}>{post['post_details']['title']}</p>
        ))
      }
      <p>Reported Comments</p>
      {
        reportsData['comments'].map((comment)=>(
          <p key={`comment-${comment['id']}`}>{comment['comment_details']['body']}</p>
        ))
      }
    </>
  )
}

export default ReportsIndex;