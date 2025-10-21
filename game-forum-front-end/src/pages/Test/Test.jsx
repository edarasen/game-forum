import { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useData } from "../../context/DataProvider";

const API_URL = import.meta.env.VITE_API_URL

function Test() {
  const {userHeaders} = useData();
  const handleAdminAPICall = async (e) => {
    e.preventDefault();
    try {
      const requestHeaders = {
        headers: userHeaders
      }
      const response = await axios.get(`${API_URL}/reports`, requestHeaders);
      const {data} = response;
      if (data.data){
        console.log(data.data);
      }
    }
    catch (error) {
      console.log(userHeaders);
      if (error){
        console.log(error)
      }
    }
  }

  const handleUserAPICall = async (e) => {
    e.preventDefault();
    try {
      const requestHeaders = {
        headers: userHeaders
      }
      const response = await axios.get(`${API_URL}/channelgroups`, requestHeaders);
      const {data} = response;
      if (data.data){
        console.log(data.data);
      }
    }
    catch (error) {
      console.log(userHeaders);
      if (error){
        console.log(error)
      }
    }
  }

  return (
    <div>
      <h2>Permissions Check</h2>
      <button onClick={handleAdminAPICall}>Admin API Call</button>
      <button onClick={handleUserAPICall}>User API Call</button>
    </div>
  )
}

export default Test;