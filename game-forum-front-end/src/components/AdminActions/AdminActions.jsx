import report_icon from "../../assets/report_icon.svg"
import all_users_icon from "../../assets/all_users_icon.svg"
import channels_icon from "../../assets/channels_icon.svg"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function AdminActions({handleReports, handleAllUsers, handleChannels, handleReportsSubAction, handleUsersSubAction}){
  const navigate = useNavigate();
  const [subActions, setSubActions] = useState('reports');
  
  const handleShowActiveReports = () => {
    handleReportsSubAction('active')
  }
  const handleShowArchiveReports = () => {
    handleReportsSubAction('archive')
  }
  const handleReportsSub = () => {
    setSubActions('reports')
    handleReports()
  }
  const handleAllUsersSub = () => {
    setSubActions('all-users')
    handleAllUsers()
  }
  const handleChannelsSub = () => {
    setSubActions('channels')
    handleChannels()
  }
  
  // User sub-action handlers
  const handleModeratorApplications = () => {
    handleUsersSubAction('applications')
  }
  const handleActiveUsers = () => {
    handleUsersSubAction('active')
  }
  const handleBannedUsers = () => {
    handleUsersSubAction('banned')
  }
  const handleCreateUser = () => {
    handleUsersSubAction('create')
  }

  const actionButton = "flex lg:flex-row flex-col gap-2 lg:rounded-full rounded-xl text-(--pnb-gold) bg-(--pnb-green) cursor-pointer px-4 py-4 items-center"
  const subActionButton = "flex flex-row gap-2 rounded-full border border-(--pnb-green) bg-(--pnb-gold) text-(--pnb-text-green) cursor-pointer px-4 py-2 items-center"
  
  return (
    <>
      <div className="flex flex-row justify-around pt-4">
        <button className={actionButton} onClick={handleReportsSub}>
          <img src={report_icon} alt="Search Icon" className="w-8 h-8" />
          <p>Reports</p>
        </button>
        <button className={actionButton} onClick={handleAllUsersSub}>
          <img src={all_users_icon} alt="Search Icon" className="w-8 h-8" />
          <p>All Users</p>
        </button>
        <button className={actionButton} onClick={handleChannelsSub}>
          <img src={channels_icon} alt="Search Icon" className="w-8 h-8" />
          <p>Channels</p>
        </button>
      </div>
      
      { 
        subActions === 'reports' && <div className="flex flex-row justify-center gap-2 pt-4">
          <button className={subActionButton} onClick={handleShowActiveReports}>Active Reports</button>
          <button className={subActionButton} onClick={handleShowArchiveReports}>Archive</button>
        </div>
      }
      
      { 
        subActions === 'all-users' && <div className="flex flex-row justify-center pt-4 flex-wrap gap-2 ">
          <button className={subActionButton} onClick={handleModeratorApplications}>Moderator Applications</button>
          <button className={subActionButton} onClick={handleActiveUsers}>Active Users</button>
          <button className={subActionButton} onClick={handleBannedUsers}>Banned Users</button>
          <button className={subActionButton} onClick={handleCreateUser}>Create User</button>
        </div>
      }
      
      { 
        subActions === 'channels' && <div className="flex flex-row justify-center gap-2 pt-4">
          <button className={subActionButton} onClick={() => navigate('/new/channel')}>New Channel</button>
          <button className={subActionButton} onClick={() => navigate('/new/channelgroup')}>New Channel Group</button>
        </div>
      }
    </>
  )
}

export default AdminActions;