import "./ChannelGroup.css"
import ChannelPreview from "../ChannelPreview/ChannelPreview";

function ChannelGroup(props){
  return (
    <div>
      <h1>{props.channelgroup['channelgroup_details']['title']}</h1>
      <h3>{props.channelgroup['channelgroup_details']['description']}</h3>
      {props.channelgroup.channels.map((channel)=>(
        <ChannelPreview 
          key={`channelpreview-${channel['id']}`}
          channel={channel}
        />
      ))}
    </div>
  )
}
export default ChannelGroup;