import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const ImageCarousel = ({ images }) => {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 4000 }}
      loop={true}
      allowTouchMove={true}
      speed={700}
      className="w-full h-40 rounded-xl overflow-hidden"
    >
      {images.map((img, i) => (
        <SwiperSlide key={i}>
          <img
            src={img}
            className="w-full h-40 object-cover"
            draggable="false"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageCarousel;
