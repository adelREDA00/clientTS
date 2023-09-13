// @ts-nocheck
import React, { useEffect, useState } from "react";
import SectionLatestPosts from "./SectionLatestPosts";
import { Helmet } from "react-helmet";
import { DEMO_POSTS_NEWS } from "data/posts";
import { DEMO_CATEGORIES } from "data/taxonomies";
import SectionAds from "./SectionAds";
import SectionMagazine2 from "./SectionMagazine2";
import SectionMagazine10 from "./SectionMagazine10";
import SectionMagazine9 from "./SectionMagazine9";
import SectionMagazine11 from "./SectionMagazine11";
import SoccerField from "./SoccerPitch";
import { useFetch } from "../../hooks/useFetch";
import { useParams } from 'react-router-dom';
import SingleHeader from "./SingleHeader";
import PrCard from "../../components/PrCard";
import axios from 'axios';
import SoccerPage from "../MatchDetails"
import Slider from "components/Slider";
import SingleGameModal from "components/SingleGameModal"
import { formGroupClasses } from "@mui/material";





//
const MAGAZINE1_TABS = ["all", "Garden", "Fitness", "Design"];
const MAGAZINE1_POSTS = DEMO_POSTS_NEWS.filter((_, i) => i >= 8 && i < 16);
const MAGAZINE2_POSTS = DEMO_POSTS_NEWS.filter((_, i) => i >= 0 && i < 7);
//

const PageHomeDemo6: React.FC = () => {
  const [step, setStep] = useState(0)
  const [trackTitle, setTracktitel] = useState("News")


  useEffect(() => {
    const $body = document.querySelector("body");
    if ($body) {
      $body.className = "theme-demo-6 theme-purple-blueGrey";
    }
    return () => {
      if ($body) {
        $body.className = "";
      }
    };
  }, []);






  //data single post
  const { id, type, name } = useParams();



  let kind;
  if (type === "0") {
    kind = "league";
  } else if (type === "1") {
    kind = "club";
  }
  else if (type === "2") {
    kind = "player";
  }

  const [Typedata, setTypeData] = useState({});
  //fetching the posts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/${kind}/${id}`);
        setTypeData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [kind,id]);

 


  const { data1, loading1, error1, reFetch } = useFetch(`/api/posts/?${kind}=${id}`)


  const [fixtures, setFixtures] = useState([]);


console.log(data1);

  useEffect(() => {
    const fetchData = async () => {

      const API = 'jq2m1ECINqEAsH0B9oaGQQ1nVqkMM4PkqRhR6lCClQi6Hppxd4npdZCk2CXX'

      try {
        const response = await axios.get(`/api/football/standings?api_token=${API}&include=participant`);



        //need to ber a var 
        const filteredFixtures = response.data.data.filter((data) => data.league_id === Typedata.id);
        const sortedFixtures = filteredFixtures.sort((a, b) => a.position - b.position);
        setFixtures(sortedFixtures);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [Typedata]);


  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchData = async () => {

      const API = 'jq2m1ECINqEAsH0B9oaGQQ1nVqkMM4PkqRhR6lCClQi6Hppxd4npdZCk2CXX'

      try {
        const response = await axios.get(`/api/football/livescores/inplay?api_token=${API}&include=lineups`);

        setMatches(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);



  //geting the current sasson id and schdual

  const [currentSeason, setCurrentSeason] = useState();
  const [schdual, setSchdual] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const API = 'jq2m1ECINqEAsH0B9oaGQQ1nVqkMM4PkqRhR6lCClQi6Hppxd4npdZCk2CXX';

      try {
        const seasonResponse = await axios.get(`/api/football/leagues/${Typedata.id}?api_token=${API}&include=currentseason`);
        const seasonId = seasonResponse.data.data.currentseason.id;
        setCurrentSeason(seasonId);

        const response = await axios.get(`/api/football/schedules/seasons/${seasonId}?api_token=${API}`);
        const responseData = response.data.data[0];
        setSchdual(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [Typedata]);

 




  const [SingleMatch, setSingleMatch] = useState();
  const [Score, setScore] = useState();
  const [Fixid, setFixId] = useState(null);
  const [openSingle, setOpenSingle] = useState(false);



  const handleClickCard = (id) => {

    setFixId(id);

    setStep(3)
    setTracktitel("Resultats")
  };

  const handleCloseFullModal = () => {
    setOpenSingle(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      const API = 'jq2m1ECINqEAsH0B9oaGQQ1nVqkMM4PkqRhR6lCClQi6Hppxd4npdZCk2CXX';

      try {
        const response = await axios.get(
          `/api/football/fixtures/${Fixid}?api_token=${API}&include=participants;scores;lineups;&formations`
        );

        setSingleMatch(response.data.data);

        if (response.data.data && response.data.data.scores) {
          const filteredData = response.data.data.scores.filter(
            obj => obj.description === 'CURRENT'
          );

          setScore(filteredData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (Fixid !== null) {
      fetchData(Fixid); // Call fetchData function with the 'id' parameter
    }
  }, [Fixid]);




  




  const handleDisplay = (e) => {
  

    if (e == "News") {
      setStep(0)
      setTracktitel("News")
    }
    else if (e == "Classement") {
      setStep(1)
      setTracktitel("Classement")
    } else if (e == "Resultats") {
      setStep(3)
      setTracktitel("Resultats")
    } else if (e == "Matchs") {
      setStep(2)
      setTracktitel("Matchs")
    }

  }
  const ScoreAxisWidget = () => {
    useEffect(() => {
      const handleMessage = (event) => {
        if (
          event.data.appHeight &&
          event.data.inst === '7b792'
        ) {
          const container = document.querySelector('#scoreaxis-widget-7b792 iframe');
          if (container) {
            container.style.height = `${parseInt(event.data.appHeight)}px`;
          }
        }
      };

      window.addEventListener('message', handleMessage);
      return () => {
        window.removeEventListener('message', handleMessage);
      };
    }, []);

    return (
      <div id="scoreaxis-widget-7b792" style={{ borderWidth: '1px', borderColor: 'rgba(0, 0, 0, 0.15)', borderStyle: 'solid', borderRadius: '8px', padding: '10px', background: 'rgb(255, 255, 255)', width: '100%' }}>
        <iframe id="Iframe" src="https://www.scoreaxis.com/widget/standings-widget/8?autoHeight=1&amp;groupNum=undefined&amp;lang=fr&amp;font=10&amp;removeBorders=0&amp;widgetRows=1%2C1%2C1%2C1%2C1%2C1%2C0%2C0%2C1%2C1&amp;fontSize=-1&amp;inst=7b792" style={{ width: '100%', border: 'none', transition: 'all 300ms ease' }}></iframe>

      </div>
    );
  };

  return (
    <div className="nc-PageHomeDemo6 relative [ nc-section-rounded-md ]">
      <Helmet>
        <title>league & clubs</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600&display=swap"
          rel="stylesheet"
        ></link>
      </Helmet>

      {/* ======== ALL SECTIONS ======== */}

      <div className="relative overflow-hidden">


        <SingleHeader trackTitle={trackTitle} handleDisplay={handleDisplay} type={type} Typedata={Typedata} name={name} />
        <br />



        {/* ======= START CONTAINER ============= */}

        {step === 0 && (
          <div className="container relative">

           {/* === SECTION 9 ===  
           
    
            {/* ===  
            
     <SectionAds imgAds={imgAds} className="pt-16 lg:pt-24" /> === 
     */}

{data1.length >= 5 ? (
  <SectionMagazine10 tabs={[]} data1={data1} heading="" />
) : null}
            {/* === SECTION 4 
            <SectionMagazine2
              className="pt-16 lg:pt-24"
              heading="Articles récents"
              posts={MAGAZINE2_POSTS}
              tabs={MAGAZINE1_TABS}
              data1={data1}
            />=== */}
            {/* === SECTION 11 === */}
            <SectionMagazine11 data1={data1} className="py-16 lg:py-24" />
          </div>
        )}


        {step === 1 && (
          <div className="container relative">
            <div className="tabel">

              <div className="flex flex-col mt-6">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden sm:rounded-lg">
                      <div className="sm:overflow-x-auto">
                        <div className="w-full overflow-x-auto">
                          <table className="w-full text-sm text-gray-400">
                            <thead className="ring-black/5 dark:ring-white/10  bg-white dark:bg-neutral-800 text-xs uppercase font-medium">
                              <tr>
                                <th></th>
                                <th scope="col" className="px-2 sm:px-6 py-3 text-left tracking-wider">
                                  Club
                                </th>
                                <th scope="col" className="px-2 sm:px-6 py-3 text-left tracking-wider">
                                  W
                                </th>
                                <th scope="col" className="px-2 sm:px-6 py-3 text-left tracking-wider">
                                  D
                                </th>
                                <th scope="col" className="px-2 sm:px-6 py-3 text-left tracking-wider">
                                  L
                                </th>
                                <th scope="col" className="px-2 sm:px-6 py-3 text-left tracking-wider">
                                  Pts
                                </th>
                                <th scope="col" className="px-2 sm:px-6 py-3 text-left tracking-wider">
                                  Last 5
                                </th>
                              </tr>
                            </thead>
                            <tbody className="ring-black/5 dark:ring-white/10  bg-white dark:bg-neutral-800">
                              {fixtures.map((data) => {
                                return (
                                  <tr className="ring-black/5 dark:ring-white/10  bg-white dark:bg-neutral-800 trow">
                                    <td className="pl-2 sm:pl-4">{data.position}</td>
                                    <td className="flex px-2 sm:px-6 py-4 whitespace-nowrap">
                                      <img className="w-5" src={data.participant.image_path} alt="" />
                                      <span className="ml-2 font-medium ">{data.participant.name}</span>
                                    </td>
                                    <td className="px-2 sm:px-6 py-4 whitespace-nowrap">11</td>
                                    <td className="px-2 sm:px-6 py-4 whitespace-nowrap">3</td>
                                    <td className="px-2 sm:px-6 py-4 whitespace-nowrap">3</td>
                                    <td className="px-2 sm:px-6 py-4 whitespace-nowrap">34</td>
                                    <td className="flex px-2 sm:px-6 py-4 whitespace-nowrap">
                                      <svg
                                        className="w-4 fill-current text-green-600"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      <svg
                                        className="w-4 fill-current text-green-600"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      <svg
                                        className="w-4 fill-current text-green-600"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      <svg
                                        className="w-4 fill-current text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      <svg
                                        className="w-4 fill-current text-green-600"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>




          </div>
        )}

        {step === 3 && (
          <div>


            <div className="container relative">
              {SingleMatch && Typedata &&(
     <SoccerPage SingleMatch={SingleMatch}  name={Typedata.name} logo={Typedata.image_path} />
              )
              }
         
              <br />
              <br />
              <SoccerField />
            </div>
            {SingleMatch && SingleMatch.participants && (
            <Slider ids={SingleMatch.participants} />
            )}
          </div>
        )}

        {step === 2 && (
          <div className="container relative">
            {schdual && schdual.rounds && schdual.rounds.map((data) => {

const divStyle = {
  backgroundColor: data.finished ? 'red' : '#3ecd5e',
};

              return (
                
                <>
                  <div className="schCnt">


                    <div className="card bg-white dark:bg-neutral-800">
                    <div className="img" style={divStyle}></div>
                      <div className="textBox">
                        <div className="textContent">
                          <p className="h1">{data.starting_at}</p>
                          
                        </div>

                        <div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div key={data.id} className="Match_grid">

                    {data.fixtures.map((fixture) => {
                      return (
                        <PrCard key={fixture.id} name={Typedata.name} logo={Typedata.image_path} data={fixture} onClick={handleClickCard} />
                      )
                    })}

                  </div>
                </>
              );
            })}
          </div>
        )}




        {/* === SECTION 11 === 
        <div className="dark bg-neutral-900 dark:bg-black dark:bg-opacity-20 text-neutral-100">
          <div className="relative container">
            <SectionLatestPosts
              heading="Latest "
              className="py-16 lg:py-24"
              posts={DEMO_POSTS_NEWS.filter((_, i) => i > 7 && i < 18)}
              widgetPosts={DEMO_POSTS_NEWS.filter((_, i) => i > 2 && i < 7)}
              categories={DEMO_CATEGORIES.filter((_, i) => i > 2 && i < 8)}
              tags={DEMO_CATEGORIES}
              postCardName="card4"
              gridClass="sm:grid-cols-2"
            />
          </div>
        </div>*/}
      </div>
    </div>

  );
};

export default PageHomeDemo6;
