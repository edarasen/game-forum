function Report({ isOpen, onClose, onConfirm, type }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#FAE5CA]/80 flex items-center justify-center z-50">
      <div className="bg-[#B03933] rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-[#F7D480] mb-4">
            Report {type === "post" ? "Post" : "Comment"}
          </h2>
          <p className="text-[#F7D480] mb-6">
            Moderators will review the content and will delete this if it violates the
            community's rules of conduct. Note that review will take time depending on the
            availability of the moderators.
          </p>
          <div className="flex gap-3 justify-between">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-[##B03933] border-2 border-[#F7D480] text-[#F7D480] rounded-3xl hover:bg-gray-400 transition-colors font-semibold"
            >
              Back
            </button>
            <button
              onClick={onConfirm}
              className="px-6 py-2 bg-[#F7D480] text-[#B03933] rounded-3xl hover:bg-red-700 transition-colors font-semibold"
            >
              Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;