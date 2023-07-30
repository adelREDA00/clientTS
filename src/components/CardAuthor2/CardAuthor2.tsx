// @ts-nocheck
import React, { FC } from "react";
import { PostDataType } from "data/types";
import { Link } from "react-router-dom";
import Avatar from "components/Avatar/Avatar";

export interface CardAuthor2Props
  extends Pick<PostDataType, "date" | "author"> {
  className?: string;
  readingTime?: PostDataType["readingTime"];
  hoverReadingTime?: boolean;
}

const CardAuthor2: FC<CardAuthor2Props> = ({
  className = "",
  username,
  date,
  hoverReadingTime = 12,
}) => {


  



  return (
    <Link
      to={"/"}
      className={`nc-CardAuthor2 relative inline-flex items-center ${className}`}
      data-nc-id="CardAuthor2"
    >

     
      <Avatar
        sizeClass="h-10 w-10 text-base"
        containerClassName="flex-shrink-0 mr-3"
        radius="rounded-full"
        imgUrl={"/assets/def1.jpg"}
        username={username}
      />
      <div>
        <h2
          className={`text-sm text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium`}
        >
          {username}
        </h2>
        <span
          className={`flex items-center mt-1 text-xs text-neutral-500 dark:text-neutral-400`}
        >
          <span> {date} </span>     
        </span>
      </div>
    </Link>
  );
};

export default CardAuthor2;
