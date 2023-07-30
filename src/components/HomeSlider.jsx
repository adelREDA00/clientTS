import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation } from "swiper";
import { NavLink } from "react-router-dom";


function HomeSlider({ids}) {
  const [players, setPlayers] = useState(null);
  const [current, setCurrent] = useState(0);

 

  const PF = "https://blogapi-vbdw.onrender.com/images/";


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/player`);
        setPlayers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

const handleSlideChange = (swiper) => {
    setCurrent(swiper.realIndex);
  };


  return (
    <div className="sliderMain">
      <div className="container">
        {players && (
          <h1 className="heading">{players[current]?.name}</h1>
        )}
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={false}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            clickable: true,
          }}
          onSlideChange={handleSlideChange}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="swiper_container"
        >
          {players ? (
            players.map((item) => (
         
              <SwiperSlide key={item._id}>
                       <NavLink
                to={`/home-demo-6/2/${item._id}/${encodeURIComponent(item.name)}`}
                className={`nc-CardCategory1 flex items-center`}
                data-nc-id="CardCategory1"
              >
                <img src={PF + item.image_path} alt="slide_image" />
                </NavLink>
              </SwiperSlide>
          
            ))
          ) : (
            <div>Loading...</div>
          )}
        </Swiper>

        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </div>
  );
}

export default HomeSlider;
