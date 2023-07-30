// @ts-nocheck
import React, { FC,useContext,useEffect ,useState} from "react";
import PostCardSaveAction from "components/PostCardSaveAction/PostCardSaveAction";
import { PostDataType } from "data/types";
import { Link } from "react-router-dom";
import CategoryBadgeList from "components/CategoryBadgeList/CategoryBadgeList";
import PostCardLikeAndComment from "components/PostCardLikeAndComment/PostCardLikeAndComment";
import musicWave from "images/musicWave.png";
import ButtonPlayMusicRunningContainer from "containers/ButtonPlayMusicRunningContainer/ButtonPlayMusicRunningContainer";
import NcImage from "components/NcImage/NcImage";


export interface Card16PodcastProps {
  className?: string;
  post: PostDataType;
  ratio?: string;
}

const Card16Podcast: FC<Card16PodcastProps> = ({
  className = "h-full",
  post,
  ratio = "aspect-w-3 xl:aspect-w-4 aspect-h-3",
}) => {
  const { title, href, categories, desc, featuredImage, postType } = post;
  const IS_AUDIO = postType === "audio";

  

  const renderListenButtonDefault = (state?: "playing" | "loading") => {
    return (
      <div
        className={`w-14 h-14 flex items-center justify-center rounded-full bg-neutral-50 text-primary-500 cursor-pointer`}
      >
        image here
      </div>
    );
  };

  return (
    <div
      className={`nc-Card16Podcast relative flex flex-col ${className}`}
      data-nc-id="Card16Podcast"
    >
      <Link
        to={href}
        className={`block flex-shrink-0 relative w-full rounded-3xl overflow-hidden ${ratio}`}
      >
        <NcImage src={featuredImage} />
        <span className="bg-neutral-900 bg-opacity-30"></span>
      </Link>

      {/* ABSOLUTE */}
      <Link to={href} className="absolute inset-0"></Link>
      <span className="absolute top-3 inset-x-3">
        <CategoryBadgeList categories={categories} />
      </span>

      {/* MAIN CONTENT */}
      <div className="w-11/12 transform -mt-32 ">
       <br />
        <div className="p-5 mt-5 bg-white dark:bg-neutral-900 shadow-xl dark:shadow-2xl rounded-3xl rounded-tl-none flex flex-col flex-grow ">
          <h2 className="nc-card-title block text-xl font-semibold text-neutral-900 dark:text-neutral-100 ">
            <Link to={href} className="line-clamp-1" title={title}>
              {title}
            </Link>
          </h2>
          <span className="block text-sm text-neutral-500 dark:text-neutral-400 mt-3 mb-5">
            <span className="line-clamp-2">{desc}</span>
          </span>
          <div className="flex items-end justify-between mt-auto">
            <PostCardLikeAndComment className="relative" postData={post} />
            <PostCardSaveAction className="relative" postData={post} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card16Podcast;
