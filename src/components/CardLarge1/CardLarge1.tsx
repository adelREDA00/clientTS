// @ts-nocheck
import { Transition } from "@headlessui/react";
import PostCardSaveAction from "components/PostCardSaveAction/PostCardSaveAction";
import NcImage from "components/NcImage/NcImage";
import NextPrev from "components/NextPrev/NextPrev";
import PostCardLikeAndComment from "components/PostCardLikeAndComment/PostCardLikeAndComment";
import { PostDataType } from "data/types";
import React, { useContext,FC, Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CardAuthor2 from "components/CardAuthor2/CardAuthor2";
import CategoryBadgeList from "components/CategoryBadgeList/CategoryBadgeList";



export interface CardLarge1Props {
  className?: string;
  post: PostDataType;
  onClickNext?: () => void;
  onClickPrev?: () => void;
  isShowing?: boolean;
}

const CardLarge1: FC<CardLarge1Props> = ({
  className = "",
  isShowing = true,
  post,
  onClickNext = () => {},
  onClickPrev = () => {},
  index
}) => {


  const PF = "https://apiblognode.onrender.com/images/";
  
  


  const { photo, title, createdAt,categories,likes, desc, user,comments, updatedAt, _id } =
  post;


  const [likesIds, setLikesIds] = useState<string[]>([]);

  useEffect(() => {
    if (likes) {
      const extractedIds = likes.map((like) => like._id);
      setLikesIds(extractedIds);
    }
  }, [likes]);
  





  return (
    <Transition
      appear={true}
      as="div"
      className={`nc-CardLarge1 relative flex flex-col-reverse md:flex-row justify-end ${className}`}
      show={isShowing}
    >
      <div className="md:absolute z-10 md:left-0 md:top-1/2 md:transform md:-translate-y-1/2 w-full -mt-8 md:mt-0 px-3 sm:px-6 md:px-0 md:w-3/5 lg:w-1/2 xl:w-2/5">
        <Transition.Child
          as={Fragment}
          enter="transform nc-will-change-transform transition-all duration-500"
          enterFrom="translate-y-4 opacity-0"
          enterTo="translate-y-0 opacity-100"
        >
          <div className="p-4 sm:p-8 xl:py-14 md:px-10 bg-white bg-opacity-40 backdrop-filter backdrop-blur-lg shadow-lg rounded-3xl space-y-3 sm:space-y-5 !border-opacity-0 --  nc-dark-box-bg">
              
                     <CategoryBadgeList postdataCategory={categories} />
              
   

            <h2 className="nc-card-title text-xl sm:text-2xl font-semibold ">
              <div  className="line-clamp-2" title={title}>
              <Link to={`/single-4-sidebar/${_id}/${encodeURIComponent(title)}`}>{title}</Link>
     

              </div>
            </h2>

            <CardAuthor2 className="relative" username={user.username}   date={createdAt.substring(0, 10)} />
              
            <div className="flex items-center justify-between mt-auto">
            {post  && (
          <PostCardLikeAndComment 
          postId={_id}
          count={likes.length}
          likesIds={likesIds}
          comments={comments.length}
          link={`/single-4-sidebar/${_id}/${encodeURIComponent(title)}`}
           />

            )}
            
              

              <PostCardSaveAction
                classBgIcon="h-8 w-8 bg-neutral-50 bg-opacity-20 hover:bg-opacity-50 dark:bg-neutral-800 dark:bg-opacity-30 dark:hover:bg-opacity-50"
                postData={post}
                readingTime={3}
                postId={_id}
              />
               
            </div>
          
          </div>
        </Transition.Child>
        <Transition.Child
          as="div"
          className="p-4 sm:pt-8 sm:px-10"
          enter="transform nc-will-change-transform transition-all duration-500 delay-100"
          enterFrom="translate-y-4 opacity-0"
          enterTo="translate-y-0 opacity-100"
        >
          <NextPrev
            btnClassName="w-11 h-11 text-xl"
            onClickNext={onClickNext}
            onClickPrev={onClickPrev}
          />
        </Transition.Child>
      </div>
      <Transition.Child
        as="div"
        className="w-full md:w-4/5 lg:w-2/3"
        enter="transform nc-will-change-transform transition-all duration-500 delay-200"
        enterFrom="translate-y-4 scale-105 opacity-0"
        enterTo="translate-y-0 scale-100 opacity-100"
      >
        <Link to={`/single-4-sidebar/${_id}/${encodeURIComponent(title)}`}>
          <NcImage
            containerClassName="aspect-w-16 aspect-h-12 sm:aspect-h-9 md:aspect-h-14 lg:aspect-h-10 2xl:aspect-h-9 relative"
            className="absolute inset-0 object-cover rounded-3xl"
            src={PF +photo}
            alt={title}
          />
        </Link>
      </Transition.Child>
    </Transition>
  );
};

export default CardLarge1;
