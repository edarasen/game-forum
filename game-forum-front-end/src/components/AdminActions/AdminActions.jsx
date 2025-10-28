import report_icon from "../../assets/report_icon.svg"
import all_users_icon from "../../assets/all_users_icon.svg"
import channels_icon from "../../assets/channels_icon.svg"

function AdminActions({handleReports, handleAllUsers, handleChannels}){
  //useState to show sub-actions
  //handleallusers : users, search (admin only: admin, moderator)
  //handlechannels : new channel group, new channel
  //mods have no access to mod or admin list and cannot modify them. but all actions remain as is.
  const actionButton = "flex flex-row gap-2 rounded-full text-(--pnb-gold) bg-(--pnb-green) cursor-pointer px-4 py-2 items-center"
  return (
    <div className="flex flex-row justify-around pt-4">
      <button className={actionButton} onClick={handleReports}>
        <img src={report_icon} alt="Search Icon" className="w-8 h-8" />
        <p>Reports</p>
      </button>
      <button className={actionButton} onClick={handleAllUsers}>
        <img src={all_users_icon} alt="Search Icon" className="w-8 h-8" />
        <p>All Users</p>
      </button>
      <button className={actionButton} onClick={handleChannels}>
        <img src={channels_icon} alt="Search Icon" className="w-8 h-8" />
        <p>Channels</p>
      </button>
    </div>
  )
}

export default AdminActions;