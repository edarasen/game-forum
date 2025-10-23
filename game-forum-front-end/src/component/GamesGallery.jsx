import GameCard from "./GameCard";

import horti1 from "../assets/horti1.jpg";
import horti2 from "../assets/horti2.jpg";
import horti3 from "../assets/horti3.jpg";

import witchy1 from "../assets/witchy1.jpg";
import witchy2 from "../assets/witchy2.jpg";
import witchy3 from "../assets/witchy3.jpg";

import pot1 from "../assets/pot1.jpg";
import pot2 from "../assets/pot2.jpg";
import pot3 from "../assets/pot3.jpg";



const GamesGallery = () => {
  return (
    <div className="bg-[#fce5cd] w-full py-10">
      <h1 className="text-center text-3xl font-bold text-[#677365] mb-10">
        Inspired By Other Indie Games
      </h1>

      <div className="flex flex-col md:flex-row justify-center gap-8">
        <GameCard title="Strange Horticulture" images={[horti1, horti2, horti3]} creator="Bad Viking" genre="Adventure, Simulation" />
        <GameCard title="Witchy Life Story" images={[witchy1, witchy2, witchy3]} creator="Sundew Studios" genre="Indie, Casual, Simulation, Adventure"  />
        <GameCard title="Potion Craft" images={[pot1, pot2, pot3]} creator="niceplay game" genre="Simulation, Casual, Indie" />
      </div>
    </div>
  );
};

export default GamesGallery;