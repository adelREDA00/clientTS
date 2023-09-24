// @ts-nocheck
import Card3Small from "components/Card3Small/Card3Small";
import WidgetHeading1 from "components/WidgetHeading1/WidgetHeading1";
import { PostDataType } from "data/types";
import React, {useState, FC,useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import axios from 'axios';



export interface WidgetPostsProps {
  className?: string;
  posts: PostDataType[];
}

const WidgetPosts: FC<WidgetPostsProps> = ({
  className = "bg-neutral-100 dark:bg-neutral-800",
  posts,
  postid
}) => {

 
  const { club, league, country, categories } = postid;


  const [relatedPosts, setRelatedPosts] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      let url = "https://apiblognode.onrender.com/api/posts";
      let queryParams = [];

      if (league) {
        queryParams.push(`league=${league._id}`);
      } else if (club) {
        queryParams.push(`club=${club._id}`);
      } else if (country) {
        queryParams.push(`country=${country._id}`);
      } else if (categories && categories.length > 0) {
        const categoryIds = categories.map((category) => category._id);
        queryParams.push(`cat=${categoryIds.join(",")}`);
      }

      if (queryParams.length > 0) {
        url += `?${queryParams.join("&")}`;
      }

      try {
        const res = await axios.get(url);
        setRelatedPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [postid]);


  
  return (
    <div
      className={`nc-WidgetPosts rounded-3xl overflow-hidden ${className}`}
      data-nc-id="WidgetPosts"
    >
      <WidgetHeading1
        title="🎯 À LIRE ÉGALEMENT"
        viewAll={{ label: "View all", href: "/#" }}
      />
      <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
        {relatedPosts.map((post) => (
          <Card3Small
            className="p-4 xl:px-5 xl:py-6 hover:bg-neutral-200 dark:hover:bg-neutral-700"
            key={post._id}
            post={post}
        

          />
        ))}
      </div>
    </div>
  );
};

export default WidgetPosts;
