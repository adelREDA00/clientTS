// @ts-nocheck
import React, { useEffect, FC, useContext, useState } from "react";
import SectionLatestPosts from "./SectionLatestPosts";
import SectionSliderPosts from "./SectionSliderPosts";
import SectionMagazine1 from "./SectionMagazine1";
import SectionVideos from "./SectionVideos";
import SectionLargeSlider from "./SectionLargeSlider";
import { Helmet } from "react-helmet";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import { PostDataType } from "data/types";
import {
  DEMO_POSTS,
  DEMO_POSTS_AUDIO,
  DEMO_POSTS_GALLERY,
  DEMO_POSTS_VIDEO,
} from "data/posts";
import { DEMO_CATEGORIES } from "data/taxonomies";
import { DEMO_AUTHORS } from "data/authors";
import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSliderNewAuthors from "components/SectionSliderNewAthors/SectionSliderNewAuthors";
import SectionMagazine4 from "./SectionMagazine4";
import SectionAds from "./SectionAds";
import SectionGridPosts from "./SectionGridPosts";
import SectionMagazine7 from "./SectionMagazine7";
import SectionMagazine8 from "./SectionMagazine8";
import SectionMagazine9 from "./SectionMagazine9";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import Heading from "../../components/Heading/Heading";

//import HomeSlider from "components/HomeSlider";
import axios from 'axios';
import { AuthContext } from "../../context/auth";


//
const POSTS: PostDataType[] = DEMO_POSTS;
//
const MAGAZINE1_TABS = ["all", "Garden", "Fitness", "Design"];
const MAGAZINE1_POSTS = DEMO_POSTS.filter((_, i) => i >= 8 && i < 16);
const MAGAZINE2_POSTS = DEMO_POSTS.filter((_, i) => i >= 0 && i < 7);
//

const PageHome: React.FC = () => {
  //data posts
  const [data, setData] = useState([]);
  //fetching the posts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://api-blog-ten.vercel.app/api/posts");
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);


  const [catdata, setCatData] = useState([]);
  //fetching the posts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://api-blog-ten.vercel.app/api/categories");
        setCatData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);



  const [leaguedata, setLeagueData] = useState([]);
  const [clubdata, setClubData] = useState([]);
  //fetching the club
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://api-blog-ten.vercel.app/api/club");
        setClubData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);


  //fetching league
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://api-blog-ten.vercel.app/api/league");
        setLeagueData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);


  /*const { user, token } = useContext(AuthContext);
  const [userinfo, setUserinfo] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const key = token; // Replace with your actual authentication token
        const config = {
          headers: {
            Authorization: `Bearer ${key}`,
          },
        };

        const res = await axios.get(`/api/users/${user._id}`, config);
        // Handle success or any additional logic
        setUserinfo(res.data)
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };

    fetchData();
  }, []);

*/
 /* useEffect(() => {
    const fetchData = async () => {
    
      const API = 'jq2m1ECINqEAsH0B9oaGQQ1nVqkMM4PkqRhR6lCClQi6Hppxd4npdZCk2CXX' 
  
      try {
        const response = await axios.get(`/api/football/teams?api_token=${API} `);
      setStandings(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  const [standings, setStandings] = useState([]);

*/



  const reversedData = data.slice().reverse();

  


  return ( 
    <div className="nc-PageHome relative">
      <Helmet>
        <title>Home || DZ FOOT</title>
      </Helmet>

      {/* ======== ALL SECTIONS ======== */}
      <div className="relative overflow-hidden">
        {/* ======== BG GLASS ======== */}
        <BgGlassmorphism />

        {/* ======= START CONTAINER ============= */}
        <div className="container relative">
          {/* === SECTION  === */}
          <SectionLargeSlider
            className="pt-10 pb-16 md:py-16 lg:pb-28 lg:pt-24 "
            posts={POSTS.filter((_, i) => i < 3)}
            data={reversedData}
          />


          {/* === SECTION 4 ===
        
           */}




          {catdata.map((category, index) => {
            const componentIndex = index % 3;
            if (componentIndex === 0) {
              return (
                <SectionMagazine1
                  key={category._id}
                  className="py-16 lg:py-28"
                  posts={MAGAZINE1_POSTS}
                  tabs={MAGAZINE1_TABS}
                  data={category._id}
                  catname={category.name}
                />
              );
            } else if (componentIndex === 1) {
              return (
                <div className="relative py-16" key={category._id}>
                  <BackgroundSection />
                  <SectionSliderPosts
                    postCardName="card11"
                    data={category._id}
                    heading={`${category.name} Articles`}
                    subHeading="Discover the most outstanding articles in all topics of life."
                    posts={DEMO_POSTS.filter(
                      (p, i) => i > 3 && i < 25 && p.postType === "standard"
                    )}
                    sliderStype="style2"
                    uniqueSliderClass="pageHome-section12"
                  />
                </div>
              );
            } else {
              return (
                <SectionMagazine4
                  key={category._id}
                  data={category._id}
                  className="py-16 lg:py-28"
                  heading={category.name}
                  posts={MAGAZINE2_POSTS}
                  tabs={MAGAZINE1_TABS}
                />

              )
            }
          })}










          {/* === SECTION  === 
          <div className="relative py-16">
            <BackgroundSection />
            <SectionSliderNewAuthors
              heading="COMPÉTITIONS POPULAIRES"
              subHeading="leagues"
              authors={DEMO_AUTHORS.filter((_, i) => i < 10)}
              uniqueSliderClass="PageHome"
            />
          </div>
          */}


          {/* === SECTION 5 === */}

          <SectionSliderNewCategories
            className="py-16 lg:py-28"
            heading="COMPÉTITIONS POPULAIRES 🏆"
            categories={DEMO_CATEGORIES.filter((_, i) => i < 10)}
            categoryCardType="card4"
            countheading="COMPÉTITIONS"
            uniqueSliderClass="pageHome-section5"
            elementdata={leaguedata}
            type={0}
          />



          <SectionSliderNewCategories
            className="py-16 lg:py-28"
            heading="ÉQUIPES LES PLUS SUIVIES 🔥"

            countheading="ÉQUIPES"
            categories={DEMO_CATEGORIES.filter((_, i) => i < 10)}
            categoryCardType="card4"
            uniqueSliderClass="pageHome-section5"
            elementdata={clubdata}
            type={1}
          />

          {/* === 
        recomndation 5 
          
             <SectionMagazine9
            gapClassName="gap-6"
            className="pt-16 lg:pt-24"
            posts={data.filter((_, i) => i >= 6 && i < 18)}
            userData={userinfo}
          />
          === */}

       

          <br/>
      





 


   <br/>
          <br/>
          <br/>
     
          
 


     


          {/* === SECTION 7 ===
          <SectionMagazine7
            className="py-16 lg:py-28"
            posts={DEMO_POSTS_GALLERY.filter((_, i) => i < 6)}
          />
        </div>
     <SectionMagazine8
            className="py-16 lg:py-28"
            posts={DEMO_POSTS_AUDIO.filter((_, i) => i < 6)}
            userData={userinfo}
          />

         <div className="dark bg-neutral-900 dark:bg-black dark:bg-opacity-20 text-neutral-100">
          <div className="relative container">
            <SectionGridPosts
              className="py-16 lg:py-28"
              headingIsCenter
              postCardName="card10V2"
              heading=""
              subHeading="Hover on the post card and preview video 🥡"
              posts={DEMO_POSTS_VIDEO.filter((_, i) => i > 5 && i < 12)}
              gridClass="md:grid-cols-2 lg:grid-cols-3"
            />
          </div>
        </div>


        <div className="container ">
               <SectionMagazine8
            className="py-16 lg:py-28"
            posts={DEMO_POSTS_AUDIO.filter((_, i) => i < 6)}
            userData={userinfo}
          />



          <SectionMagazine8
            className="py-16 lg:py-28"
            posts={DEMO_POSTS_AUDIO.filter((_, i) => i < 6)}
          />

 
          <div className="relative py-16">
            <BackgroundSection />
            <SectionMagazine9
              posts={DEMO_POSTS_AUDIO.filter((_, i) => i >= 6 && i < 16)}
            />
          </div>


          <SectionGridAuthorBox
            className="py-16 lg:py-28"
            authors={DEMO_AUTHORS.filter((_, i) => i < 10)}
          />

   
          <div className="relative py-16">
            <BackgroundSection />
            <SectionBecomeAnAuthor />
          </div>

      


       
          <SectionSubscribe2 className="pt-16 lg:pt-28" />

     
          <SectionVideos className="py-16 lg:py-28" />

        
          <SectionLatestPosts
            className="pb-16 lg:pb-28"
            posts={DEMO_POSTS.filter((_, i) => i > 8 && i < 16)}
            widgetPosts={DEMO_POSTS.filter((_, i) => i > 2 && i < 7)}
            categories={DEMO_CATEGORIES.filter((_, i) => i > 2 && i < 8)}
            tags={DEMO_CATEGORIES}
            data={"647bd0cda9ada47f1aeebd20"}
          /> */}
          <br />
          <br />
          <br />
        </div>
        {/* ======= END CONTAINER ============= */}
        <div id="plr" className="pltpart">
        <h1 className="plt">⚽ Joueurs</h1>
        <small>✨ Explorez les articles liés à votre joueur favori.</small>

        </div>
            {/* ======= END CONTAINER <div className="homeSlide">
          <HomeSlider/>
          </div>============= */}
        
      </div>
    </div>
  );
};

export default PageHome;
