// @ts-nocheck
import React, { FC, useState } from "react";
import PostCardSaveAction from "components/PostCardSaveAction/PostCardSaveAction";
import { PostDataType } from "data/types";
import { Link } from "react-router-dom";
import CategoryBadgeList from "components/CategoryBadgeList/CategoryBadgeList";
import PostCardLikeAndComment from "components/PostCardLikeAndComment/PostCardLikeAndComment";
import PostCardMeta from "components/PostCardMeta/PostCardMeta";
import PostFeaturedMedia from "components/PostFeaturedMedia/PostFeaturedMedia";

export interface Card11Props {
  className?: string;
  post: PostDataType;
  ratio?: string;
  hiddenAuthor?: boolean;
}

const Card11: FC<Card11Props> = ({
  className = "h-full",
  post,
  hiddenAuthor = false,
  ratio = "aspect-w-4 aspect-h-3",
}) => {
  const { title,_id, href, categories, createdAt,photo,likes, comments} = post;
  const PF = "https://apiblognode.onrender.com/images/";


  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={`nc-Card11 relative flex flex-col group [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] ${className}`}
      data-nc-id="Card11"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      //
    >
      <div
        className={`block flex-shrink-0 relative w-full rounded-t-xl overflow-hidden ${ratio}`}
      >
        <div>
          <PostFeaturedMedia post={post} isHover={isHover} />
        </div>
      </div>
      <Link to={`/single-4-sidebar/${_id}/${encodeURIComponent(title)}`}  className="absolute inset-0"></Link>
      <span className="absolute top-3 inset-x-3 z-10">
        <CategoryBadgeList postdataCategory={categories} />
      </span>

  
      <div className="p-4 flex flex-col flex-grow space-y-3">
     
       
          <PostCardMeta meta={post} />
       
       
    
        <h2 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100 ">
          <Link to={`/single-4-sidebar/${_id}/${encodeURIComponent(title)}`}  className="line-clamp-2" title={title}>
            {title}
          </Link>
        </h2>
        <div className="flex items-end justify-between mt-auto">

      

             
          {post && likes && (
          <PostCardLikeAndComment className="relative" 
     
          link={`/single-4-sidebar/${_id}/${encodeURIComponent(title)}`}
          postId={_id}
          count={likes.length}
          likesIds={likes}
          comments={comments.length}
           />

            )}
            
          <PostCardSaveAction 
          postData={post}
  
             postId={_id} className="relative"  />
        </div>
      </div>
    </div>
  );
};

export default Card11;
