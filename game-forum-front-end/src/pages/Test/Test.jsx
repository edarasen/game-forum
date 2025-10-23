// SAMPLE FILE TO PULL FROM BACKEND API
import axios from "axios";
import { useData } from "../../context/DataProvider";


// Get backend api url from the .env file
const API_URL = import.meta.env.VITE_API_URL

function Test() {
  // Retrieve userHeaders containing user authorization token (if any) from the DataContext provided by DataProvider
  const {userHeaders} = useData();

  // Function for retrieving reports from the backend, accessible only to admins/mods
  const handleAdminAPICall = async (e) => {
    e.preventDefault();
    try {
      // Sets userHeaders as a header and forces axios to accept a format from rails backend api
      const requestHeaders = {
        headers: { ...userHeaders, Accept: "application/json" }
      }

      // Fetch response from api
      const response = await axios.get(`${API_URL}/reports`, requestHeaders);
      // Data abstraction to retrieve data from api respnse
      const {data} = response;

      // If data exists in the response, console.log the data
      if (data.data){
        console.log(data.data);
      }
    }
    catch (error) {
      if (error){
        // Console.log the full error
        console.log(error)
        // Console.log the error message, such as 'user01 is not a moderator or admin'
        error.response.data.error ? console.log(error.response.data.error) : console.log(error.response.data.message)
      }
    }
  }

  // Function for retrieving channelgroups from the backend, accessible to all users (logged in or not)
  // Structured the same way as handledAdminAPICall
  const handleUserAPICall = async (e) => {
    e.preventDefault();
    try {
      const requestHeaders = {
        headers: { ...userHeaders, Accept: "application/json" }
      }
      const response = await axios.get(`${API_URL}/channelgroups`, requestHeaders);
      const {data} = response;
      if (data.data){
        console.log(data.data);
      }
    }
    catch (error) {
      if (error){
        console.log(error)
        error.response.data.error ? console.log(error.response.data.error) : console.log(error.response.data.message)
      }
    }
  }

  // Function for logging out
  // Structured the same way as handledAdminAPICall
  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      const requestHeaders = {
        headers: { ...userHeaders, Accept: "application/json" }
      }
      const response = await axios.delete(`${API_URL}/users/logout`, requestHeaders);
      const {data} = response;
      if (data.data){
        console.log(data.data);
      }
    }
    catch (error) {
      if (error){
        console.log(error)
        error.response.data.error ? console.log(error.response.data.error) : console.log(error.response.data.message)
      }
    }
  }

  return (
    <div>
      <h2>API Fetch Check</h2>
      {/* Test Buttons which map to functions that call from the backend API */}
      <button onClick={handleLogOut}>Log Out</button>
      <button onClick={handleAdminAPICall}>Admin API Call</button>
      <button onClick={handleUserAPICall}>User API Call</button>
    </div>
  )
}

export default Test;