import "./ChannelPreview.css"

function ChannelPreview(props){
  return (
    <div>
      <h4>{props.channel['title']}</h4>
      <h6>{props.channel['description']}</h6>
      <p>{props.channel['post_permission']}</p>
      <p>{props.channel['post_count']} {props.channel['post_count'] > 1 ? "Posts": "Post"}</p>
    </div>
  )
}
export default ChannelPreview;