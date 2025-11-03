import { useState } from "react";

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

function CollapsibleCard({ title, users, onEdit, onBan, onNuke, canEdit, canBan, showProhibitedMessage }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#6B796A] px-6 py-4 rounded-t-lg flex justify-between items-center hover:bg-[#5B6153] transition-colors"
      >
        <h3 className="text-xl font-semibold text-[#F7D480]">
          {title} ({users.length})
        </h3>
        <svg
          className={`w-6 h-6 text-[#F7D480] transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="bg-[#FAE5CA] px-6 py-4 rounded-b-lg">
          {/* Show prohibited message if moderator viewing admins/moderators */}
          {showProhibitedMessage && (
            <div className="bg-[#E76F51] bg-opacity-20 border border-[#B8402D] rounded-lg px-4 py-3 mb-4">
              <p className="text-sm text-[#B8402D] font-semibold text-center">
                🚫 Prohibited from modifying this role
              </p>
            </div>
          )}

          {users.length === 0 ? (
            <p className="text-center text-slate-600 py-4">
              No {title.toLowerCase()}
            </p>
          ) : (
            <ul className="space-y-3">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="bg-[#FAE5CAC0] rounded-lg border border-[#6B796A] px-4 py-3"
                >
                  <div className={`flex ${showProhibitedMessage ? 'justify-center' : 'justify-between'} items-start gap-4`}>
                    <div className={`flex-1 ${showProhibitedMessage ? 'text-center' : 'text-left'}`}>
                      <h4 className="text-lg font-semibold text-[#5B6153]">
                        {user.username}
                      </h4>
                      <p className="text-sm text-slate-500">
                        {user.email} • Role: {user.role}
                      </p>
                      <p className="text-sm text-slate-500">
                        Joined: {formatDate(user.created_at)}
                      </p>
                    </div>
                    
                    {/* Action Buttons - only show if not prohibited */}
                    {!showProhibitedMessage && (
                      <div className="flex gap-2 items-start flex-wrap">
                        {canEdit(user) && (
                          <button
                            onClick={() => onEdit(user)}
                            className="px-3 py-1.5 text-sm bg-[#6B796A] text-[#F7D480] rounded hover:bg-[#5B6153] transition-colors font-semibold"
                          >
                            Edit
                          </button>
                        )}
                        
                        {canBan(user) && (
                          <>
                            <button
                              onClick={() => onBan(user)}
                              className="px-3 py-1.5 text-sm bg-[#D9822B] text-[#F7D480] rounded hover:bg-[#B8402D] transition-colors font-semibold"
                            >
                              Ban
                            </button>
                            <button
                              onClick={() => onNuke(user)}
                              className="px-3 py-1.5 text-sm bg-[#B8402D] text-[#F7D480] rounded hover:bg-[#8B3022] transition-colors font-semibold"
                            >
                              Nuke
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default CollapsibleCard;