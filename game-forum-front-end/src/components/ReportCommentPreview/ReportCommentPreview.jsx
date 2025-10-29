import { useNavigate } from "react-router-dom"

function ReportCommentPreview({comment}) {
  const navigate = useNavigate();
  return (
    <div 
      onClick={() => navigate(`/posts/${comment['post_details']['id']}`)}
      className="flex flex-row items-center justify-between px-6 py-4 hover:bg-(--pnb-alternate-parchment) text-(--pnb-text-green) cursor-pointer"
    >
      <div className="text-left">
        <h6 className="text-sm">{comment['report_details']['report_reason']} Report By : {comment['reporter_details']['username']}</h6>
        <h4 className="font-semibold text-2xl">{comment['comment_details']['body']}</h4>
        <h6 className="text-sm">Posted By : {comment['owner_details']['username']}</h6>
      </div>
    </div>
  )
}

export default ReportCommentPreview