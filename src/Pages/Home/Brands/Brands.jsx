import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import amazon from "../../../assets/brands/amazon.png";
import amazon_vector from "../../../assets/brands/amazon_vector.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import star from "../../../assets/brands/star.png";
import start_people from "../../../assets/brands/start_people.png";
import { Autoplay } from "swiper/modules";

const logos = [
  amazon,
  amazon_vector,
  casio,
  moonstar,
  randstad,
  star,
  start_people,
];
const Brands = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center">
        We've helped thousands of sales teams
      </h1>
      <div className="my-10">
        <Swiper
          slidesPerView={4}
          centeredSlides={true}
          spaceBetween={30}
          grabCursor={true}
          loop={true}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          {logos.map((logo) => (
            <SwiperSlide>
              <img src={logo} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Brands;
