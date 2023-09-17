import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation } from "swiper";

function Slider({ids}) {
  const [players, setPlayers] = useState([]);
  const [current, setCurrent] = useState(0);
  const [team, setTeam] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      const API = "jq2m1ECINqEAsH0B9oaGQQ1nVqkMM4PkqRhR6lCClQi6Hppxd4npdZCk2CXX";
      try {
        const response = await axios.get(`/api/football/squads/teams/${ids[team].id}?api_token=${API}&include=player`);
        setPlayers(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [ids,team]);

  const handleSlideChange = (swiper) => {
    setCurrent(swiper.realIndex);
  };

  console.log("lol",players);

  return (
    <div className="sliderMain">
      <div className="container">
        {players && (
          <h1 className="heading">{players[current]?.player.common_name}</h1>
        )}
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
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
              <SwiperSlide key={item.id}>
                <img src={item.player.image_path} alt="slide_image" />
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

export default Slider;
