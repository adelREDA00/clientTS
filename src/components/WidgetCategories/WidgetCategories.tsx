// @ts-nocheck
import CardCategory1 from "components/CardCategory1/CardCategory1";
import WidgetHeading1 from "components/WidgetHeading1/WidgetHeading1";
import { TaxonomyType } from "data/types";
import React, { FC,useState,useEffect } from "react";

export interface WidgetCategoriesProps {
  className?: string;
}

const WidgetCategories: FC<WidgetCategoriesProps> = ({
  className = "bg-neutral-100 dark:bg-neutral-800",
  postid
}) => {

  const { categories} = postid;

  
  





  return (
    <div
      className={`nc-WidgetCategories rounded-3xl  overflow-hidden ${className}`}
      data-nc-id="WidgetCategories"
    >
      <WidgetHeading1
        title="✨ Trending topic"
        viewAll={{ label: "View all", href: "/#" }}
      />
   <div className="flow-root">
        {categories && categories.length > 0 ? (
          <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
            {categories.map((category) => (
              <CardCategory1
                className="p-4 xl:p-5 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                key={category._id}
                taxonomy={category}
                size="normal"
              />
            ))}
          </div>
        ) : (
          <p>No categories available.</p>
        )}
      </div>
    </div>
  );
};

export default WidgetCategories;
