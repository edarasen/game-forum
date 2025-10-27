import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useData } from "../../context/DataProvider"
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Helper function to format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

// Helper function to get comments count
function getCommentsCount(post) {
  return post.comments?.length || 0;
}

async function getUserPosts(userHeaders) {
  const requestHeaders = {
    headers: { ...userHeaders, Accept: "application/json" }
  }
  return await axios.get(`${API_URL}/all_posts`, requestHeaders).then(
    (response) => response.data,
    (error) => {
      console.error("API Error:", error);
      return null;
    }
  )
}

function MyPosts() {
  const [postsData, setPostsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userHeaders, userDetails } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    
    if (userHeaders) {
      setLoading(true);
      getUserPosts(userHeaders).then((data) => {
        if (mounted && data) {
          const posts = data.data?.posts || data.posts;
          setPostsData({ posts: posts });
          setLoading(false);
        }
      })
    }
    
    return () => (mounted = false);
  }, [userHeaders]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-[#5B6153]">Loading your posts...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full max-w-4xl px-4 py-8">
        {/* Profile header */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <div className="h-16 w-16 rounded-md bg-yellow-200 ring-4 ring-yellow-300/80 shadow-sm flex items-center justify-center text-xl font-semibold text-slate-700">
            {userDetails?.username?.slice(0, 1)?.toUpperCase() ?? "U"}
          </div>

          <div>
            <h1 className="text-3xl text-[#5B6153] font-semibold tracking-wide">
              {userDetails?.username ?? "Username_001"}
            </h1>
            <p className="text-xl text-slate-500">User</p>
          </div>
        </div>

        {/* Posts card */}
        <div className="mt-8 rounded border border-[#6B796A] bg-stone-50 shadow-sm">
          <div className="rounded-t bg-[#6B796A] px-6 py-4">
            <h2 className="text-2xl font-semibold text-[#F7D480]">My Posts</h2>
          </div>

          <div className="bg-[#FAE5CA] px-6 py-4">
            {!postsData?.posts || postsData.posts.length === 0 ? (
              <p className="py-8 text-[#5B6153]">You haven&apos;t created any posts yet.</p>
            ) : (
              <ul className="divide-y divide-slate-300/60">
                {postsData.posts.map((post) => (
                  <li 
                    key={post.id} 
                    onClick={() => navigate(`/posts/${post.id}`)}
                    className="flex items-center justify-between py-8 cursor-pointer hover:bg-[#F5E0C0] transition-colors"
                  >
                    <div>
                      <h3 className="text-2xl font-semibold text-[#5B6153]">{post.title}</h3>
                      <p className="mt-1 text-slate-500">
                        Created: {post.created_at ? formatDate(post.created_at) : "—"}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-3xl font-semibold leading-none text-[#5B6153]">
                        {getCommentsCount(post)}
                      </div>
                      <div className="mt-1 text-slate-500">comments</div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyPosts