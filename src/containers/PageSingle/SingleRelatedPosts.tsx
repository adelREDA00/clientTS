// @ts-nocheck
import React, { FC ,useEffect,useState} from "react";
import Heading from "components/Heading/Heading";
import { PostDataType } from "data/types";
import Card11 from "components/Card11/Card11";
import Card9 from "components/Card9/Card9";
import { DEMO_POSTS } from "data/posts";
import axios from 'axios';

export interface SingleRelatedPostsProps {
  relatedPosts?: PostDataType[];
  moreFromAuthorPosts?: PostDataType[];
}

// DEMO DATA
const demoRelated: PostDataType[] = DEMO_POSTS.filter(
  (_, i) => i >= 10 && i < 14
);
const demoMoreFromAuthor: PostDataType[] = DEMO_POSTS.filter(
  (_, i) => i >= 14 && i < 18
);

const SingleRelatedPosts: FC<SingleRelatedPostsProps> = ({
  relatedPosts = demoRelated,
  moreFromAuthorPosts = demoMoreFromAuthor,
  postid
}) => {
  const {categories} = postid

//fix if the post don have any categories

  const [relatedPosts1, setRelatedPosts1] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      let url = "https://apiblognode.onrender.com/api/posts";
      let queryParams = [];

      if (categories && categories.length > 0) {
        const categoryIds = categories.map((category) => category._id);
        queryParams.push(`cat=${categoryIds.join(",")}`);
      }

      if (queryParams.length > 0) {
        url += `?${queryParams.join("&")}`;
      }

      try {
        const res = await axios.get(url);
        const postsData = Array.isArray(res.data) ? res.data : [];

        setRelatedPosts1(postsData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [postid]);  
  return (
    <div className="relative bg-neutral-100 dark:bg-neutral-800 py-16 lg:py-28 mt-16 lg:mt-28">
      {/* RELATED  */}
      <div className="container">
        <div>
          <Heading
            className="mb-10 text-neutral-900 dark:text-neutral-50"
            desc=""
          >
            Articles recommandés
          </Heading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {relatedPosts1.map((post) => (
              <Card11  key={post._id} post={post} />
            ))}
          </div>
        </div>

        {/* MORE FROM AUTHOR
        <div className="mt-20">
          <Heading
            className="mb-10 text-neutral-900 dark:text-neutral-50"
            desc=""
          >
            More from author
          </Heading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {moreFromAuthorPosts.map((post) => (
              <Card9 key={post.id} post={post} />
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default SingleRelatedPosts;
