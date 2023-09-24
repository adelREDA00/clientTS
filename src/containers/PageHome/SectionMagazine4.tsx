// @ts-nocheck
import React, { FC,useState, useEffect } from "react";
import Card8 from "components/Card8/Card8";
import { SectionMagazine1Props } from "./SectionMagazine1";
import HeaderFilter from "./HeaderFilter";
import Card9 from "components/Card9/Card9";
import axios from 'axios';


export interface SectionMagazine4Props extends SectionMagazine1Props {}

const SectionMagazine4: FC<SectionMagazine4Props> = ({
  posts,
  tabs,
  className = "",
  heading ,
  data
}) => {
  const [tabActive, setTabActive] = useState<string>(tabs[0]);

  // When handeClicktab please get posts from api,... and pass to new state (newPosts) and pass to
  const handleClickTab = (item: string) => {
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
        const res = await axios.get(`https://apiblognode.onrender.com/api/posts/?cat=${data}`);
        const postsData = Array.isArray(res.data) ? res.data : [];
        setPostData(postsData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);




  return (
    <div className={`nc-SectionMagazine4 ${className}`}>
      <HeaderFilter
        catname={heading}
        tabActive={tabActive}
        tabs={tabs}
        id={data}
        onClickTab={handleClickTab}
      />

      {!postdata.length && <span>Nothing we found!</span>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {postdata[0] && <Card8 className="sm:col-span-2" postsingle={postdata[0]} />}
        {postdata
          .filter((_, i) => i < 3 && i >= 1)
          .map((item, index) => (
            <Card9 key={index} postb={item} post={item} />
          ))}
        {postdata
          .filter((_, i) => i < 5 && i >= 3)
          .map((item, index) => (
            <Card9 key={index} post={item} />
          ))}
        {postdata[5] && <Card8 className="sm:col-span-2" postsingle={postdata[5]} />}
      </div>
    </div>
  );
};

export default SectionMagazine4;
