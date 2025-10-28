export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/40">
      <div className="relative bg-[#677365] text-white rounded-xl shadow-lg p-6 w-[90%] max-w-sm">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-2xl font-bold text-[#f7d486] hover:text-white"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
