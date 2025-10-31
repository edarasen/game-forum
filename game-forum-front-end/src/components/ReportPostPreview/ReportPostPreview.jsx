import axios from "axios";
import { useNavigate } from "react-router-dom"
import { useData } from "../../context/DataProvider";

const API_URL = import.meta.env.VITE_API_URL;

function ReportPostPreview({post, resetData}) {
  const navigate = useNavigate()
  const { userHeaders } = useData();
  const navButton = "hover:font-semibold underline cursor-pointer"
  const capitalize = (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }
  async function deleteReport(userHeaders, id) {
    const requestHeaders = {
      headers: { ...userHeaders, Accept: "application/json" }
    }
    console.log(userHeaders)
    return await axios.delete(`${API_URL}/reports/${id}`, requestHeaders).then(
      (response) => response.data,
      (error) => {
        console.error("Report deletion error:", error);
        return null;
      }
    )
  }
  async function archiveReport(userHeaders, id) {
    const requestHeaders = {
      headers: { ...userHeaders, Accept: "application/json" }
    }
    return await axios.patch(`${API_URL}/reports/archive/${id}`, {}, requestHeaders).then(
      (response) => response.data,
      (error) => {
        console.log(userHeaders)
        console.error("Report archive error:", error);
        return null;
      }
    )
  }
  const handleDeleteReport = async (e) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      const result = await deleteReport(userHeaders, post['report_details']['id']);
      if (result) {
        alert("Report deleted successfully");
        resetData()
      } else {
        alert("Failed to delete report");
      }
    }
  }
  const handleArchiveReport = async (e) => {
    if (window.confirm("Are you sure you want to archive this report?")) {
      const result = await archiveReport(userHeaders, post['report_details']['id']);
      if (result) {
        alert("Report archived successfully");
        resetData()
      } else {
        alert("Failed to archive report");
      }
    }
  }
  return (
    <div 
      className="flex flex-row items-center justify-between px-6 py-4 hover:bg-(--pnb-alternate-parchment) text-(--pnb-text-green)"
    >
      <div className="text-left">
        <h6 className="text-sm">{capitalize(post['report_details']['report_reason'])} Report By : {post['reporter_details']['username']}</h6>
        <h4 onClick={() => navigate(`/posts/${post['post_details']['id']}`)} className="font-semibold cursor-pointer text-2xl hover:underline hover:font-bold">{post['post_details']['title']}</h4>
        <h6 className="text-sm">Posted By : {post['owner_details']['username']}</h6>
      </div>
      <div className="flex flex-row gap-6">
        {!post['report_details']['archive'] && <button onClick={handleArchiveReport} className={navButton}>Archive</button>}
        <button onClick={handleDeleteReport} className={`text-[#f05252ff] ${navButton}`}>Delete</button>
      </div>
    </div>
  )
}

export default ReportPostPreview