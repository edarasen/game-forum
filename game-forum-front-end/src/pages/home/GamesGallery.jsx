import GameCard from "./GameCard";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

import horti1 from "../../assets/horti1.jpg";
import horti2 from "../../assets/horti2.jpg";
import horti3 from "../../assets/horti3.jpg";

import witchy1 from "../../assets/witchy1.jpg";
import witchy2 from "../../assets/witchy2.jpg";
import witchy3 from "../../assets/witchy3.jpg";

import pot1 from "../../assets/pot1.jpg";
import pot2 from "../../assets/pot2.jpg";
import pot3 from "../../assets/pot3.jpg";

const API_URL = import.meta.env.VITE_API_URL;

async function getInspiredData() {
  return await axios.get(`${API_URL}/rawgdata`).then(
    (response) => response.data,
    (error) =>
      error.response.data.error
        ? console.log(error.response.data.error)
        : console.log(error.response.data.message)
  );
}


const GamesGallery = () => {

  const [rawgData, setrawgData] = useState(false)
  
  useEffect(()=>{
      let mounted = true
      getInspiredData().then((data) => {
        if (mounted) {
          setrawgData(data);
          console.log("data mounted successfully");
          console.log(data);
        }
      });
      return ()=>(mounted=false);
    }, []);
  
  return ( <>
  {rawgData ? <div className="bg-[#fce5cd] w-full py-10">
      <h1 className="text-center text-3xl font-bold text-[#677365] mb-10">
        Inspired By Other Indie Games
      </h1>

      <div className="flex flex-col md:flex-row justify-center gap-8">
        <GameCard
          title={rawgData[0]["name_original"]}
          images={[horti1, horti2, horti3]}
          creator={rawgData[0]["developer"]}
          genre={rawgData[0]["genres"]}
        />
        <GameCard
          title={rawgData[1]["name_original"]}
          images={[witchy1, witchy2, witchy3]}
          creator={rawgData[1]["developer"]}
          genre={rawgData[1]["genres"]}
        />
        <GameCard
          title={rawgData[2]["name_original"]}
          images={[pot1, pot2, pot3]}
          creator={rawgData[2]["developer"]}
          genre={rawgData[2]["genres"]}
        />
      </div>
    </div> : <></>}
  </>
  );
};

export default GamesGallery;