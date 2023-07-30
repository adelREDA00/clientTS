// @ts-nocheck
import React, { useState, useEffect, useContext, FC } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../context/auth";
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import PublicIcon from '@mui/icons-material/Public';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';



function CardFav( {Data,handleSelect,handleCardClick} ) {

  return (

    <div className="drop__container" id="drop-items">
    {Data.map((data) => {
      const isSelected = selectedCards.some((card) => card.id === data.id);
      const cardClasses = `drop__card ${isSelected ? 'active' : ''}`;
    
      return (
        <div
          key={data._id}
          className={cardClasses}
          onClick={() => handleCardClick(data)}
        >
          <div className="drop__data">
            <img src={data.image_path} alt="" className="drop__img" />
            <div>
              <h1 className="drop__name">{data.name}</h1>
             
            </div>
          </div>
    
          <div>
            <a href="#" className="drop__social">
              <i className="bx bxl-instagram"></i>
            </a>
            <a href="#" className="drop__social">
              <i className="bx bxl-facebook"></i>
            </a>
            <a href="#" className="drop__social">
              <i className="bx bxl-twitter"></i>
            </a>
          </div>
        </div>
      );
    })}
    
    </div>

  )
}

export default CardFav