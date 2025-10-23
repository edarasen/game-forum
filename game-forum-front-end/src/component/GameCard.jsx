import ImageCarousel from "./ImageCarousel";

const GameCard = ({ title, creator, genre, images }) => {
  return (
    <div className="bg-[#677365] p-4 rounded-xl w-full max-w-md shadow-md">
      <ImageCarousel images={images} />
      <h2 className="text-xl font-bold mt-3 text-[#f7d486]">{title}</h2>
      <p className="text-[#f7d486] font-medium mt-1">
        by {creator}
      </p>
      <p className="text-[#f7d486] text-sm mt-1">
        {genre}
      </p>
    </div>
  );
};

export default GameCard;
