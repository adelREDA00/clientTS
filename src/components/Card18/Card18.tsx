// @ts-nocheck
import React, { FC } from "react";
import NcImage from "components/NcImage/NcImage";
import PostCardSaveAction from "components/PostCardSaveAction/PostCardSaveAction";
import { PostDataType } from "data/types";
import { Link } from "react-router-dom";
import PostCardLikeAndComment from "components/PostCardLikeAndComment/PostCardLikeAndComment";
import CategoryBadgeList from "components/CategoryBadgeList/CategoryBadgeList";
import PostTypeFeaturedIcon from "components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";
import PostFeaturedMedia from "components/PostFeaturedMedia/PostFeaturedMedia";

export interface Card18Props {
  className?: string;
  ratio?: string;
  titleClass?: string;
  post: PostDataType;
  hoverClass?: string;
  showCategories?: boolean;
}

const Card18: FC<Card18Props> = ({
  className = "h-full",
  titleClass = "text-lg ",
  ratio = "aspect-w-4 sm:aspect-w-3 aspect-h-3",
  post,
  hoverClass = "",
  showCategories = true,
}) => {
  const { photo, title, createdAt,categories, desc, user, updatedAt,comments,likes, _id} = post;

  const PF = "https://apiblognode.onrender.com/images/";


  const renderMeta = () => {
    return (
      <div className="inline-flex items-center text-xs text-neutral-300">
        <h2 className={`block font-semibold text-white ${titleClass}`}>
          {title}
        </h2>
      </div>
    );
  };

  return (
    <div
      className={`nc-Card18 relative flex flex-col group rounded-xl overflow-hidden ${hoverClass} ${className}`}
      data-nc-id="Card18"
    >
      <div className="absolute inset-x-0 top-0 p-3 flex items-center justify-between transition-all opacity-0 z-[-1] group-hover:opacity-100 group-hover:z-10 duration-300">
      
         
        {post && likes && (
          <PostCardLikeAndComment className="relative" 
     

          postId={_id}
          count={likes.length}
          likesIds={likes}
          comments={comments.length}
           />

            )}
        <PostCardSaveAction
            postData={post}
            readingTime={3}
            postId={_id} 
        className="relative" 
         />
      </div>
      <div className={`flex items-start relative w-full ${ratio}`}></div>
   
        <Link to={`/single-4-sidebar/${_id}/${encodeURIComponent(title)}`}>
          <NcImage
            containerClassName="absolute inset-0 rounded-xl"
            className="object-cover w-full h-full rounded-xl"
            src={PF +photo}
          />
          <PostTypeFeaturedIcon
            className="absolute top-3 left-3 group-hover:hidden"
            postType={"gallery"}
            wrapSize="w-7 h-7"
            iconSize="w-4 h-4"
          />
          <span className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
        </Link>
    
      <Link
        to={`/single-4-sidebar/${_id}/${encodeURIComponent(title)}`}
        className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black opacity-80"
      ></Link>
      <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col flex-grow">
        <Link to={`/single-4-sidebar/${_id}/${encodeURIComponent(title)}`} className="absolute inset-0"></Link>
      
          <div className="mb-3">
            <CategoryBadgeList postdataCategory={categories} />
          </div>
      
        {renderMeta()}
      </div>
    </div>
  );
};

export default Card18;
