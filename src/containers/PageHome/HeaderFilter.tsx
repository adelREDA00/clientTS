// @ts-nocheck
import React, {  useState ,FC } from "react";
import Heading from "components/Heading/Heading";
import Nav from "components/Nav/Nav";
import NavItem from "components/NavItem/NavItem";
import ButtonSecondary from "components/Button/ButtonSecondary";
import { useFetch } from "../../hooks/useFetch";
import { Link } from "react-router-dom";

export interface HeaderFilterProps {
  tabActive: string;
  tabs: string[];
  heading: string;
  onClickTab: (item: string) => void;
}

const HeaderFilter: FC<HeaderFilterProps> = ({
  tabActive,
  onClickTab,
  catname,
  id
}) => {


const handleAll = ()=>{
  console.log("adel");
  
}
  
  return (
    <div className="flex flex-col mb-8 relative">
    
 <Heading>  Articles récents</Heading>
     
      <div className="flex items-center justify-between">
        <Nav
          className="sm:space-x-2"
          containerClassName="relative flex w-full overflow-x-auto text-sm md:text-base"
        >
       <NavItem
        isActive={true}
        onClick={() => onClickTab(catname)}
      >
        {catname}
      </NavItem>
        </Nav>
        <span className="hidden sm:block flex-shrink-0">
        <Link  to={`/page6/${id}/${encodeURIComponent(catname)}`}  >
        <ButtonSecondary onClick={handleAll} className="!leading-none">
            <span>View all</span>
            <i className="ml-3 las la-arrow-right text-xl"></i>
          </ButtonSecondary>
            </Link>
         
        </span>
      </div>
    </div>
  );
};

export default HeaderFilter;
