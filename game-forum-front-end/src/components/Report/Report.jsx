import { useState } from "react";

function Report({ isOpen, onClose, onConfirm, type }) {
  const [reportReason, setReportReason] = useState("");

  const reportReasons = [
    { value: "spam", label: "Spam" },
    { value: "harassment", label: "Harassment" },
    { value: "inappropriate_content", label: "Inappropriate Content" },
    { value: "cheating", label: "Cheating" },
    { value: "off_topic", label: "Off Topic" },
    { value: "impersonation", label: "Impersonation" },
    { value: "others", label: "Others" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!reportReason) {
      alert("Please select a reason for reporting");
      return;
    }
    
    onConfirm(reportReason);
    setReportReason(""); // Reset after submission
  };

  const handleClose = () => {
    setReportReason(""); // Reset when closing
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#FAE5CA]/80 flex items-center justify-center z-50">
      <div className="bg-[#B03933] rounded-lg shadow-xl max-w-md w-full mx-4">
        <form onSubmit={handleSubmit} className="p-6">
          <h2 className="text-2xl font-bold text-[#F7D480] mb-4">
            Report {type === "post" ? "Post" : "Comment"}
          </h2>
          
          <p className="text-[#F7D480] mb-4">
            Moderators will review the content and will delete this if it violates the
            community's rules of conduct. Note that review will take time depending on the
            availability of the moderators.
          </p>

          {/* Report Reasons Radio Buttons */}
          <div className="mb-6">
            <p className="text-[#F7D480] font-semibold mb-3">Select a reason:</p>
            <div className="space-y-2">
              {reportReasons.map((reason) => (
                <label
                  key={reason.value}
                  className="flex items-center text-[#F7D480] cursor-pointer hover:text-[#FAE5CA] transition-colors"
                >
                  <input
                    type="radio"
                    name="reportReason"
                    value={reason.value}
                    checked={reportReason === reason.value}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="mr-3 w-4 h-4 accent-[#F7D480] cursor-pointer"
                  />
                  <span>{reason.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-between">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 bg-[#B03933] border-2 border-[#F7D480] text-[#F7D480] rounded-3xl hover:bg-[#8B2B27] transition-colors font-semibold"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#F7D480] text-[#B03933] rounded-3xl hover:bg-[#F5E0A0] transition-colors font-semibold"
            >
              Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Report;