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

function PostPreview(props){
  return(
    <div className="flex flex-row items-center justify-between px-6 py-4 hover:bg-(--pnb-alternate-parchment) text-(--pnb-text-green)">
      <div className="text-left">
        <h4 className="font-semibold text-2xl">{props.post['title']}</h4>
        <h6 className="text-sm">By : {props.post['owner_details']['username']}</h6>
        <h6 className="text-sm">Created : {convertISOTimestamp(props.post['created_at'])}</h6>
      </div>
      <div className="text-center">
        <p className="font-semibold text-2xl">{props.post['comment_count']}</p>
        <p className="text-sm">{props.post['comment_count'] > 1 ? "Comments": "Comment"}</p>
      </div>
    </div>
  )
  // onClick={()=>{navigateToChannel(props.channel['id'])}}
}

export default PostPreview;