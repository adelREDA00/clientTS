// @ts-nocheck
import React, { FC,useEffect,useState } from "react";
import NcImage from "components/NcImage/NcImage";
import PostCardSaveAction from "components/PostCardSaveAction/PostCardSaveAction";
import { PostDataType } from "data/types";
import { Link } from "react-router-dom";
import PostCardLikeAndComment from "components/PostCardLikeAndComment/PostCardLikeAndComment";
import CategoryBadgeList from "components/CategoryBadgeList/CategoryBadgeList";
import PostTypeFeaturedIcon from "components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";
import PostFeaturedMedia from "components/PostFeaturedMedia/PostFeaturedMedia";

export interface Card9Props {
  className?: string;
  ratio?: string;
  hoverClass?: string;
}

const Card9: FC<Card9Props> = ({
  className = "h-full",
  ratio = "aspect-w-3 aspect-h-3 sm:aspect-h-4",
  post,
  hoverClass = "",
  index
}) => {
  const { title, categories, likes,user,_id,desc,createdAt,comments, postType,photo } =
    post;

    const PF = "https://blogapi-vbdw.onrender.com/images/";


    
    const [username, setUsername] = useState("");
    const [time, setTime] = useState("");

    
    const [cat, setCat] = useState([]);

    useEffect(() => {
      if (user && user.username) {
        setUsername(user.username);
      }
    }, [user]);

    useEffect(() => {
      if (createdAt ) {
        setTime(createdAt.split('T')[0]);
      }
    }, [createdAt]);

    useEffect(() => {
      if (categories ) {
        setCat(categories);
      }
    }, [categories]);

    
 
    

  const renderMeta = () => {
    return (
      <div className="inline-flex items-center text-xs text-neutral-300">
        <div className="block ">
          <h2 className="block text-lg font-semibold text-white ">
            <span className="line-clamp-2" title={title}>
              {title}
            </span>
          </h2>
          <Link to={`/single-4-sidebar/${_id}/${encodeURIComponent(title)}`} className="flex mt-2.5 relative">
            <span className="block text-neutral-200 hover:text-white font-medium truncate">
            </span>
            <span className="text-neutral-300 text-sm line-clamp-1">{desc}</span>
            {/* 
            <span className="font-normal truncate">{time}</span>*/}
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-Card9 relative flex flex-col group rounded-3xl overflow-hidden ${hoverClass} ${className}`}
      data-nc-id="Card9"
    >
      <div className="absolute inset-x-0 top-0 p-3 flex items-center justify-between transition-all opacity-0 z-[-1] group-hover:opacity-100 group-hover:z-10 duration-300">


       {post && likes && (
          <PostCardLikeAndComment className="relative" 
          link={`/single-4-sidebar/${_id}/${encodeURIComponent(title)}`}
          postId={_id}
          count={likes.length}
          likesIds={likes}
          comments={comments.length}
           />

            )}

        <PostCardSaveAction className="relative" postData={{}}  postId={ _id} />
      </div>
      <div className={`flex items-start relative w-full ${ratio}`}></div>
      {postType === "audio" ? (
        <div className="absolute inset-0">
          <PostFeaturedMedia post={post} />
        </div>
      ) : (
        <Link  to={`/single-4-sidebar/${_id}/${encodeURIComponent(title)}`} >
          <NcImage
            containerClassName="absolute inset-0 rounded-3xl"
            className="object-cover w-full h-full rounded-3xl"
            src={PF +photo} 
          />
       
          <PostTypeFeaturedIcon
            className="absolute top-3 left-3 group-hover:hidden"
            postType={postType}
            wrapSize="w-7 h-7"
            iconSize="w-4 h-4"
          />
          <span className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
        </Link>
      )}
      <Link
       to={`/single-4-sidebar/${_id}/${encodeURIComponent(title)}`} 
        className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black opacity-50"
      ></Link>
      <div className="absolute bottom-0 inset-x-0 p-4 flex flex-col flex-grow">
        <Link  to={`/single-4-sidebar/${_id}/${encodeURIComponent(title)}`}  className="absolute inset-0"></Link>
        <div className="mb-3">
          <CategoryBadgeList postdataCategory={cat} />
        </div>
        {renderMeta()}
      </div>
    </div>
  );
};

export default Card9;
