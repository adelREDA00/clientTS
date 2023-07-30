// @ts-nocheck
import { PostDataType } from "data/types";
import React, { FC } from "react";
import Badge from "components/Badge/Badge";

export interface CategoryBadgeListProps {
  className?: string;
  itemClass?: string;
}

const CategoryBadgeList: FC<CategoryBadgeListProps> = ({
  postdataCategory,
  className = "flex flex-wrap space-x-2",
  itemClass,
  
}) => {

   // Check if `postdata` is defined and has the `categories` property
   if (!postdataCategory ) {
    return <div>Loading...</div>; // or any loading indicator
  }

  // Access the `categories` property
 


  return (
    <div
      className={`nc-CategoryBadgeList ${className}`}
      data-nc-id="CategoryBadgeList"
    >
      {postdataCategory.map((item, index) => (
        <Badge
          className={itemClass}
          key={index}
          name={item.name}
          href={item.name}
          color={"pink"}
        />
      ))}
    </div>
  );
};

export default CategoryBadgeList;
