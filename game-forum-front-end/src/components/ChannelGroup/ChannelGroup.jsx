import "./ChannelGroup.css"
import ChannelPreview from "../ChannelPreview/ChannelPreview";
import forums_cg_logo from "../../assets/forums-channelgroup-icon.webp";
import { useData } from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";

function ChannelGroup(props){
  const {userDetails} = useData();
  const navigate = useNavigate();
  const navButton = "hover:font-semibold cursor-pointer"
  const adminPermission = userDetails && (
    window.location.pathname === "/admin-tools" && (userDetails.role === 'admin' ||
    userDetails.role === 'moderator')
  );

  return (
    <div className="border-2 border-solid border-(--pnb-green) mx-2 text-left">
      <div className="bg-(--pnb-green) px-4 py-4 text-(--pnb-gold) flex flex-row items-center gap-3 justify-between">
        <div className="flex flex-row gap-3">
          <img src={forums_cg_logo} alt="Pluck and Brew Logo" className="w-12 h-12"/>
          <div className="flex flex-col text-left">
            <h1 className="font-semibold text-2xl">{props.channelgroup['channelgroup_details']['title']}</h1>
            <h3 className="text-sm">{props.channelgroup['channelgroup_details']['description']}</h3>
          </div>
        </div>
        {adminPermission && 
          <button className={`${navButton} underline`} onClick={() => (navigate(`/edit/channelgroup/${props.channelgroup['channelgroup_details']['id']}`))}>Edit</button>}
      </div>

      <div className="py-6 flex flex-col gap-2">
        {props.channelgroup.channels.map((channel)=>(
          <ChannelPreview 
            key={`channelpreview-${channel['id']}`}
            channel={channel}
          />
        ))}
      </div>
    </div>
  )
}
export default ChannelGroup;