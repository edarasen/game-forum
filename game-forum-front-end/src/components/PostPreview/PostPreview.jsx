function PostPreview(props){
  return(
    <div>
      <p>{props.post['title']}</p>
      <p>{props.post['owner_details']['username']}</p>
      <p>{props.post['comment_count']}</p>
      <p>{props.post['comment_count'] > 1 ? "Comments" : "Comment"}</p>
    </div>
  )
}

export default PostPreview;