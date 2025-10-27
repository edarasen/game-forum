import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useData } from "../../context/DataProvider";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // e.g., http://localhost:3000/api/v1

export default function PostCreate() {
  const { userHeaders } = useData(); // 👈 from your existing DataProvider
  const { channel_id } = useParams();
  console.log("🚀 channel_id:", channel_id);
  const navigate = useNavigate();

  const [form, setForm] = useState({ title: "", body: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log("🚀 channel_id:", channel_id);
      console.log("🔑 userHeaders:", userHeaders);

      // Build proper headers for Rails
      const headers = {
        Authorization: userHeaders.authorization, // 👈 your key stays lowercase
        "Content-Type": "application/json",
      };

      // Send POST to Rails
      const response = await axios.post(
        `${API_URL}/channels/${channel_id}/posts`,
        { post: form },
        { headers }
      );

      console.log("✅ Post created:", response.data);

      // Navigate back to channel page after success
      navigate(`/channels/${channel_id}`);
    } catch (err) {
      console.error("❌ Error creating post:", err.response?.data || err);
      setError(
        err.response?.data?.message ||
          err.response?.data?.errors?.join(", ") ||
          "Failed to create post"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Create New Post</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Body:</label>
          <textarea
            name="body"
            value={form.body}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

// const API_URL = import.meta.env.VITE_API_URL;

// const CreatePost  = () => {

//   function createPost(userHeaders, channelId, postTitle, postBody)
//     const requestHeaders = {
//     headers: { ...userHeaders, Accept: "application/json" }
//   }

//   return axios.post(
//     `${API_URL}/channels/${channelId}/posts`,
//     { comment: { body: commentBody } },
//     requestHeaders
//   ).then(
//     (response) => response.data,
//     (error) => {
//       console.error("Can't post", error);
//       return null;
//     }
//   )
// }

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useData } from "../../context/DataProvider";
// import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL;

// function PostCreate() {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const { userHeaders } = useData();

//   const [title, setTitle] = useState("");
//   const [body, setBody] = useState("");
//   const [error, setError] = useState("");
//   const [channelId, setChannelId] = useState("1"); // Default channel or you can fetch channels

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Add detailed token validation
//     if (
//       !userHeaders ||
//       !userHeaders["access-token"] ||
//       !userHeaders.client ||
//       !userHeaders.uid
//     ) {
//       console.log("Missing required headers:", userHeaders);
//       setError("Authentication tokens missing. Please log in again.");
//       navigate("/login");
//       return;
//     }

//     setIsLoading(true);
//     setError("");

//     try {
//       // Log full request details for debugging
//       console.log("Making request with:", {
//         url: `${API_URL}/channels/${channelId}/posts`,
//         headers: {
//           "access-token": userHeaders["access-token"],
//           client: userHeaders.client,
//           uid: userHeaders.uid,
//           "token-type": "Bearer",
//         },
//         data: {
//           post: {
//             title,
//             body,
//             channel_id: channelId,
//           },
//         },
//       });

//       const response = await axios.post(
//         `${API_URL}/channels/${channelId}/posts`,
//         {
//           post: {
//             title,
//             body,
//             channel_id: channelId,
//           },
//         },
//         {
//           headers: {
//             "access-token": userHeaders["access-token"],
//             client: userHeaders.client,
//             uid: userHeaders.uid,
//             "token-type": "Bearer",
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data) {
//         console.log("Post created successfully:", response.data);
//         navigate(`/channels/${channelId}`);
//       }
//     } catch (err) {
//       console.error("Request failed:", {
//         status: err.response?.status,
//         statusText: err.response?.statusText,
//         data: err.response?.data,
//         headers: err.response?.headers,
//       });
//       const errorMessage =
//         err.response?.data?.error ||
//         err.response?.data?.message ||
//         err.message ||
//         "Failed to create post. Please try again.";
//       setError(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center"
//       style={{ backgroundColor: "#FCE5CD" }}
//     >
//       <div
//         className="w-full max-w-sm p-8 rounded-xl shadow-lg"
//         style={{ backgroundColor: "#677365" }}
//       >
//         <h2
//           className="text-2xl font-bold text-center mb-6"
//           style={{ color: "#f7d486" }}
//         >
//           Create New Post
//         </h2>

//         {error && (
//           <div
//             className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
//             role="alert"
//           >
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <select
//               value={channelId}
//               onChange={(e) => setChannelId(e.target.value)}
//               className="w-full p-3 rounded-md outline-none mb-4"
//               required
//             >
//               <option value="1">General Discussion</option>
//               {/* Add more channels as needed */}
//             </select>
//           </div>

//           <input
//             type="text"
//             placeholder="Post Title"
//             className="w-full p-3 rounded-md outline-none"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//             minLength={3}
//             maxLength={100}
//           />

//           <textarea
//             placeholder="Post Content"
//             className="w-full p-3 rounded-md outline-none min-h-[150px]"
//             value={body}
//             onChange={(e) => setBody(e.target.value)}
//             required
//             minLength={10}
//           />

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full p-3 rounded-md font-bold hover:opacity-90 transition-opacity"
//             style={{ backgroundColor: "#f7d486", color: "#677365" }}
//           >
//             {isLoading ? "Creating..." : "Create Post"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default PostCreate;
