// @ts-nocheck
import React, { useState, useEffect, useContext, FC } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../../context/auth";
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import PublicIcon from '@mui/icons-material/Public';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CardFav from "../../components/CardFav";

import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";

import { DEMO_AUTHORS } from "data/authors";


function PickFav() {
  const [step, setStep] = useState(0);
  const [favoriteClub, setFavoriteClub] = useState(null);
  const [favoriteLeague, setFavoriteLeague] = useState(null);
  const [favoriteCountry, setFavoriteCountry] = useState(null);
  const [clubs, setClubs] = useState([]);
  const [leagues, setLeague] = useState([]);
  const [country, setCountry] = useState([]);
  const { token, user } = useContext(AuthContext);
  const history = useHistory();
  const [title, setTitle] = useState(" 🌍 Pays préférés");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://apiblognode.onrender.com/api/club/');
        const data = await response.json();
        const postsData = Array.isArray(data) ? data : [];

        setClubs(postsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://apiblognode.onrender.com/api/league/');
        const data = await response.json();
        const postsData = Array.isArray(data) ? data : [];

        setLeague(postsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://apiblognode.onrender.com/api/country/');
        const data = await response.json();
        const postsData = Array.isArray(data) ? data : [];

        setCountry(postsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);



  const handleSubmit = async () => {
    try {
      const key = token;
      const config = {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      };

      const postData = {
        leagueIds: favoriteLeague,
        countryIds: favoriteCountry,
        clubIds: favoriteClub,
      };

      await axios.put(`https://apiblognode.onrender.com/api/users/${user._id}`, postData, config);
     
    } catch (error) {
      console.error(error);
    }
  };

 
  





  const handleCardClickCountry = (data) => {
    setFavoriteCountry(data._id);
    setStep(1);
    setTitle('🏆 Ligue préférée')

  };



  const handleCardClickLeague = (data) => {


    setFavoriteLeague(data._id);
    setStep(2);
    setTitle('⚽ Clubs préférés')

  };



  
  const handleCardClickClub = (data) => {
    setFavoriteClub(data._id);
  }
  
  useEffect(() => {
    if (favoriteClub) {
      handleSubmit();
      history.push('/');
    }
  }, [favoriteClub]);

  const PF = "https://apiblognode.onrender.com/images/";
  

  return (

<div className="card_container">

<div className="drop">
 

  <div className="drop__title-container">
  <span>
    {title}
  </span>
  </div>
{step === 0 && (
    
<div className="drop__container" id="drop-items">


{country.map((data) => {

const cardClasses = `drop__card `;


const {id,image_path} = data

let imgSrc;
if(id===0  || null ){
  imgSrc = PF + image_path
}else{
  imgSrc = image_path
}
   
return (
  <div
    key={data._id}
    className={cardClasses}
      onClick={() => handleCardClickCountry(data)}
    >
      <div className="drop__data">
        <img src={imgSrc} alt="" className="drop__img" />
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






      
    )}

{step === 1 && (
    <div className="drop__container" id="drop-items">


    {leagues.map((data) => {
   
    
   const cardClasses = `drop__card  `;
   
const {id,image_path} = data

let imgSrc;
if(id===0  || null ){
  imgSrc = PF + image_path
}else{
  imgSrc = image_path
}
     return (
       <div
         key={data._id}
         className={cardClasses}
          onClick={() => handleCardClickLeague(data)}
        >
          <div className="drop__data">
            <img src={imgSrc} alt="" className="drop__img" />
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
    )}


{step === 2 && (
   <div className="drop__container" id="drop-items">


   {clubs.map((data) => {

     const cardClasses = `drop__card `;
     const {id,image_path} = data

     let imgSrc;
     if(id===0  || null ){
       imgSrc = PF + image_path
     }else{
       imgSrc = image_path
     }
     return (
       <div
         key={data._id}
         className={cardClasses}
         onClick={() => handleCardClickClub(data)}
       >
         <div className="drop__data">
           <img src={imgSrc} alt="" className="drop__img" />
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
    )}



</div>
</div>

    


 

  )
}

export default PickFav