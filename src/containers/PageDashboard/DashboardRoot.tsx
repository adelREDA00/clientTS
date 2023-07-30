// @ts-nocheck
import React ,{useContext} from "react";
import NcLink from "components/NcLink/NcLink";
import { AuthContext } from "../../context/auth";
import { Link } from "react-router-dom";


const DashboardRoot = () => {

  const {user } = useContext(AuthContext);

  return (
    <div className="rounded-xl min-h-full text-sm border border-neutral-100 dark:border-neutral-800 p-6 md:text-base">
      <span className="block text-lg mb-3">
        👋 Hello <strong> {user.username} </strong> {` `}
        
      </span>
      Découvrez et personnalisez vos favoris ! Suivez vos  préférés !
      {` `}
      <NcLink to="/author/:slug">clubs</NcLink>, <NcLink to="/author/:slug">league</NcLink>,<NcLink to="/author/:slug">pays</NcLink>, et <NcLink to="/author/:slug">joueurs</NcLink>  
      {` `} préférés !
    </div>
  );
};

export default DashboardRoot;
