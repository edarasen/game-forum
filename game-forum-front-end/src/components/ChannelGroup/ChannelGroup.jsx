import "./ChannelGroup.css"
import ChannelPreview from "../ChannelPreview/ChannelPreview";
import forums_cg_logo from "../../assets/forums-channelgroup-icon.webp";

function ChannelGroup(props){
  return (
    <div className="border-2 border-solid border-(--pnb-green) mx-2 text-left">
      <div className="bg-(--pnb-green) px-4 py-4 text-(--pnb-gold) flex flex-row items-center gap-3">
        <img src={forums_cg_logo} alt="Pluck and Brew Logo" className="w-12 h-12"/>
        <div className="flex flex-col">
          <h1 className="font-semibold text-2xl">{props.channelgroup['channelgroup_details']['title']}</h1>
          <h3 className="text-sm">{props.channelgroup['channelgroup_details']['description']}</h3>
        </div>        
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