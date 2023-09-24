// @ts-nocheck
import React, { FC } from "react";
import NcImage from "components/NcImage/NcImage";
import { TaxonomyType } from "data/types";
import { NavLink } from "react-router-dom";

export interface CardCategory1Props {
  className?: string;
  taxonomy: TaxonomyType;
  size?: "large" | "normal";
}

const CardCategory1: FC<CardCategory1Props> = ({
  className = "",
  size = "normal",
  taxonomy,
  type
 
}) => {
  const {  name, _id,id ,image_path
  } = taxonomy;
  const PF = "https://api-blog-ten.vercel.app/images/";

  let imgSrc;
    if(id===0){
      imgSrc = PF + image_path
    }else{
      imgSrc = image_path
    }
  
  return (
  
    <NavLink
      to={`/home-demo-6/${type}/${_id}/${encodeURIComponent(name)}`}
      className={`nc-CardCategory1 flex items-center ${className}`}
      data-nc-id="CardCategory1"
    >
        {image_path && (
         <NcImage
         containerClassName={`flex-shrink-0 ${
           size === "large" ? "w-20 h-20" : "w-12 h-12"
         } rounded-lg mr-4 overflow-hidden`}
         src={imgSrc}
       />
      )
  
      }

{name && (
          <div>
          <h2
            className={`${
              size === "large" ? "text-lg" : "text-base"
            } nc-card-title text-neutral-900 dark:text-neutral-100 font-semibold`}
          >
            {name}
          </h2>
          <span
            className={`${
              size === "large" ? "text-sm" : "text-xs"
            } block mt-[2px] text-neutral-500 dark:text-neutral-400`}
          >
         
          </span>
        </div>
      )
  
      }
   
   
  
    </NavLink>
  );
};

export default CardCategory1;
