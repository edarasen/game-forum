import { useNavigate } from "react-router-dom"

function ReportPostPreview({post}) {
  const navigate = useNavigate()
  return (
    <div 
      onClick={() => navigate(`/posts/${post['post_details']['id']}`)}
      className="flex flex-row items-center justify-between px-6 py-4 hover:bg-(--pnb-alternate-parchment) text-(--pnb-text-green) cursor-pointer"
    >
      <div className="text-left">
        <h6 className="text-sm">{post['report_details']['report_reason']} Report By : {post['reporter_details']['username']}</h6>
        <h4 className="font-semibold text-2xl">{post['post_details']['title']}</h4>
        <h6 className="text-sm">Posted By : {post['owner_details']['username']}</h6>
      </div>
    </div>
  )
}

export default ReportPostPreview