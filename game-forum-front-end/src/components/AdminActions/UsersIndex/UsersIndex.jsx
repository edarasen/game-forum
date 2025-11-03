import { useState, useEffect } from "react";
import { useData } from "../../../context/DataProvider";
import axios from "axios";

import EditUser from "./EditUser";
import CollapsibleCard from "./CollapsibleCard";
import CreateUser from "./CreateUser";

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

// FIXED: Use correct endpoint based on user role
async function getAllUsers(userHeaders, userRole) {
  const endpoint = userRole === "admin" 
    ? `${API_URL}/admins/show_all`
    : `${API_URL}/moderators/show_all`;
    
  const requestHeaders = {
    headers: { ...userHeaders, Accept: "application/json" },
  };
  
  return await axios.get(endpoint, requestHeaders).then(
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
      `${API_URL}/admins/reject_mod/${userId}`,
      {},
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

async function updateUser(userHeaders, userId, userData, userRole) {
  const endpoint = userRole === "admin"
    ? `${API_URL}/admins/users/${userId}`
    : `${API_URL}/moderators/users/${userId}`;
    
  const requestHeaders = {
    headers: { ...userHeaders, Accept: "application/json" },
  };
  
  return await axios.patch(endpoint, { user: userData }, requestHeaders).then(
    (response) => response.data,
    (error) => {
      console.error("Update user error:", error);
      return null;
    }
  );
}

async function banUser(userHeaders, userId, userRole) {
  const endpoint = userRole === "admin" 
    ? `${API_URL}/admins/ban/${userId}`
    : `${API_URL}/moderators/ban/${userId}`;
    
  const requestHeaders = {
    headers: { ...userHeaders, Accept: "application/json" },
  };
  
  return await axios.patch(endpoint, {}, requestHeaders).then(
    (response) => response.data,
    (error) => {
      console.error("Ban user error:", error);
      return null;
    }
  );
}

async function nukeUser(userHeaders, userId, userRole) {
  const endpoint = userRole === "admin" 
    ? `${API_URL}/admins/nuke/${userId}`
    : `${API_URL}/moderators/nuke/${userId}`;
    
  const requestHeaders = {
    headers: { ...userHeaders, Accept: "application/json" },
  };
  
  return await axios.delete(endpoint, requestHeaders).then(
    (response) => response.data,
    (error) => {
      console.error("Nuke user error:", error);
      return null;
    }
  );
}

async function reactivateUser(userHeaders, userId, userRole) {
  const endpoint = userRole === "admin" 
    ? `${API_URL}/admins/reactivate/${userId}`
    : `${API_URL}/moderators/reactivate/${userId}`;
    
  const requestHeaders = {
    headers: { ...userHeaders, Accept: "application/json" },
  };
  
  return await axios.patch(endpoint, {}, requestHeaders).then(
    (response) => response.data,
    (error) => {
      console.error("Reactivate user error:", error);
      return null;
    }
  );
}

async function createUser(userHeaders, userData, userRole) {
  const endpoint = userRole === "admin"
    ? `${API_URL}/admins/users`
    : `${API_URL}/moderators/users`;
    
  const requestHeaders = {
    headers: { ...userHeaders, Accept: "application/json" },
  };
  
  return await axios
    .post(endpoint, { user: userData }, requestHeaders)
    .then(
      (response) => response.data,
      (error) => {
        console.error("Create user error:", error);
        return null;
      }
    );
}

function UsersIndex({ activeTab }) {
  const [usersData, setUsersData] = useState({ admins: [], moderators: [], users: [] });
  const [loading, setLoading] = useState(true);
  const { userHeaders, userDetails } = useData();

  // Edit modal state
  const [editModal, setEditModal] = useState({
    isOpen: false,
    user: null,
  });

  // Fetch all users data
  useEffect(() => {
    let mounted = true;

    if (userHeaders && userDetails) {
      setLoading(true);
      getAllUsers(userHeaders, userDetails.role).then((data) => {
        if (mounted && data) {
          setUsersData({
            admins: data.data?.admins || [],
            moderators: data.data?.moderators || [],
            users: data.data?.users || [],
          });
        }
        setLoading(false);
      });
    }

    return () => (mounted = false);
  }, [userHeaders, userDetails]);

  const refreshUsers = async () => {
    const updatedData = await getAllUsers(userHeaders, userDetails?.role);
    if (updatedData) {
      setUsersData({
        admins: updatedData.data?.admins || [],
        moderators: updatedData.data?.moderators || [],
        users: updatedData.data?.users || [],
      });
    }
  };

  const handleApproveModerator = async (userId) => {
    if (window.confirm("Are you sure you want to approve this moderator application?")) {
      const result = await approveModerator(userHeaders, userId);
      if (result) {
        alert("Moderator approved successfully!");
        await refreshUsers();
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
        await refreshUsers();
      } else {
        alert("Failed to reject application");
      }
    }
  };

  const handleEditUser = (user) => {
    setEditModal({ isOpen: true, user });
  };

  const handleSaveEdit = async (formData) => {
    const result = await updateUser(userHeaders, editModal.user.id, formData, userDetails?.role);
    if (result) {
      alert("User updated successfully!");
      setEditModal({ isOpen: false, user: null });
      await refreshUsers();
    } else {
      alert("Failed to update user");
    }
  };

  const handleBanUser = async (user) => {
    if (
      window.confirm(
        `Are you sure you want to BAN ${user.username}?\n\nThis will:\n- Deactivate the account\n- Keep all posts and comments`
      )
    ) {
      const result = await banUser(userHeaders, user.id, userDetails?.role);
      if (result) {
        alert(`${user.username} has been banned successfully!`);
        await refreshUsers();
      } else {
        alert("Failed to ban user");
      }
    }
  };

  const handleNukeUser = async (user) => {
    if (
      window.confirm(
        `⚠️ ARE YOU SURE YOU WANT TO NUKE ${user.username}? ⚠️\n\nThis will:\n- Deactivate the account\n- DELETE all posts\n- DELETE all comments\n\nThis action CANNOT be undone!`
      )
    ) {
      const doubleCheck = window.confirm(
        `FINAL WARNING: Confirm NUKE for ${user.username}?`
      );
      
      if (doubleCheck) {
        const confirmation = window.prompt(
          `Type "${user.username}" to confirm NUKE:`
        );
        
        if (confirmation === user.username) {
          const result = await nukeUser(userHeaders, user.id, userDetails?.role);
          if (result) {
            alert(`${user.username} has been nuked successfully!`);
            await refreshUsers();
          } else {
            alert("Failed to nuke user");
          }
        } else {
          alert("Confirmation failed. Nuke cancelled.");
        }
      }
    }
  };

  const handleCreateUser = async (userData) => {
    const result = await createUser(userHeaders, userData, userDetails?.role);
    if (result) {
      alert("User created successfully!");
      await refreshUsers();
    } else {
      alert("Failed to create user");
    }
  };

  const handleReactivateUser = async (user) => {
    if (
      window.confirm(
        `Are you sure you want to REACTIVATE ${user.username}?\n\nThis will:\n- Reactivate the account\n- Restore access to the forum`
      )
    ) {
      const result = await reactivateUser(userHeaders, user.id, userDetails?.role);
      if (result) {
        alert(`${user.username} has been reactivated successfully!`);
        await refreshUsers();
      } else {
        alert("Failed to reactivate user");
      }
    }
  };

  // Permission check function
  const canEditUser = (user) => {
    if (userDetails?.role === "admin") {
      return true; // Admins can edit everyone
    }
    if (userDetails?.role === "moderator") {
      // Moderators can only edit regular users
      return user.role === "user";
    }
    return false;
  };

  // Permission check for ban/nuke
  const canBanUser = (user) => {
    if (userDetails?.role === "admin") {
      // Admins can ban everyone except themselves
      return user.id !== userDetails.id;
    }
    if (userDetails?.role === "moderator") {
      // Moderators can only ban regular users (not admins or other moderators)
      return user.role === "user";
    }
    return false;
  };

  const canReactivateUser = (user) => {
    if (userDetails?.role === "admin") {
      // Admins can reactivate everyone except themselves
      return user.id !== userDetails.id;
    }
    if (userDetails?.role === "moderator") {
      // Moderators can only reactivate regular users
      return user.role === "user";
    }
    return false;
  };

  // Check if user can approve/reject moderator applications
  const canManageApplications = () => {
    return userDetails?.role === "admin";
  };

  // Combine all users
  const allUsers = [...usersData.admins, ...usersData.moderators, ...usersData.users];

  // Filter users based on role and status
  const pendingApplications = allUsers.filter(
    (user) => user.moderator_status === "pending"
  );
  
  // Active users by role
  const admins = usersData.admins.filter((user) => !user.deactivated);
  
  const moderators = usersData.moderators.filter((user) => !user.deactivated);
  
  const activeUsers = usersData.users.filter((user) => !user.deactivated);
  
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
      {/* Edit Modal */}
      <EditUser
        user={editModal.user}
        isOpen={editModal.isOpen}
        onClose={() => setEditModal({ isOpen: false, user: null })}
        onSave={handleSaveEdit}
        currentUserRole={userDetails?.role}
      />

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
                      className="bg-[#FAE5CAC0] rounded-lg border border-[#6B796A] p-4"
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
                        
                        {/* Only show approve/reject buttons for admins */}
                        {canManageApplications() && (
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleRejectApplication(user.id)}
                              className="px-4 py-2 bg-[#B8402D] text-(--pnb-gold) rounded hover:bg-red-700 transition-colors font-semibold"
                            >
                              Reject
                            </button>
                            <button
                              onClick={() => handleApproveModerator(user.id)}
                              className="px-4 py-2 bg-(--pnb-green) text-(--pnb-gold) rounded hover:bg-green-700 transition-colors font-semibold"
                            >
                              Accept
                            </button>
                          </div>
                        )}
                        
                        {/* Show read-only message for moderators */}
                        {!canManageApplications() && (
                          <div className="text-sm text-slate-500 italic">
                            Only admins can approve/reject
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}

        {/* Active Users Tab - 3 Collapsible Cards */}
        {activeTab === "active" && (
          <>
            <div className="rounded-t bg-[#6B796A] px-6 py-4">
              <h2 className="text-2xl font-semibold text-[#F7D480]">
                Active Users
              </h2>
            </div>
            <div className="bg-[#FAE5CA] px-6 py-6 space-y-4">
              <CollapsibleCard
                title="Admins"
                users={admins}
                onEdit={handleEditUser}
                onBan={handleBanUser}
                onNuke={handleNukeUser}
                canEdit={canEditUser}
                canBan={canBanUser}
                showProhibitedMessage={userDetails?.role === "moderator"}
              />
              <CollapsibleCard
                title="Moderators"
                users={moderators}
                onEdit={handleEditUser}
                onBan={handleBanUser}
                onNuke={handleNukeUser}
                canEdit={canEditUser}
                canBan={canBanUser}
                showProhibitedMessage={userDetails?.role === "moderator"}
              />
              <CollapsibleCard
                title="Users"
                users={activeUsers}
                onEdit={handleEditUser}
                onBan={handleBanUser}
                onNuke={handleNukeUser}
                canEdit={canEditUser}
                canBan={canBanUser}
              />
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
                      className="bg-[#FAE5CA] rounded-lg border border-[#6B796A] px-4 py-3"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-[#5B6153]">
                            {user.username}
                          </h3>
                          <p className="text-sm text-slate-500">
                            {user.email} • Role: {user.role}
                          </p>
                          <p className="text-sm text-red-600 font-semibold mt-1">
                            Banned: {formatDate(user.deactivated_at)}
                          </p>
                        </div>
                        
                        {/* Reactivate Button */}
                        {canReactivateUser(user) && (
                          <button
                            onClick={() => handleReactivateUser(user)}
                            className="px-4 py-2 bg-(--pnb-green) text-(--pnb-gold) rounded"
                          >
                            Reactivate
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}

        {/* Create User Tab - Use separate component */}
        {activeTab === "create" && (
          <CreateUser
            onCreateUser={handleCreateUser}
            currentUserRole={userDetails?.role}
          />
        )}
      </div>
    </div>
  );
}

export default UsersIndex;