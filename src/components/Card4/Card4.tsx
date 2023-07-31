// @ts-nocheck
import React, { FC } from "react";
import NcImage from "components/NcImage/NcImage";
import PostCardSaveAction from "components/PostCardSaveAction/PostCardSaveAction";
import { PostDataType } from "data/types";
import { Link } from "react-router-dom";
import CardAuthor2 from "components/CardAuthor2/CardAuthor2";
import CategoryBadgeList from "components/CategoryBadgeList/CategoryBadgeList";

export interface Card4Props {
  className?: string;
  post: PostDataType;
  
}

const Card4: FC<Card4Props> = ({ className = "h-full", post,index }) => {
  const { title, href, photo, categories,_id, user, createdAt } =
    post;



    const PF = "https://blogapi-vbdw.onrender.com/images/";

    


  
    

  return (
    <div
      className={`nc-Card4 relative flex flex-col group [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] ${className}`}
      data-nc-id="Card4"
    >
      <span className="block flex-shrink-0 relative w-full aspect-w-16 aspect-h-9 rounded-t-xl overflow-hidden">
        <NcImage containerClassName="absolute inset-0"    src={PF +photo} />
      </span>

      <Link to={`/single-4-sidebar/${_id}/${encodeURIComponent(title)}`} className="absolute inset-0"></Link>

      <div className="p-4 flex flex-col flex-grow">
        <div className="space-y-2.5 mb-4">
          <CategoryBadgeList postdataCategory={categories} />
          <h2 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100 ">
            <Link to={`/single-4-sidebar/${_id}/${encodeURIComponent(title)}`} className="line-clamp-2" title={title}>
              {title}
            </Link>
          </h2>
        </div>
        <div className="flex items-end justify-between mt-auto">
          <CardAuthor2 readingTime={createdAt} date={createdAt.substring(0, 10)} username={user.username} />
          <PostCardSaveAction postData={post}  postId={ _id} />
        </div>
      </div>
    </div>
  );
};

export default Card4;
