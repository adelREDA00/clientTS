// @ts-nocheck
import Card15Podcast from "components/Card15Podcast/Card15Podcast";
import Card9 from "components/Card9/Card9";
import Heading from "components/Heading/Heading";
import { DEMO_POSTS_AUDIO } from "data/posts";
import { PostDataType } from "data/types";
import React, { FC,useEffect,useState } from "react";
import axios from 'axios';


const postsDemo: PostDataType[] = DEMO_POSTS_AUDIO.filter(
  (_, i) => i > 0 && i < 10
);

export interface SectionMagazine9Props {
  posts?: PostDataType[];
  className?: string;
  gapClassName?: string;
  heading?: string;
}

const SectionMagazine9: FC<SectionMagazine9Props> = ({
  posts,
  className = "",
  gapClassName = "gap-6 md:gap-8",
  heading = " PLUS D’ACTUALITÉS ",
  userData
}) => {

    //geting the user FAVs pikcs only the first ones
    const {leagues,clubs,countries} = userData
    
     // Recommended data posts
  const [recdata, setRecData] = useState([]);
  const [recClub, setRecClub] = useState([]);
  const [recCountry, setRecCountry] = useState([]);
    //fetching the posts
    useEffect(() => {
      const fetchData = async () => {
        try {
          if (leagues) {
            const res = await axios.get(`/api/posts/?league=${leagues[0]._id}`);
            setRecData(res.data);
           
            
          }
        } catch (err) {
          console.log(err);
        }
      };
    
      fetchData();
    }, [leagues]);


  
    //fetching the posts
    useEffect(() => {
      const fetchData = async () => {
        try {
          if (clubs) {
            const res = await axios.get(`/api/posts/?club=${clubs[0]._id}`);
            setRecClub(res.data);
          }
        } catch (err) {
          console.log(err);
        }
      };
    
      fetchData();
    }, [clubs]);

  
    //fetching the posts
    useEffect(() => {
      const fetchData = async () => {
        try {
          if (countries) {
            const res = await axios.get(`/api/posts/?country=${countries[0]._id}`);
            setRecCountry(res.data);
          }
        } catch (err) {
          console.log(err);
        }
      };
    
      fetchData();
    }, [countries]);


  
  return (
    <div className={`nc-SectionMagazine9 relative ${className}`}>
      {heading && (
        <Heading desc={"Pour Toi ⭐️"}>
          {heading}
        </Heading>
      )}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${gapClassName}`}
      >
        {recdata[0] && <Card9 ratio="aspect-w-4 aspect-h-3 " post={recdata[0]} />}
        {recClub[0] && <Card9 ratio="aspect-w-4 aspect-h-3 " post={recClub[0]} />}
        {recCountry[recCountry.length - 1] && <Card9 ratio="aspect-w-4 aspect-h-3 " post={recCountry[recCountry.length - 1]} />}
      </div>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${gapClassName} mt-8`}
      >
        {posts
          .filter((_, i) => i > 2)
          .map((p,index) => (
            <Card15Podcast key={p._id} index={index} post={p} />
          ))}
      </div>
    </div>
  );
};

export default SectionMagazine9;
