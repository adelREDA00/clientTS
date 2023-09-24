// @ts-nocheck
import CardAuthorBox from "components/CardAuthorBox/CardAuthorBox";
import Heading from "components/Heading/Heading";
import { PostAuthorType } from "data/types";
import React, {useEffect,useState,useContext ,FC } from "react";
import axios from 'axios';
import { AuthContext } from "../../context/auth";
import { useHistory  } from 'react-router-dom';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import PublicIcon from '@mui/icons-material/Public';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import  Card17Podcast   from "../../components/Card17Podcast/Card17Podcast"





export interface SectionGridAuthorBoxProps {
  className?: string;
  authors: PostAuthorType[];
}

const SectionGridAuthorBox: FC<SectionGridAuthorBoxProps> = ({
  className = "",

}) => {
  let history = useHistory ();
  const { token,user } = useContext(AuthContext);

  const [favoriteClub, setFavoriteClub] = useState(null); // Selected favorite club
  const [favoriteLeague, setFavoriteLeague] = useState(null); // Selected favorite league
  const [favoriteCountry, setFavoriteCountry] = useState(null);// Selected favorite country

  //title
  const [hoveredTitle, setHoveredTitle] = useState('chose your fav  country');
  //chinging steps
  const [step, setStep] = useState(0);

  //fetch data
  const [clubs, setClubs] = useState([]);
  const [leagues, setLeague] = useState([]);
  const [Country, setCountry] = useState([]);



  const useFetchData = (url, setter) => {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(url);
          const data = await response.json();
          const postsData = Array.isArray(data) ? data : [];

          setter(postsData);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData();
    }, [url, setter]);
  };

  

  useFetchData('https://apiblognode.onrender.com/api/club/', setClubs);
  useFetchData('https://apiblognode.onrender.com/api/league/', setLeague);
  useFetchData('https://apiblognode.onrender.com/api/country/', setCountry);


  const handleLeagueSelect = (id) => {
    setFavoriteLeague(id);
    setHoveredTitle("chose your fav club")
    setStep(2); // Move to the next step
  };



  

  const handleClubSelect =  (id) => {
    setFavoriteClub(id);

  };

  useEffect(() => {
    if (favoriteClub !== null) {
      handleSubmit();
      history.push('/')
    }
  }, [favoriteClub]);



  const handleCountrySelect = (id) => {
    setFavoriteCountry(id);
    setHoveredTitle("chose your fav league")
    setStep(1); // Move to the next step


    // You can submit the user's choices here or perform any other action
  };

   //submit 

   const handleSubmit = async () => {
    try {
      const key = token; // Replace with your actual authentication token
      const config = {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      };
  
   
  
      const postData = {
        leagueIds: [favoriteLeague],
        countryIds: [favoriteCountry],
        clubIds: [favoriteClub],
      };

  
      await axios.put(`https://apiblognode.onrender.com/api/users/${user._id}`, postData, config);
      // Handle success or any additional logic
      console.log('user updated successfully!');
    } catch (error) {
      // Handle error
      console.error(error);
    }

  };




 

  //get my-user data
  const test = async () => {
    try {
      const key = token; // Replace with your actual authentication token
      const config = {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      };
  
     const res =  await axios.get(`https://apiblognode.onrender.com/api/users/${user._id}`, config);
      // Handle success or any additional logic
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };






  return (
    <div
      className={`nc-SectionGridAuthorBox relative ${className}`}
      data-nc-id="SectionGridAuthorBox"
    >
      <Heading desc="Rating based on customer reviews" isCenter>
        {hoveredTitle}
      </Heading>
      
      {step === 1 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8 favs">
          {leagues.map((league) => (
            <Card17Podcast  key={league._id}  data={league}  logo={<EmojiEventsIcon/>}
            handleSelect={handleLeagueSelect}  />
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8 favs">
          {clubs.map((club) => (
            <CardAuthorBox
              key={club._id}
              data={club}
              logo={<SportsSoccerIcon/>}
              handleSelect={handleClubSelect}
            />
          ))}
        </div>
      )}

      {step === 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8 favs">
           {Country.map((countr) => (
            <CardAuthorBox
              key={countr._id}
              data={countr}
              logo={<PublicIcon/>}
              handleSelect={handleCountrySelect}
            />
          ))}
        </div>
      )}

      


  
    </div>
  );
};

export default SectionGridAuthorBox;
