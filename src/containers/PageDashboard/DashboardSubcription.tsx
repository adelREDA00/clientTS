// @ts-nocheck
import React, { useState ,useContext,useEffect} from "react";
import { AuthContext } from "../../context/auth";

const data = [
  { name: "Subcription Name", content: " Premium" },
  { name: "Package & billing details", content: " $222.00" },
  { name: "Remaining post", content: " 18" },
  { name: "Expire date", content: " October 20, 2021" },
];

const DashboardSubcription = () => {
  const { token, user } = useContext(AuthContext);


  return (
    <div className="bg-white dark:bg-neutral-900 dark:border dark:border-neutral-800 shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-neutral-900 dark:text-neutral-200">
          Account Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-neutral-500 dark:text-neutral-400">
        Vous pouvez modifier ces informations dans la sectio "Modifier le Profile"
        </p>
      </div>
      <div className="border-t border-neutral-200 dark:border-neutral-900">
        <dl>
        <div
             
             className={` bg-white dark:bg-neutral-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}

              >
                <dt className="text-sm font-medium text-neutral-500 dark:text-neutral-300">
                Nom d'utilisateur 
                </dt>
                <dd className="mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 sm:col-span-2">
                  {user.username}
                </dd>

              </div>


              <div
       
                className={`bg-neutral-50 dark:bg-neutral-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
              >
                <dt className="text-sm font-medium text-neutral-500 dark:text-neutral-300">
                  Email
                </dt>
                <dd className="mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 sm:col-span-2">
                  {user.email}
                </dd>
              </div>



              <div
     
                className={` bg-white dark:bg-neutral-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
              >
                <dt className="text-sm font-medium text-neutral-500 dark:text-neutral-300">
                 Créé le
                </dt>
                <dd className="mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 sm:col-span-2">
                  {user.createdAt.replace("T", " ").slice(0, -5)}
                </dd>
              </div>
        </dl>
      </div>
    </div>
  );
};

export default DashboardSubcription;
