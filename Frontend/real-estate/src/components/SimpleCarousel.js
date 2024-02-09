import {
  Navigation,
  Pagination,
  A11y,
  Autoplay,
  EffectFade,
  Lazy,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";

const SimpleCarousel = ({ imageUrls }) => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, A11y, Autoplay, EffectFade]}
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{ delay: 2000 }}
      effect={"fade"}
      navigation
      pagination={{ clickable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      {imageUrls?.map((image, index) => (
        <SwiperSlide>
          <img src={image} alt="" key={index} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SimpleCarousel;
