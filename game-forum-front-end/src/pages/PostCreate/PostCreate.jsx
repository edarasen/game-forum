import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useData } from "../../context/DataProvider";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/pnb logo.webp";

const API_URL = import.meta.env.VITE_API_URL;

export default function PostCreate() {
  const { userHeaders, userDetails } = useData();
  const [channelId, setChannelId] = useState(0);
  const [allChannelData, setAllChannelData] = useState();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const navListTailwind =
    "absolute w-[100%] bg-(--pnb-parchment) opacity-94 z-1500 h-[100vh] m-0 items-center flex-col backdrop-blur-3xl list-none text-(--pnb-text-green) text-2xl py-4 gap-6";

  const [form, setForm] = useState({ title: "", body: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleChannelChange = (e) => {
    setChannelId(e.target.value);
    console.log(e.target.value);
  };

  const allChannel = async (e) => {
    const requestHeaders = {
      headers: { Accept: "application/json" },
    };
    const response = await axios.get(`${API_URL}/channels/all`, requestHeaders);
    return response.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log(form);

    console.log(userHeaders);
    try {
      // Build proper headers for Rails
      const headers = {
        ...userHeaders,
        Accept: "application/json",
      };

      // Send POST to Rails
      const response = await axios.post(
        `${API_URL}/channels/${channelId}/posts`,
        { post: form },
        { headers }
      );

      console.log("Post created:", response.data);

      // Navigate back to channel page after success
      navigate(`/channels/${channelId}`);
    } catch (err) {
      console.error("Error creating post:", err.response?.data || err);
      setError(
        err.response?.data?.message ||
          err.response?.data?.errors?.join(", ") ||
          "Failed to create post"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    allChannel().then((data) => {
      if (mounted) {
        setAllChannelData(data.data);
        console.log("data mounted");
        console.log(data.data.channels);
      }
    });
    return () => (mounted = false);
  }, []);

  return (
    <>
      <nav>
        <div className="flex justify-between items-center bg-(--pnb-green) px-4 py-2">
          {userHeaders ? (
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F6%2F69%2FWikimedia_logo_family_complete-2023.svg%2F1200px-Wikimedia_logo_family_complete-2023.svg.png%3F20230824201106&f=1&nofb=1&ipt=370c744281553dfb0122bf436fc2e6ad963a98392e23778fb315f83c06d2f399"
              className="w-10 h-10"
            ></img>
          ) : (
            <Link to="/">
              <img src={logo} alt="Pluck and Brew Logo" className="w-10 h-10" />
            </Link>
          )}
          <h1 className="text-(--pnb-gold) text-lg font-medium">New Post</h1>
          <div
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className={`${navListTailwind} ${menuOpen ? "flex" : "hidden"}`}>
          <p>{userDetails["username"]}</p>
          <Link to="/">Main Site</Link>
          <Link to="/forums">My Posts</Link>
          <Link to="/forums">Profile</Link>
        </div>
      </nav>
      <h2
        className="text-2xl font-bold text-center mb-6"
        style={{ color: "#677365" }}
      >
        Want to Participate? Create your post below!
      </h2>
      <div
        style={{ padding: "1rem", backgroundColor: "#FCE5CD" }}
        className="min-h-screen flex items-center justify-center"
      >
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-[#677365] p-8 rounded-xl shadow-lg space-y-4"
        >
          <div>
            <div>
              <label
                className="block text-xl font-medium mb-2"
                style={{ color: "#f7d486" }}
              >
                Channels:
              </label>
            </div>
            {allChannelData ? (
              <div className="space-y-2">
                {[...allChannelData["channels"]].map((channel) => (
                  <div className="border border-transparent p-2">
                    <label
                      htmlFor={channel["title"]}
                      className="cursor-pointer transition-colors duration-200 hover:bg-[#f7d486] px-2 py-1 rounded"
                      style={{ color: "#f7d486" }}
                      onMouseOver={(e) => (e.target.style.color = "#677365")}
                      onMouseOut={(e) => (e.target.style.color = "#f7d486")}
                    >
                      {channel["title"]}
                    </label>
                    <input
                      type="radio"
                      id={channel["title"]}
                      name="channel_id"
                      value={channel["id"]}
                      onChange={handleChannelChange}
                      required
                    />
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}
          </div>
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
    </>
  );
}
