import { useState, useEffect } from "react"
import { useData } from "../../context/DataProvider"
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

async function getUserProfile(userHeaders, userId) {
  const requestHeaders = {
    headers: { ...userHeaders, Accept: "application/json" }
  }
  return await axios.get(`${API_URL}/users/${userId}`, requestHeaders).then(
    (response) => response.data,
    (error) => {
      console.error("API Error:", error);
      console.error("Error response:", error.response);
      return null;
    }
  )
}

async function editUserProfile(userHeaders, userId, username, email, profile_picture, password){
  if (password === ""){
    password = null
  }
  const requestHeaders = {
    headers: { ...userHeaders, Accept: "application/json" },
  };
  return await axios
    .patch(
      `${API_URL}/users/${userId}`,
      { user: { username, email, profile_picture, password } },
      requestHeaders
    )
    .then(
      (response) => response.data,
      (error) => {
        console.error("User update error:", error);
        return null;
      }
    );
}

async function deactivateUser(userHeaders, userId) {
  const requestHeaders = {
    headers: { ...userHeaders, Accept: "application/json" }
  }
  return await axios.delete(`${API_URL}/users/${userId}`, requestHeaders).then(
    (response) => response.data,
    (error) => {
      console.error("API Error:", error);
      console.error("Error response:", error.response);
      return null;
    }
  )
}

async function applyModerator(userHeaders) {
  const requestHeaders = {
    headers: { ...userHeaders, Accept: "application/json" }
  }
  return await axios.patch(`${API_URL}/apply_mod`, {}, requestHeaders).then(
    (response) => response.data,
    (error) => {
      console.error("Moderator application error:", error);
      return error.response?.data;
    }
  )
}

function MyProfile() {
  const navigate = useNavigate()
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editUserForm, setEditUserForm] = useState(false)
  const [editUsername, setEditUsername] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [editProfilePicture, setEditProfilePicture] = useState('')
  const [editPassword, setEditPassword] = useState('')
  const { userHeaders, userDetails, resetHeadersDetails, onLogout } = useData();
  
  useEffect(() => {
    let mounted = true;
    
    if (userHeaders && userDetails?.id) {
      setLoading(true);
      getUserProfile(userHeaders, userDetails.id).then((data) => {
        if (mounted && data) {
          setProfileData(data.data);
          setEditEmail(data.data['email']);
          setEditPassword(data.data['password'] || "");
          setEditProfilePicture(data.data['profile_picture']);
          setEditUsername(data.data['username']);
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
      <Loader/>
    );
  }

  const handleResetEditForm = () => {
    setEditEmail(profileData['email']);
    setEditPassword(profileData['password'] || "");
    setEditProfilePicture(profileData['profile_picture']);
    setEditUsername(profileData['username']);
    setEditUserForm(!editUserForm)
  }

  const handleDeactivateAccount = async (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      const result = await deactivateUser(userHeaders, userDetails.id);
      if (result) {
        alert("User deactivated successfully. We're sorry to see you go.");
        resetHeadersDetails()
        onLogout()
        navigate('/');
      } else {
        alert("Failed to deactivate user.");
      }
    }
  }
  const handleEditAccount = async (e) => {
    e.preventDefault();
    if (!editEmail.trim() || !editUsername.trim()) {
      alert("Email and username cannot be empty");
      return;
    }
    
    const result = await editUserProfile(userHeaders, userDetails.id, editUsername, editEmail, editProfilePicture, editPassword);
    
    if (result) {
      const updatedData = await getUserProfile(userHeaders, userDetails.id);
      if (updatedData) {
        setProfileData(updatedData.data);
        setEditEmail(updatedData.data['email']);
        setEditPassword(updatedData.data['password'] || "");
        setEditProfilePicture(updatedData.data['profile_picture']);
        setEditUsername(updatedData.data['username']);
        setEditUserForm(false);
      }
      alert("User updated successfully");
    } else {
      alert("Failed to update User");
    }
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full max-w-4xl px-4 py-8">
        <div className="flex flex-row">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="w-1/9 mb-4 px-4 py-2 cursor-pointer text-left text-[#5B6153] hover:text-[#6B796A] transition-colors"
          >
            ← <span className="underline">Back</span> 
          </button>
        </div>
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
            onClick={handleResetEditForm}
            className={ editUserForm ? "px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors font-semibold" : "px-6 py-2 bg-[#6B796A] text-[#F7D480] rounded hover:bg-[#5B6153] transition-colors font-semibold"}
          >
            {editUserForm ? "Cancel Editing" : "Edit Profile"}
          </button>
          {
            editUserForm && 
            <button className="px-6 py-2 bg-[#6B796A] text-[#F7D480] rounded hover:bg-[#5B6153] transition-colors font-semibold" onClick={handleEditAccount}> Save Changes </button>
          }
          { !editUserForm && 
          <>
            <button
              onClick={handleDeactivateAccount}
              className="px-6 py-2 bg-[#6B796A] text-[#F7D480] rounded hover:bg-[#5B6153] transition-colors font-semibold"
            >
              Deactivate Account
            </button>
            {(profileData?.role === "user" && profileData['moderator_status'] === 'not_applied') && (
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
          </>}
        </div>

        {/* Profile Information Card */}
        <div className="mt-8 rounded border border-[#6B796A] bg-stone-50 shadow-sm">
          <div className="rounded-t bg-[#6B796A] px-6 py-4">
            <h2 className="text-2xl font-semibold text-[#F7D480]">Profile Information</h2>
          </div>

          <div className="bg-[#FAE5CA]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-300/60">
              <div className="font-semibold text-[#5B6153] text-lg">Username</div>
              {
                editUserForm ? 
                <input
                  type="text"
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
                  className="w-120 text-[#5B6153] bg-white px-4 py-2 rounded border border-(--pnb-green) focus:outline-none focus:ring-2 focus:ring-[#F7D480]"
                  placeholder="Username"
                /> : <div className="text-slate-700">{profileData?.username ?? "—"}</div>
              }
            </div>

            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-300/60">
              <div className="font-semibold text-[#5B6153] text-lg">Profile Picture</div>
              <div className="text-slate-700">
                { editUserForm ?
                  <input
                    type="text"
                    value={editProfilePicture}
                    onChange={(e) => setEditProfilePicture(e.target.value)}
                    className="w-120 text-[#5B6153] bg-white px-4 py-2 rounded border border-(--pnb-green) focus:outline-none focus:ring-2 focus:ring-[#F7D480]"
                    placeholder="Profile Picture URL"
                  /> 
                  : profileData?.profile_picture ? (
                    <img 
                      src={profileData.profile_picture} 
                      alt="Profile" 
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-slate-500 italic">No profile picture</span>
                  )
                }
              </div>
            </div>

            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-300/60">
              <div className="font-semibold text-[#5B6153] text-lg">Email</div>
              { editUserForm ?
                <input
                  type="text"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-120 text-[#5B6153] bg-white px-4 py-2 rounded border border-(--pnb-green) focus:outline-none focus:ring-2 focus:ring-[#F7D480]"
                  placeholder="Email"
                />  
              : <div className="text-slate-700">{profileData?.email ?? "—"}</div> }
            </div>

            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-300/60">
              <div className="font-semibold text-[#5B6153] text-lg">Password</div>
              { editUserForm ?
                <input
                  type="password"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  className="w-120 text-[#5B6153] bg-white px-4 py-2 rounded border border-(--pnb-green) focus:outline-none focus:ring-2 focus:ring-[#F7D480]"
                  placeholder="New Password"
                />
                : <div className="text-slate-700">••••••••</div>}
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