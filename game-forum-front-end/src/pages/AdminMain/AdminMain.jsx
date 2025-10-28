import AdminActions from "../../components/AdminActions/AdminActions";
import ChannelsIndex from "../../components/AdminActions/ChannelsIndex/ChannelsIndex";
import ReportsIndex from "../../components/AdminActions/ReportsIndex/ReportsIndex";
import UsersIndex from "../../components/AdminActions/UsersIndex/UsersIndex";
import ForumNavBar from "../../components/ForumNavBar/ForumNavBar";
import { useState } from "react";

function AdminMain({onLogout}){
  const [show, setShow] = useState('reports')

  const handleReports = () => {
    setShow('reports')
  }
  const handleAllUsers = () => {
    setShow('all-users')
  }
  const handleChannels = () => {
    setShow('channels')
  }
  return (
    <>
      <ForumNavBar onLogout={onLogout}/>
      <AdminActions handleReports={handleReports} handleAllUsers={handleAllUsers} handleChannels={handleChannels}/>
      {
        show === 'reports' ?
        <ReportsIndex/> : <></>
      }
      {
        show === 'all-users' ?
        <UsersIndex/> : <></>
      }
      {
        show === 'channels' ?
        <ChannelsIndex/> : <></>
      }
    </>
  )
}

export default AdminMain;