function getDayOfWeekString(day){
  var string = '';
  switch (day){
    case 0:
      string = "Sun"
    case 1:
      string = "Mon"
    case 2:
      string = "Tue"
    case 3: 
      string = "Wed"
    case 4:
      string = "Thu"
    case 5:
      string = "Fri"
    case 6:
      string = "Sat"
  }
  return string;
}
function getMonthString(month){
  var string = '';
  switch (month){
    case 0:
      string = "Jan"
    case 1:
      string = "Feb"
    case 2:
      string = "Mar"
    case 3: 
      string = "Apr"
    case 4:
      string = "May"
    case 5:
      string = "Jun"
    case 6:
      string = "Jul"
    case 7:
      string = "Aug"
    case 8:
      string = "Sep"
    case 9:
      string = "Oct"
    case 10:
      string = "Nov"
    case 11:
      string = "Dec"
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