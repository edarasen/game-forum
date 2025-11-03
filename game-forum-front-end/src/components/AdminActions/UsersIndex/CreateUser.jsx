import { useState } from "react";

function CreateUser({ onCreateUser, currentUserRole }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      alert("All fields are required");
      return;
    }

    // For moderators, don't send role (backend will set it to 'user')
    // For admins, send the selected role
    const userData = currentUserRole === "moderator" 
      ? { 
          username: formData.username,
          email: formData.email,
          password: formData.password
        }
      : formData;

    onCreateUser(userData);

    // Reset form
    setFormData({
      username: "",
      email: "",
      password: "",
      role: "user",
    });
  };

  const isAdmin = currentUserRole === "admin";

  return (
    <>
      <div className="rounded-t bg-[#6B796A] px-6 py-4">
        <h2 className="text-2xl font-semibold text-[#F7D480]">
          Create New User
        </h2>
      </div>
      <div className="flex justify-center bg-[#FAE5CA] px-6 py-6">
        <form onSubmit={handleSubmit} className="max-w-md w-full">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#5B6153] mb-2">
                Username
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
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
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
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
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-4 py-2 border border-[#6B796A] rounded focus:outline-none focus:ring-2 focus:ring-[#6B796A]"
                placeholder="Enter password"
              />
            </div>

            {/* Role field - different for admin vs moderator */}
            <div>
              <label className="block text-sm font-semibold text-[#5B6153] mb-2">
                Role
              </label>
              {isAdmin ? (
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-[#6B796A] rounded focus:outline-none focus:ring-2 focus:ring-[#6B796A]"
                >
                  <option value="user">User</option>
                  <option value="moderator">Moderator</option>
                  <option value="admin">Admin</option>
                </select>
              ) : (
                // Role is fixed to 'user' for moderators
                <>
                  <select
                    value="user"
                    disabled
                    className="w-full px-4 py-2 border border-[#6B796A] rounded bg-gray-100 cursor-not-allowed"
                  >
                    <option value="user">User</option>
                  </select>
                  <p className="text-xs text-slate-500 mt-1">
                    Moderators can only create regular users
                  </p>
                </>
              )}
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
  );
}

export default CreateUser;