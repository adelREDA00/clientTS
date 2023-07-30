// @ts-nocheck
import React, { FC,useEffect, useContext,useState } from "react";
import { DEMO_POSTS } from "data/posts";
import { PostAuthorType, PostDataType } from "data/types";
import Pagination from "components/Pagination/Pagination";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { DEMO_AUTHORS } from "data/authors";
import Nav from "components/Nav/Nav";
import NavItem from "components/NavItem/NavItem";
import Avatar from "components/Avatar/Avatar";
import SocialsList from "components/SocialsList/SocialsList";
import ArchiveFilterListBox from "components/ArchiveFilterListBox/ArchiveFilterListBox";
import { Helmet } from "react-helmet";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import Card11 from "components/Card11/Card11";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionGridCategoryBox from "components/SectionGridCategoryBox/SectionGridCategoryBox";
import { DEMO_CATEGORIES } from "data/taxonomies";
import ButtonSecondary from "components/Button/ButtonSecondary";
import SectionSliderNewAuthors from "components/SectionSliderNewAthors/SectionSliderNewAuthors";
import NcImage from "components/NcImage/NcImage";
import axios from 'axios';
import { AuthContext } from "../../context/auth";
import FullScreenDialog from "components/FullModal";

export interface PageAuthorProps {
  className?: string;
}
const posts: PostDataType[] = DEMO_POSTS.filter((_, i) => i < 12);
const AUTHOR: PostAuthorType = DEMO_AUTHORS[0];
const FILTERS = [
  { name: "Most Recent" },
  { name: "Curated by Admin" },
  { name: "Most Appreciated" },
  { name: "Most Discussed" },
  { name: "Most Viewed" },
];
const TABS = ["Sauvegardé", "Mes favoris"];

const PageAuthor: FC<PageAuthorProps> = ({ className = "" }) => {
  const [tabActive, setTabActive] = useState(1);

  const handleClickTab = (index) => {
    if (index === tabActive) {
      return;
    }
    setTabActive(index);
  };

//modal
  const [isFullModalOpen, setIsFullModalOpen] = useState(false);


  
  const { user ,token} = useContext(AuthContext);
  const [data,setData] = useState({})

  const [update,setUpdate] = useState(false)




  //handel favs
  const [favoriteClub, setFavoriteClub] = useState(null);
  const [favoriteLeague, setFavoriteLeague] = useState(null);
  const [favoriteCountry, setFavoriteCountry] = useState(null);
  const [clubsData, setClubs] = useState([]);
  const [leaguesData, setLeague] = useState([]);
  const [countryData, setCountry] = useState([]);

  const [addprams, setAddprams] = useState([]);
  const [addpraName, setAddpraName] = useState();
  const [addpostName, setAddpostName] = useState("");




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
        setData(res.data)
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };
  
    fetchData();
  }, [update]);


  
const {countries , clubs , leagues} = data

  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

  useEffect(() => {
    fetchBookmarkedPosts();
  }, []);

  const fetchBookmarkedPosts = async () => {

    try {
      const userId = user._id
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`/api/users/${userId}/posts`,config);
      const fetchedPosts = response.data;
      setBookmarkedPosts(fetchedPosts);
    } catch (error) {
      console.log("Error fetching bookmarked posts:", error);
    }
  };

  const handleAddItems = (type) => {
    setIsFullModalOpen(true);
    
    // Based on the button type, you can pass relevant parameters to the FullScreenDialog component
    if (type === "league") {
      // Logic for league button clicked
      setAddprams(leaguesData)
      setAddpraName(leagues)
      setAddpostName("leagueIds")
    } else if (type === "country") {
      // Logic for country button clicked
      setAddprams(countryData)
      setAddpraName(countries)
      setAddpostName("countryIds")

    } else if (type === "club") {
      // Logic for club button clicked
      setAddprams(clubsData)
      setAddpraName(clubs)
      setAddpostName("clubIds")

    }
  };
  

  const handleAddObj = ()=>{

    
  }

  const handleCloseFullModal = () => {
    setIsFullModalOpen(false)
  };

  
  const handleSubmitClub = async (favoriteId) => {
   
    
    try {
      const key = token;
      const config = {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      };
  
      for (const id of favoriteId) {
        const postData = {
          [addpostName]: id._id,
        };
  
        await axios.put(`/api/users/${user._id}`, postData, config);
        console.log('User updated successfully!');
     
      
        
        setIsFullModalOpen(false)
      }
      setUpdate(!update)
    } catch (error) {
      console.error(error);
    }
  };
  
  


  
  
 
  

  return (
    <div className={`nc-PageAuthor  ${className}`} data-nc-id="PageAuthor">
      <Helmet>
        <title>Author || Blog </title>
      </Helmet>

      {/* HEADER */}
      <div className="w-screen px-2 xl:max-w-screen-2xl mx-auto">
        <div className="rounded-3xl md:rounded-[40px] relative aspect-w-16 aspect-h-12 sm:aspect-h-7 xl:sm:aspect-h-6 overflow-hidden ">
          <NcImage
            containerClassName="absolute inset-0"
            src={"/assets/images/covers/cover_1.jpg"}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="relative container -mt-20 lg:-mt-48">
          <div className=" bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 p-5 lg:p-16 rounded-[40px] shadow-2xl flex flex-col sm:flex-row sm:items-center">
            <Avatar
              containerClassName="ring-4 ring-white dark:ring-0 shadow-2xl"
              imgUrl={"/assets/def1.jpg"}
              sizeClass="w-20 h-20 text-xl lg:text-2xl lg:w-36 lg:h-36"
              radius="rounded-full"
            />
            <div className="mt-5 sm:mt-0 sm:ml-8 space-y-4 max-w-lg">
              <h2 className="inline-block text-2xl sm:text-3xl md:text-4xl font-semibold">
                {user.username}
              </h2>
              <span className="block text-sm text-neutral-6000 dark:text-neutral-300 md:text-base">
                {user.email}
              </span>
              <SocialsList />
            </div>
          </div>
        </div>
      </div>
      {/* ====================== END HEADER ====================== */}

      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
        <main>
          {/* TABS FILTER */}
          <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row">
            <Nav className="sm:space-x-2">
              {TABS.map((item, index) => (
                <NavItem
                  key={index}
                  isActive={tabActive === index}
                  onClick={() => handleClickTab(index)}
                >
                  {item}
                </NavItem>
              ))}
            </Nav>
            <div className="block my-4 border-b w-full border-neutral-100 sm:hidden"></div>
            <div className="flex justify-end">
              <ArchiveFilterListBox lists={FILTERS} />
            </div>
          </div>

          {tabActive === 0 && (

<>
<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8 lg:mt-10">
{bookmarkedPosts.map((post) => (
 <Card11 key={post._id} post={post} />
))}
</div>


<div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
<Pagination />
<ButtonPrimary>plus</ButtonPrimary>
</div>
</>
)}

{tabActive === 1 && (
<>
{isFullModalOpen && data && (

<FullScreenDialog open={true} data1={addpraName} handleAddCategory={handleAddObj} handleSubmitClub={handleSubmitClub} ApiData={addprams} handleCloseFullModal={handleCloseFullModal} />
)
} 
<br />
<br />
{data && data.countries && (
  <div className="relative py-16">
<BackgroundSection  className ={"bg-neutral-100 dark:bg-black dark:bg-opacity-20"}/>
<SectionGridCategoryBox
  data={data.countries} favtitle= {"Pays préférés"}
/>
<div className="text-center mx-auto mt-10 md:mt-16">
<ButtonSecondary onClick={() => handleAddItems("country")}>+ ajouter</ButtonSecondary>
</div>
</div>
)

}


<br />


{data && data.leagues && (
  <div className="relative py-16">
<BackgroundSection  className ={"bg-neutral-100 dark:bg-black dark:bg-opacity-20"} />
<SectionGridCategoryBox
  data={data.leagues} favtitle= {"Ligue préférée"} type={0}
/>
<div className="text-center mx-auto mt-10 md:mt-16">
<ButtonSecondary onClick={() => handleAddItems("league")}>+ ajouter</ButtonSecondary>
</div>
</div>
)

}



<br />


{data && data.clubs && (
  <div className="relative py-16">
<BackgroundSection   className ={"bg-neutral-100 dark:bg-black dark:bg-opacity-20"}/>
<SectionGridCategoryBox
  data={data.clubs} favtitle= {"Clubs préférés"} type={1}
/>
<div className="text-center mx-auto mt-10 md:mt-16">
<ButtonSecondary onClick={() => handleAddItems("club")}>+ ajouter</ButtonSecondary>
</div>
</div>
)

}



</>
)}

        </main>   
           {/* SUBCRIBES */}
        
      </div>
    </div>
  );
};

export default PageAuthor;
