import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useData } from "../../context/DataProvider"
import axios from "axios";
import KebabMenu from "../../components/KebabMenu/KebabMenu";
import Report from "../../components/Report/Report";

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

// API call to GET a post by ID
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
// API call to UPDATE a post
function updatePost(userHeaders, postId, title, body) {
  const requestHeaders = {
    headers: { ...userHeaders, Accept: "application/json" }
  }
  return axios.patch(
    `${API_URL}/posts/${postId}`,
    { post: { title, body } },
    requestHeaders
  ).then(
    (response) => response.data,
    (error) => {
      console.error("Post update error:", error);
      return null;
    }
  )
}

// API call to DELETE a post
function deletePost(userHeaders, postId) {
  const requestHeaders = {
    headers: { ...userHeaders, Accept: "application/json" }
  }
  return axios.delete(`${API_URL}/posts/${postId}`, requestHeaders).then(
    (response) => response.data,
    (error) => {
      console.error("Post deletion error:", error);
      return null;
    }
  )
}

// API call to CREATE a report
function createReport(userHeaders, contentType, contentId, reportReason) {
  const requestHeaders = {
    headers: { ...userHeaders, Accept: "application/json" }
  }
  return axios.post(
    `${API_URL}/reports`,
    { report: { content_type: contentType, content_id: contentId, report_reason: reportReason } },
    requestHeaders
  ).then(
    (response) => response.data,
    (error) => {
      console.error("Report creation error:", error);
      return null;
    }
  )
}

// API call to CREATE a comment
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

// API call to UPDATE a comment
function updateComment(userHeaders, commentId, body) {
  const requestHeaders = {
    headers: { ...userHeaders, Accept: "application/json" }
  }
  return axios.patch(
    `${API_URL}/comments/${commentId}`,
    { comment: { body } },
    requestHeaders
  ).then(
    (response) => response.data,
    (error) => {
      console.error("Comment update error:", error);
      return null;
    }
  )
}

// API call to DELETE a comment
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

function PostView() {
  const { id } = useParams();
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentBody, setCommentBody] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  
  // Post edit state
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editPostTitle, setEditPostTitle] = useState("");
  const [editPostBody, setEditPostBody] = useState("");
  
  // Comment edit state
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentBody, setEditCommentBody] = useState("");
  
  // Report modal state
  const [report, setReport] = useState({ isOpen: false, type: null, id: null });
  
  const { userHeaders, userDetails } = useData();
  const navigate = useNavigate();

  // Fetch post data on mount or when id changes
  useEffect(() => {
    let mounted = true;
    
    if (id) {
      setLoading(true);
      getPost(id).then((data) => {
        if (mounted && data) {
          setPostData(data.data);
          setEditPostTitle(data.data.title);
          setEditPostBody(data.data.body);
        }
        setLoading(false);
      });
    }
    
    return () => (mounted = false);
  }, [id]);

  // Handlers for post actions (popup from kebab menu)
  const handlePostMenuSelect = async (action) => {
    switch (action) {
      case "edit":
        setIsEditingPost(true);
        break;
      case "delete":
        if (window.confirm("Are you sure you want to delete this post? This will also delete all comments.")) {
          const result = await deletePost(userHeaders, id);
          if (result) {
            alert("Post deleted successfully");
            navigate(-1);
          } else {
            alert("Failed to delete post");
          }
        }
        break;
      case "report":
        setReport({ isOpen: true, type: "post", id: postData.id });
        break;
    }
  };

  // Handlers for post editing
  const handlePostUpdate = async (e) => {
    e.preventDefault();
    
    if (!editPostTitle.trim() || !editPostBody.trim()) {
      alert("Title and body cannot be empty");
      return;
    }

    const result = await updatePost(userHeaders, id, editPostTitle, editPostBody);
    
    if (result) {
      const updatedData = await getPost(id);
      if (updatedData) {
        setPostData(updatedData.data);
        setIsEditingPost(false);
        alert("Post updated successfully");
      }
    } else {
      alert("Failed to update post");
    }
  };

  // Cancel post editing
  const handleCancelPostEdit = () => {
    setEditPostTitle(postData.title);
    setEditPostBody(postData.body);
    setIsEditingPost(false);
  };

  // Handlers for comment actions (popups from kebab menu)
  const handleCommentMenuSelect = async (action, comment) => {
    switch (action) {
      case "edit":
        setEditingCommentId(comment.id);
        setEditCommentBody(comment.body);
        break;
      case "delete":
        if (window.confirm("Are you sure you want to delete this comment?")) {
          const result = await deleteComment(userHeaders, comment.id);
          if (result) {
            const updatedData = await getPost(id);
            if (updatedData) {
              setPostData(updatedData.data);
            }
          } else {
            alert("Failed to delete comment");
          }
        }
        break;
      case "report":
        setReport({ isOpen: true, type: "comment", id: comment.id });
        break;
    }
  };

  // Handlers for comment editing
  const handleCommentUpdate = async (commentId) => {
    if (!editCommentBody.trim()) {
      alert("Comment cannot be empty");
      return;
    }

    const result = await updateComment(userHeaders, commentId, editCommentBody);
    
    if (result) {
      const updatedData = await getPost(id);
      if (updatedData) {
        setPostData(updatedData.data);
        setEditingCommentId(null);
        setEditCommentBody("");
      }
    } else {
      alert("Failed to update comment");
    }
  };

  // Cancel comment editing
  const handleCancelCommentEdit = () => {
    setEditingCommentId(null);
    setEditCommentBody("");
  };

  // Handler for submitting a new comment
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

  // Handler for reporting content
  const handleReport = async (reportReason) => {
    const result = await createReport(
      userHeaders, 
      report.type, 
      report.id,
      reportReason
    );
    
    if (result) {
      alert("Report submitted successfully. Thank you for helping keep our community safe.");
      setReport({ isOpen: false, type: null, id: null });
    } else {
      alert("Failed to submit report");
    }
  };

  // Permission checks
  const canEditPost = userDetails && (
    postData?.owner_details?.id === userDetails.id ||
    userDetails.role === 'admin' ||
    userDetails.role === 'moderator'
  );

  const canEditComment = (comment) => {
    return userDetails && (
      comment.owner?.id === userDetails.id ||
      userDetails.role === 'admin' ||
      userDetails.role === 'moderator'
    );
  };

  const getPostMenuOptions = () => {
    const options = [];
    if (canEditPost) {
      options.push({ label: "Edit", value: "edit" });
      options.push({ label: "Delete", value: "delete", danger: true });
    }
    if (userHeaders) {
      options.push({ label: "Report", value: "report", danger: true });
    }
    return options;
  };

  const getCommentMenuOptions = (comment) => {
    const options = [];
    if (canEditComment(comment)) {
      options.push({ label: "Edit", value: "edit" });
      options.push({ label: "Delete", value: "delete", danger: true });
    }
    if (userHeaders) {
      options.push({ label: "Report", value: "report", danger: true });
    }
    return options;
  };

  // Render loading, error, or main content
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-[#5B6153]">Loading post...</div>
      </div>
    );
  }

  // Render error if post data failed to load
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
          {isEditingPost ? (
            /* Post Edit Form */
            <form onSubmit={handlePostUpdate}>
              <div className="rounded-t bg-[#6B796A] px-6 py-4">
                <input
                  type="text"
                  value={editPostTitle}
                  onChange={(e) => setEditPostTitle(e.target.value)}
                  className="w-full text-3xl font-bold text-[#5B6153] bg-white px-4 py-2 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#F7D480]"
                  placeholder="Post title..."
                />
              </div>
              <div className="bg-[#FAE5CA] px-6 py-6">
                <textarea
                  value={editPostBody}
                  onChange={(e) => setEditPostBody(e.target.value)}
                  className="w-full text-[#5B6153] bg-white px-4 py-3 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#6B796A] resize-none"
                  rows="10"
                  placeholder="Post body..."
                />
                <div className="mt-4 flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={handleCancelPostEdit}
                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#6B796A] text-[#F7D480] rounded hover:bg-[#5B6153] transition-colors font-semibold"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* Post Display */
            <>
              <div className="rounded-t bg-[#6B796A] px-6 py-4 flex justify-between items-start">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-[#F7D480]">
                    {postData.title}
                  </h1>
                  <div className="mt-2 flex items-center gap-4 text-sm text-[#FAE5CA]">
                    <span>By: {postData.owner_details?.username}</span>
                    <span>•</span>
                    <span>Channel: {postData.channel_details?.title}</span>
                    <span>•</span>
                    <span>{postData.created_at ? formatDate(postData.created_at) : "—"}</span>
                    <span>•</span>
                    <span>{postData.comment_count ?? 0} comments</span>
                  </div>
                </div>
                {getPostMenuOptions().length > 0 && (
                  <KebabMenu
                    options={getPostMenuOptions()}
                    onSelect={handlePostMenuSelect}
                  />
                )}
              </div>

              <div className="bg-[#FAE5CA] px-6 py-6">
                <div className="text-[#5B6153] whitespace-pre-wrap">
                  {postData.body}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Comments Section */}
        <div className="rounded border border-[#6B796A] bg-stone-50 shadow-sm">
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
                      {editingCommentId === comment.id ? (
                        /* Comment Edit Form */
                        <div>
                          <textarea
                            value={editCommentBody}
                            onChange={(e) => setEditCommentBody(e.target.value)}
                            className="w-full px-4 py-3 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6B796A] resize-none"
                            rows="3"
                          />
                          <div className="mt-2 flex gap-3 justify-end">
                            <button
                              onClick={handleCancelCommentEdit}
                              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors text-sm font-semibold"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleCommentUpdate(comment.id)}
                              className="px-4 py-2 bg-[#6B796A] text-[#F7D480] rounded hover:bg-[#5B6153] transition-colors text-sm font-semibold"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* Comment Display */
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
                          
                          {getCommentMenuOptions(comment).length > 0 && (
                            <KebabMenu
                              options={getCommentMenuOptions(comment)}
                              onSelect={(action) => handleCommentMenuSelect(action, comment)}
                            />
                          )}
                        </div>
                      )}
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

      {/* Report Modal */}
      <Report
        isOpen={report.isOpen}
        onClose={() => setReport({ isOpen: false, type: null, id: null })}
        onConfirm={handleReport}
        type={report.type}
      />
    </div>
  )
}

export default PostView