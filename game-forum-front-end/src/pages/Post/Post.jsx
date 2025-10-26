import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useData } from "../../context/DataProvider"
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Helper function to format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function getPost(postId) {
  return axios.get(`${API_URL}/posts/${postId}`, {
    headers: { Accept: "application/json" }
  }).then(
    (response) => response.data,
    (error) => {
      console.error("API Error:", error);
      return null;
    }
  )
}

function createComment(userHeaders, postId, commentBody) {
  const requestHeaders = {
    headers: { ...userHeaders, Accept: "application/json" }
  }
  return axios.post(
    `${API_URL}/posts/${postId}/comments`, 
    { comment: { body: commentBody } },
    requestHeaders
  ).then(
    (response) => response.data,
    (error) => {
      console.error("Comment creation error:", error);
      return null;
    }
  )
}

function deleteComment(userHeaders, commentId) {
  const requestHeaders = {
    headers: { ...userHeaders, Accept: "application/json" }
  }
  return axios.delete(`${API_URL}/comments/${commentId}`, requestHeaders).then(
    (response) => response.data,
    (error) => {
      console.error("Comment deletion error:", error);
      return null;
    }
  )
}

function Post() {
  const { id } = useParams();
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentBody, setCommentBody] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const { userHeaders, userDetails } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    
    if (id) {
      setLoading(true);
      getPost(id).then((data) => {
        if (mounted && data) {
          setPostData(data.data);
        }
        setLoading(false);
      });
    }
    
    return () => (mounted = false);
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    if (!commentBody.trim()) {
      alert("Comment cannot be empty");
      return;
    }

    if (!userHeaders) {
      alert("You must be logged in to comment");
      return;
    }

    setSubmittingComment(true);
    const result = await createComment(userHeaders, id, commentBody);
    
    if (result) {
      const updatedData = await getPost(id);
      if (updatedData) {
        setPostData(updatedData.data);
        setCommentBody("");
      }
    } else {
      alert("Failed to post comment");
    }
    
    setSubmittingComment(false);
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) {
      return;
    }

    const result = await deleteComment(userHeaders, commentId);
    
    if (result) {
      const updatedData = await getPost(id);
      if (updatedData) {
        setPostData(updatedData.data);
      }
    } else {
      alert("Failed to delete comment");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-[#5B6153]">Loading post...</div>
      </div>
    );
  }

  if (!postData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Failed to load post. Post may not exist.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAE5CA]">
      <div className="flex flex-col mx-auto w-full max-w-4xl px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="w-1/9 mb-4 px-4 py-2 cursor-pointer text-left text-[#5B6153] hover:text-[#6B796A] transition-colors"
        >
          ← <span className="underline">Back</span> 
        </button>

        {/* Post Card */}
        <div className="rounded border border-[#6B796A] bg-stone-50 shadow-sm mb-6">
          {/* Post Header */}
          <div className="rounded-t bg-[#6B796A] px-6 py-4">
            <h1 className="text-3xl font-bold text-[#F7D480]">
              {postData.title}
            </h1>
            <div className="mt-2 flex justify-center items-center gap-4 text-sm text-[#FAE5CA]">
              <span>By: {postData.owner_details?.username}</span>
              <span>•</span>
              <span>Channel: {postData.channel_details?.title}</span>
              <span>•</span>
              <span>{postData.created_at ? formatDate(postData.created_at) : "—"}</span>
              <span>•</span>
              <span>{postData.comment_count ?? 0} comments</span>
            </div>
          </div>

          {/* Post Body */}
          <div className="bg-[#FAE5CA] px-6 py-6">
            <div className="text-[#5B6153] whitespace-pre-wrap">
              {postData.body}
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="rounded border border-[#6B796A] bg-stone-50 shadow-sm">
          {/* Comments Header */}
          <div className="rounded-t bg-[#6B796A] px-6 py-4">
            <h2 className="text-2xl font-semibold text-[#F7D480]">
              Comments ({postData.comments?.length ?? 0})
            </h2>
          </div>

          {/* Comments List */}
          <div className="bg-[#FAE5CA]">
            {!postData.comments || postData.comments.length === 0 ? (
              <div className="px-6 py-8 text-center text-slate-600">
                No comments yet. Be the first to comment!
              </div>
            ) : (
              <ul className="divide-y divide-slate-300/60">
                {[...postData.comments]
                  .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
                  .map((comment) => (
                  <li key={comment.id} className="px-6 py-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-[#5B6153]">
                            {comment.owner?.username}
                          </span>
                          <span className="text-sm text-slate-500">
                            {comment.created_at ? formatDate(comment.created_at) : "—"}
                          </span>
                        </div>
                        <div className="text-slate-700 whitespace-pre-wrap">
                          {comment.body}
                        </div>
                      </div>
                      
                      {userDetails && (
                        comment.owner?.id === userDetails.id || 
                        userDetails.role === 'admin' || 
                        userDetails.role === 'moderator'
                      ) && (
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="ml-4 underline cursor-pointer text-red-600 hover:text-red-700 text-sm"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Comment Form */}
          {userHeaders ? (
            <div className="bg-[#FAE5CA] px-6 py-4 border-t border-[#6B796A]">
              <form onSubmit={handleCommentSubmit}>
                <textarea
                  value={commentBody}
                  onChange={(e) => setCommentBody(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full px-4 py-3 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6B796A] resize-none"
                  rows="3"
                  disabled={submittingComment}
                />
                <div className="mt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={submittingComment}
                    className="px-6 py-2 bg-[#6B796A] text-[#F7D480] rounded hover:bg-[#5B6153] transition-colors font-semibold disabled:opacity-50"
                  >
                    {submittingComment ? "Posting..." : "Post Comment"}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-[#FAE5CA] px-6 py-4 border-t border-[#6B796A] text-center text-slate-600">
              Please log in to comment
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Post