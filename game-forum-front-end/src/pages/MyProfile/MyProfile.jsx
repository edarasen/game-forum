import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useData } from "../../context/DataProvider"
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function getUserProfile(userHeaders, userId) {
  const requestHeaders = {
    headers: { ...userHeaders, Accept: "application/json" }
  }
  return axios.get(`${API_URL}/users/${userId}`, requestHeaders).then(
    (response) => response.data,
    (error) => {
      console.error("API Error:", error);
      console.error("Error response:", error.response);
      return null;
    }
  )
}

function applyModerator(userHeaders) {
  const requestHeaders = {
    headers: { ...userHeaders, Accept: "application/json" }
  }
  return axios.patch(`${API_URL}/apply_mod`, {}, requestHeaders).then(
    (response) => response.data,
    (error) => {
      console.error("Moderator application error:", error);
      return error.response?.data;
    }
  )
}

function MyProfile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userHeaders, userDetails } = useData();
  
  useEffect(() => {
    let mounted = true;
    
    if (userHeaders && userDetails?.id) {
      setLoading(true);
      getUserProfile(userHeaders, userDetails.id).then((data) => {
        if (mounted && data) {
          setProfileData(data.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
    } else {
      setLoading(false);
    }
    
    return () => (mounted = false);
  }, [userHeaders, userDetails]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-[#5B6153]">Loading your profile...</div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Failed to load profile data. Please try again.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full max-w-4xl px-4 py-8">
        {/* Profile header */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <div className="h-16 w-16 rounded-md bg-yellow-200 ring-4 ring-yellow-300/80 shadow-sm flex items-center justify-center text-xl font-semibold text-slate-700">
            {profileData?.username?.slice(0, 1)?.toUpperCase() ?? "U"}
          </div>

          <div>
            <h1 className="text-3xl text-[#5B6153] font-semibold tracking-wide">
              {profileData?.username ?? "Username_001"}
            </h1>
            <p className="text-xl text-slate-500">{profileData?.role ?? "User"}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => alert("Edit functionality - To be implemented")}
            className="px-6 py-2 bg-[#6B796A] text-[#F7D480] rounded hover:bg-[#5B6153] transition-colors font-semibold"
          >
            Edit Profile
          </button>
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
                alert("Delete functionality - To be implemented");
              }
            }}
            className="px-6 py-2 bg-[#6B796A] text-[#F7D480] rounded hover:bg-[#5B6153] transition-colors font-semibold"
          >
            Delete Account
          </button>
          {profileData?.role === "user" && (
            <button
              onClick={async () => {
                if (window.confirm("Do you want to apply to become a moderator?")) {
                  const result = await applyModerator(userHeaders);
                  if (result) {
                    alert(result.message || "Application submitted successfully!");
                    const data = await getUserProfile(userHeaders, userDetails.id);
                    if (data) {
                      setProfileData(data.data);
                    }
                  }
                }
              }}
              className="px-6 py-2 bg-[#6B796A] text-[#F7D480] rounded hover:bg-[#5B6153] transition-colors font-semibold"
            >
              Apply as Moderator
            </button>
          )}
        </div>

        {/* Profile Information Card */}
        <div className="mt-8 rounded border border-[#6B796A] bg-stone-50 shadow-sm">
          <div className="rounded-t bg-[#6B796A] px-6 py-4">
            <h2 className="text-2xl font-semibold text-[#F7D480]">Profile Information</h2>
          </div>

          <div className="bg-[#FAE5CA]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-300/60">
              <div className="font-semibold text-[#5B6153] text-lg">Username</div>
              <div className="text-slate-700">{profileData?.username ?? "—"}</div>
            </div>

            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-300/60">
              <div className="font-semibold text-[#5B6153] text-lg">Profile Picture</div>
              <div className="text-slate-700">
                {profileData?.profile_picture ? (
                  <img 
                    src={profileData.profile_picture} 
                    alt="Profile" 
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-slate-500 italic">No profile picture</span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-300/60">
              <div className="font-semibold text-[#5B6153] text-lg">Email</div>
              <div className="text-slate-700">{profileData?.email ?? "—"}</div>
            </div>

            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-300/60">
              <div className="font-semibold text-[#5B6153] text-lg">Password</div>
              <div className="text-slate-700">••••••••</div>
            </div>

            <div className="flex items-center justify-between px-6 py-4">
              <div className="font-semibold text-[#5B6153] text-lg">Role</div>
              <div className="text-slate-700 capitalize">{profileData?.role ?? "—"}</div>
            </div>
          </div>
        </div>

        {/* Account Details Card */}
        <div className="mt-8 rounded border border-[#6B796A] bg-stone-50 shadow-sm">
          <div className="rounded-t bg-[#6B796A] px-6 py-4">
            <h2 className="text-2xl font-semibold text-[#F7D480]">Account Details</h2>
          </div>

          <div className="bg-[#FAE5CA]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-300/60">
              <div className="font-semibold text-[#5B6153] text-lg">Account Created</div>
              <div className="text-slate-700">
                {profileData?.created_at 
                  ? new Date(profileData.created_at).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })
                  : "—"}
              </div>
            </div>

            <div className="flex items-center justify-between px-6 py-4">
              <div className="font-semibold text-[#5B6153] text-lg">Last Updated</div>
              <div className="text-slate-700">
                {profileData?.updated_at 
                  ? new Date(profileData.updated_at).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })
                  : "—"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile