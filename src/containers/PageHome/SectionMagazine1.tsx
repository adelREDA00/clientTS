// @ts-nocheck
import React, { useEffect,FC, useState } from "react";
import Card2 from "components/Card2/Card2";
import { PostDataType } from "data/types";
import Card6 from "components/Card6/Card6";
import HeaderFilter from "./HeaderFilter";
import axios from 'axios';


export interface SectionMagazine1Props {
  tabs: string[];
  posts: PostDataType[];
  heading?: string;
  className?: string;
}

const SectionMagazine1: FC<SectionMagazine1Props> = ({
  posts,
  tabs,
  heading = "POPULAR ARTICLES ⚽",
  className = "",
  data,
  catname,
}) => {
  const [tabActive, setTabActive] = useState<string>(tabs[0]);
  const [catActive, setCatActive] = useState("");


  const handleClickTab = (item: string) => {
    setCatActive(item)
    if (item === tabActive) {
      return;
    }
    setTabActive(item);
  };

  


  

  const [postdata, setPostData] = useState([]);
  //fetching the posts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://api-blog-ten.vercel.app/api/posts/?cat=${data}`);
        const postsData = Array.isArray(res.data) ? res.data : [];
        setPostData(postsData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);


  if (postdata.length === 0) {
    // If postdata is an empty array, return null to not display the component
    return null;
  }

  

  return (
    <div className={`nc-SectionMagazine1 ${className}`}>
      <HeaderFilter
        tabActive={tabActive}
        tabs={tabs}
        heading={`${catname} Articles`}
        catname={catname}
        id={data}
        onClickTab={handleClickTab}
      />
      {!data.length && <span>Nothing we found!</span>}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {postdata[0] && <Card2 size="large" postdataFirst={postdata[0]} />}
        <div className="grid gap-6 md:gap-8">
          {postdata
            .filter((_, i) => i < 4 && i > 0)
            .map((item, index) => (
              <Card6 key={index} index={index} postdataFirst={item} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SectionMagazine1;
