import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useData } from "../../context/DataProvider";
import axios from "axios";
import logo from "../../assets/pnb logo.webp";
import Filter from "leo-profanity";
import ForumNavBar from "../../components/ForumNavBar/ForumNavBar";

const API_URL = import.meta.env.VITE_API_URL;

export default function PostCreate() {
  const { userHeaders, userDetails } = useData();
  const [channelId, setChannelId] = useState(0);
  const [allChannelData, setAllChannelData] = useState();
  const navigate = useNavigate();
  const { onLogin, onLogout } = useData();
  const [menuOpen, setMenuOpen] = useState(false);
  const navListTailwind =
    "absolute w-[100%] bg-(--pnb-parchment) opacity-94 z-1500 h-[100vh] m-0 items-center flex-col backdrop-blur-3xl list-none text-(--pnb-text-green) text-2xl py-4 gap-6";

  const [form, setForm] = useState({ title: "", body: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    Filter.loadDictionary();
  }, []);

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

    const normalizeText = (text) =>
      text
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .replace(/\s+/g, " ")
        .toLowerCase();

    const cleanTitle = normalizeText(form.title);
    const cleanBody = normalizeText(form.body);

    const hasProfanity = Filter.check(cleanTitle) || Filter.check(cleanBody);

    if (hasProfanity) {
      setError("Excuse your French.");
      setLoading(false);
      return;
    }

    const filteredTitle = Filter.clean(form.title);
    const filteredBody = Filter.clean(form.body);

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
      <ForumNavBar onLogout={onLogout} />
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
          {error && (
            <p
              className="w-full p-3 mt-3 text-center text-red-300 font-semibold rounded-md"
              style={{ backgroundColor: "#f05252ff", color: "#ffffffff" }}
            >
              {error}
            </p>
          )}
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
            <label style={{ color: "#f7d486" }} className="font-bold">
              Title:
            </label>
            <input
              placeholder="Title"
              className="w-full p-3 rounded-md outline-none text-(--pnb-text-green)"
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              style={{ background: "#FCE5CD", color: "#677365" }}
            />
          </div>

          <div>
            <label style={{ color: "#f7d486" }} className="font-bold">
              Body:
            </label>
            <textarea
              placeholder="Body"
              className="w-full p-3 rounded-md outline-none text-(--pnb-text-green)"
              name="body"
              value={form.body}
              onChange={handleChange}
              required
              style={{ background: "#FCE5CD", color: "#677365" }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 rounded-md font-bold"
            style={{ backgroundColor: "#f7d486", color: "#677365" }}
          >
            {loading ? "Creating..." : "Create Post"}
          </button>
        </form>

        {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
      </div>
    </>
  );
}
