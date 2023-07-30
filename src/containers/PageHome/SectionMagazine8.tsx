// @ts-nocheck
import React, { useState, useEffect, useContext, FC } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../../context/auth";
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import PublicIcon from '@mui/icons-material/Public';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import Card16Podcast from "components/Card16Podcast/Card16Podcast";
import Card17Podcast from "components/Card17Podcast/Card17Podcast";
import Heading from "components/Heading/Heading";
import { PostDataType } from "data/types";

export interface SectionMagazine8Props {
  posts?: PostDataType[];
  className?: string;
}

const SectionMagazine8: FC<SectionMagazine8Props> = ({
  posts = [],
  className = "",
}) => {
  const [step, setStep] = useState(0);
  const [favoriteClub, setFavoriteClub] = useState(null);
  const [favoriteLeague, setFavoriteLeague] = useState(null);
  const [favoriteCountry, setFavoriteCountry] = useState(null);
  const [clubs, setClubs] = useState([]);
  const [leagues, setLeague] = useState([]);
  const [country, setCountry] = useState([]);
  const { token, user } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/club/');
        const data = await response.json();
        setClubs(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/league/');
        const data = await response.json();
        setLeague(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/country/');
        const data = await response.json();
        setCountry(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleLeagueSelect = (id) => {
    setFavoriteLeague(id);
    setStep(1);
  };

  const handleClubSelect = (id) => {
    setFavoriteClub(id);
    setStep(2);
  };

  const handleCountrySelect = (id) => {
    setFavoriteCountry(id);
    handleSubmit();
    history.push('/');
  };

  const handleSubmit = async () => {
    try {
      const key = token;
      const config = {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      };

      const postData = {
        leagues: [favoriteLeague],
        countries: [favoriteCountry],
        clubs: [favoriteClub],
      };

      await axios.put(`/api/users/${user._id}`, postData, config);
      console.log('User updated successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`nc-SectionMagazine8 relative ${className}`}>
      <Heading desc={"Pour Toi ⭐️"} className="mb-14 text-neutral-900 dark:text-neutral-50">
        PLUS D’ACTUALITÉS
      </Heading>
      <div className={`grid grid-cols-1 sm:grid-cols-6 gap-6 md:gap-8`}>
        <div className="flex flex-col space-y-6 md:space-y-8 sm:col-span-6 lg:col-span-2">
          {step === 1 && (
            <div className={`grid grid-cols-${leagues.length} gap-4 md:gap-8`}>
              {leagues.map((league) => (
                <Card17Podcast
                  key={league._id}
                  data={league}
                  logo={<EmojiEventsIcon />}
                  handleSelect={handleLeagueSelect}
                />
              ))}
            </div>
          )}
          {step === 2 && (
            <div className={`grid grid-cols-${clubs.length} gap-4 md:gap-8`}>
              {clubs.filter((_, i) => i > 1 && i < 6).map((club) => (
                <Card17Podcast
                  key={club._id}
                  data={club}
                  logo={<SportsSoccerIcon />}
                  handleSelect={handleClubSelect}
                />
              ))}
            </div>
          )}
          {step === 0 && (
            <div className={`grid grid-cols-${country.length} gap-4 md:gap-8`}>
              {country.map((countr) => (
                <Card17Podcast
                  key={countr._id}
                  data={countr}
                  logo={<PublicIcon />}
                  handleSelect={handleCountrySelect}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionMagazine8;
