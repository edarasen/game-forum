import { useState, useEffect } from "react";
import { useData } from "../../../context/DataProvider";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Helper function to format date
function formatDate(dateString) {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

async function getAllUsers(userHeaders) {
  const requestHeaders = {
    headers: { ...userHeaders, Accept: "application/json" },
  };
  return await axios.get(`${API_URL}/admins/show_all`, requestHeaders).then(
    (response) => response.data,
    (error) => {
      console.error("API Error:", error);
      return null;
    }
  );
}

async function approveModerator(userHeaders, userId) {
  const requestHeaders = {
    headers: { ...userHeaders, Accept: "application/json" },
  };
  return await axios
    .patch(`${API_URL}/admins/approve_mod/${userId}`, {}, requestHeaders)
    .then(
      (response) => response.data,
      (error) => {
        console.error("Approve moderator error:", error);
        return null;
      }
    );
}

async function rejectModeratorApplication(userHeaders, userId) {
  const requestHeaders = {
    headers: { ...userHeaders, Accept: "application/json" },
  };
  return await axios
    .patch(
      `${API_URL}/admins/users/${userId}`,
      { user: { moderator_status: "not_applied" } },
      requestHeaders
    )
    .then(
      (response) => response.data,
      (error) => {
        console.error("Reject application error:", error);
        return null;
      }
    );
}

async function createUser(userHeaders, userData) {
  const requestHeaders = {
    headers: { ...userHeaders, Accept: "application/json" },
  };
  return await axios
    .post(`${API_URL}/admins/users`, { user: userData }, requestHeaders)
    .then(
      (response) => response.data,
      (error) => {
        console.error("Create user error:", error);
        return null;
      }
    );
}

function UsersIndex({ activeTab }) {
  const [usersData, setUsersData] = useState({ moderators: [], users: [] });
  const [loading, setLoading] = useState(true);
  const { userHeaders, userDetails } = useData();

  // Create user form state
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  // Fetch all users data
  useEffect(() => {
    let mounted = true;

    if (userHeaders) {
      setLoading(true);
      getAllUsers(userHeaders).then((data) => {
        if (mounted && data) {
          setUsersData({
            moderators: data.data?.moderators || [],
            users: data.data?.users || [],
          });
        }
        setLoading(false);
      });
    }

    return () => (mounted = false);
  }, [userHeaders]);

  const handleApproveModerator = async (userId) => {
    if (window.confirm("Are you sure you want to approve this moderator application?")) {
      const result = await approveModerator(userHeaders, userId);
      if (result) {
        alert("Moderator approved successfully!");
        // Refresh data
        const updatedData = await getAllUsers(userHeaders);
        if (updatedData) {
          setUsersData({
            moderators: updatedData.data?.moderators || [],
            users: updatedData.data?.users || [],
          });
        }
      } else {
        alert("Failed to approve moderator");
      }
    }
  };

  const handleRejectApplication = async (userId) => {
    if (window.confirm("Are you sure you want to reject this application?")) {
      const result = await rejectModeratorApplication(userHeaders, userId);
      if (result) {
        alert("Application rejected successfully!");
        // Refresh data
        const updatedData = await getAllUsers(userHeaders);
        if (updatedData) {
          setUsersData({
            moderators: updatedData.data?.moderators || [],
            users: updatedData.data?.users || [],
          });
        }
      } else {
        alert("Failed to reject application");
      }
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();

    if (!newUser.username || !newUser.email || !newUser.password) {
      alert("All fields are required");
      return;
    }

    const result = await createUser(userHeaders, newUser);
    if (result) {
      alert("User created successfully!");
      setNewUser({ username: "", email: "", password: "", role: "user" });
      // Refresh data
      const updatedData = await getAllUsers(userHeaders);
      if (updatedData) {
        setUsersData({
          moderators: updatedData.data?.moderators || [],
          users: updatedData.data?.users || [],
        });
      }
    } else {
      alert("Failed to create user");
    }
  };

  // Combine all users
  const allUsers = [...usersData.moderators, ...usersData.users];

  // Filter users based on moderator_status and deactivated fields
  const pendingApplications = allUsers.filter(
    (user) => user.moderator_status === "pending"
  );
  const activeUsers = allUsers.filter((user) => !user.deactivated);
  const bannedUsers = allUsers.filter((user) => user.deactivated);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-xl text-[#5B6153]">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-6">
      {/* Content Area */}
      <div className="rounded border border-[#6B796A] bg-stone-50 shadow-sm">
        {/* Moderator Applications Tab */}
        {activeTab === "applications" && (
          <>
            <div className="rounded-t bg-[#6B796A] px-6 py-4">
              <h2 className="text-2xl font-semibold text-[#F7D480]">
                Moderator Applications
              </h2>
            </div>
            <div className="bg-[#FAE5CA] px-6 py-6">
              {pendingApplications.length === 0 ? (
                <p className="text-center text-slate-600 py-8">
                  No pending applications
                </p>
              ) : (
                <ul className="space-y-4">
                  {pendingApplications.map((user) => (
                    <li
                      key={user.id}
                      className="bg-white rounded-lg border border-[#6B796A] p-4"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-[#5B6153]">
                            {user.username}
                          </h3>
                          <p className="text-sm text-slate-500">{user.email}</p>
                          <p className="text-sm text-slate-500 mt-1">
                            Applied: {formatDate(user.created_at)}
                          </p>
                        </div>
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleRejectApplication(user.id)}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors font-semibold"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => handleApproveModerator(user.id)}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors font-semibold"
                          >
                            Accept
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}

        {/* Active Users Tab */}
        {activeTab === "active" && (
          <>
            <div className="rounded-t bg-[#6B796A] px-6 py-4">
              <h2 className="text-2xl font-semibold text-[#F7D480]">
                Active Users
              </h2>
            </div>
            <div className="bg-[#FAE5CA] px-6 py-6">
              {activeUsers.length === 0 ? (
                <p className="text-center text-slate-600 py-8">No active users</p>
              ) : (
                <ul className="space-y-3">
                  {activeUsers.map((user) => (
                    <li
                      key={user.id}
                      className="bg-white rounded-lg border border-[#6B796A] px-4 py-3"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-semibold text-[#5B6153]">
                            {user.username}
                          </h3>
                          <p className="text-sm text-slate-500">
                            {user.email} • Role: {user.role}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-slate-500">
                            Joined: {formatDate(user.created_at)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}

        {/* Banned Users Tab */}
        {activeTab === "banned" && (
          <>
            <div className="rounded-t bg-[#6B796A] px-6 py-4">
              <h2 className="text-2xl font-semibold text-[#F7D480]">
                Banned Users
              </h2>
            </div>
            <div className="bg-[#FAE5CA] px-6 py-6">
              {bannedUsers.length === 0 ? (
                <p className="text-center text-slate-600 py-8">No banned users</p>
              ) : (
                <ul className="space-y-3">
                  {bannedUsers.map((user) => (
                    <li
                      key={user.id}
                      className="bg-white rounded-lg border border-red-400 px-4 py-3"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-semibold text-[#5B6153]">
                            {user.username}
                          </h3>
                          <p className="text-sm text-slate-500">
                            {user.email} • Role: {user.role}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-red-600 font-semibold">
                            Banned: {formatDate(user.deactivated_at)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}

        {/* Create User Tab */}
        {activeTab === "create" && userDetails?.role === "admin" && (
          <>
            <div className="rounded-t bg-[#6B796A] px-6 py-4">
              <h2 className="text-2xl font-semibold text-[#F7D480]">
                Create New User
              </h2>
            </div>
            <div className="bg-[#FAE5CA] px-6 py-6">
              <form onSubmit={handleCreateUser} className="max-w-md">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#5B6153] mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      value={newUser.username}
                      onChange={(e) =>
                        setNewUser({ ...newUser, username: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-[#6B796A] rounded focus:outline-none focus:ring-2 focus:ring-[#6B796A]"
                      placeholder="Enter username"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#5B6153] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={newUser.email}
                      onChange={(e) =>
                        setNewUser({ ...newUser, email: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-[#6B796A] rounded focus:outline-none focus:ring-2 focus:ring-[#6B796A]"
                      placeholder="Enter email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#5B6153] mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      value={newUser.password}
                      onChange={(e) =>
                        setNewUser({ ...newUser, password: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-[#6B796A] rounded focus:outline-none focus:ring-2 focus:ring-[#6B796A]"
                      placeholder="Enter password"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#5B6153] mb-2">
                      Role
                    </label>
                    <select
                      value={newUser.role}
                      onChange={(e) =>
                        setNewUser({ ...newUser, role: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-[#6B796A] rounded focus:outline-none focus:ring-2 focus:ring-[#6B796A]"
                    >
                      <option value="user">User</option>
                      <option value="moderator">Moderator</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-[#6B796A] text-[#F7D480] rounded hover:bg-[#5B6153] transition-colors font-semibold"
                  >
                    Create User
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UsersIndex;