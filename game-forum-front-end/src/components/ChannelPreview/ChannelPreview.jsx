import { useData } from "../../context/DataProvider";
import "./ChannelPreview.css"
import { useNavigate } from "react-router-dom";

function getDayOfWeekString(day){
  var string = '';
  switch (day){
    case 0:
      string = "Sun"
      break;
    case 1:
      string = "Mon"
      break;
    case 2:
      string = "Tue"
      break;
    case 3: 
      string = "Wed"
      break;
    case 4:
      string = "Thu"
      break;
    case 5:
      string = "Fri"
      break;
    case 6:
      string = "Sat"
      break;
  }
  return string;
}
function getMonthString(month){
  var string = '';
  switch (month){
    case 0:
      string = "Jan"
      break;
    case 1:
      string = "Feb"
      break;
    case 2:
      string = "Mar"
      break;
    case 3: 
      string = "Apr"
      break;
    case 4:
      string = "May"
      break;
    case 5:
      string = "Jun"
      break;
    case 6:
      string = "Jul"
      break;
    case 7:
      string = "Aug"
      break;
    case 8:
      string = "Sep"
      break;
    case 9:
      string = "Oct"
      break;
    case 10:
      string = "Nov"
      break;
    case 11:
      string = "Dec"
      break;
  }
  return string;
}
function convertISOTimestamp(timestamp){
  var convert = new Date(timestamp)
  var convert_array = []
  convert_array.push(getDayOfWeekString(convert.getDay()))
  convert_array.push(convert.getDate())
  convert_array.push(getMonthString(convert.getMonth()))
  convert_array.push(convert.getFullYear())
  convert_array.push(`${convert.getHours()}:${convert.getMinutes()}`)
  var convert_string = convert_array.join(" ")
  return convert_string;
}

function ChannelPreview(props){
  const {userDetails} = useData();
  const navigate = useNavigate();

  const navButton = "hover:font-semibold cursor-pointer"
  const adminPermission = userDetails && (
    window.location.pathname === "/admin-tools" && (userDetails.role === 'admin' ||
    userDetails.role === 'moderator')
  );

  const navigateToChannel = (channel_id) => {
    navigate(`/channels/${channel_id}`)
  }

  return (
    <div className="flex flex-row justify-between px-6 py-4 hover:bg-(--pnb-alternate-parchment) text-(--pnb-text-green)" onClick={()=>{adminPermission ? navigate(`/edit/channel/${props.channel['id']}`) : navigateToChannel(props.channel['id'])}}>
      <div>
        <h4 className="font-semibold text-2xl">{props.channel['title']}</h4>
        <h6 className="text-sm">Last Updated : {convertISOTimestamp(props.channel['updated_at'])}</h6>
      </div>
      <div className="flex flex-row gap-10">
        <div className="text-center">
          <p className="font-semibold text-2xl">{props.channel['post_count']}</p>
          <p className="text-sm">{props.channel['post_count'] > 1 ? "Posts": "Post"}</p>
        </div>
        {adminPermission && 
            <button className={`${navButton} underline`} onClick={() => (navigate(`/edit/channel/${props.channel['id']}`))}>Edit</button>}
      </div>
    </div>
  )
}
export default ChannelPreview;