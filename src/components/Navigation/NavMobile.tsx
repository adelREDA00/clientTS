// @ts-nocheck
import React, { FC, Fragment, useEffect, useState } from "react";
import axios from 'axios';
import ButtonClose from "components/ButtonClose/ButtonClose";
import Logo from "components/Logo/Logo";
import { Disclosure } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { NavItemType } from "./NavigationItem";
import DarkModeContainer from "containers/DarkModeContainer/DarkModeContainer";
import { NAVIGATION_DEMO } from "data/navigation";
import ButtonPrimary from "components/Button/ButtonPrimary";
import SocialsList from "components/SocialsList/SocialsList";
import { ChevronDownIcon } from "@heroicons/react/solid";

export interface NavMobileProps {
  data?: NavItemType[];
  onClickClose?: () => void;
}

const NavMobile: React.FC<NavMobileProps> = ({
  data = NAVIGATION_DEMO,
  onClickClose,
}) => {

  const PF = "https://api-blog-ten.vercel.app/images/";


  const [leaguedata, setLeagueData] = useState([]);
  const [clubdata, setClubData] = useState([]);
  //fetching the club
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://api-blog-ten.vercel.app/api/club");
        const leagueData = Array.isArray(res.data) ? res.data : [];
        setClubData(leagueData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);


  //fetching league
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://api-blog-ten.vercel.app/api/league");
        const leagueData = Array.isArray(res.data) ? res.data : [];
        setLeagueData(leagueData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const _renderMenuChild = (item: NavItemType) => {
    return (
      <ul className="nav-mobile-sub-menu pl-6 pb-1 text-base">
        {item.children?.map((i, index) => (
          <Disclosure key={i.href + index} as="li">
            {i.targetBlank ? (
              <a
                href={i.href}
                target="_blank"
                rel="noreferrer"
                className="flex px-4 py-2.5 text-neutral-900 dark:text-neutral-200 text-sm font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-[2px]"
              >
                <span
                  className={!i.children ? "block w-full" : ""}
                  onClick={onClickClose}
                >
                  {i.name}
                  {i.isNew && (
                    <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 leading-none rounded-md ml-2">
                      New!
                    </span>
                  )}
                </span>

                {i.children && (
                  <span
                    className="block flex-grow"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Disclosure.Button
                      as="span"
                      className="flex justify-end flex-grow"
                    >
                      <ChevronDownIcon
                        className="ml-2 h-4 w-4 text-neutral-500"
                        aria-hidden="true"
                      />
                    </Disclosure.Button>
                  </span>
                )}
              </a>
            ) : (
              <NavLink
                exact
                strict
                to={{
                  pathname: i.href || undefined,
                }}
                className="flex px-4 py-2.5 text-neutral-900 dark:text-neutral-200 text-sm font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-[2px]"
                activeClassName="text-secondary"
              >
                <span
                  className={!i.children ? "block w-full" : ""}
                  onClick={onClickClose}
                >
                  {i.name}
                </span>
                {i.children && (
                  <span
                    className="block flex-grow"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Disclosure.Button
                      as="span"
                      className="flex justify-end flex-grow"
                    >
                      <ChevronDownIcon
                        className="ml-2 h-4 w-4 text-neutral-500"
                        aria-hidden="true"
                      />
                    </Disclosure.Button>
                  </span>
                )}
              </NavLink>
            )}
            {i.children && (
              <Disclosure.Panel>{_renderMenuChild(i)}</Disclosure.Panel>
            )}
          </Disclosure>
        ))}
      </ul>
    );
  };

  const _renderItem = (item: NavItemType, index: number) => {
    return (
      <Disclosure
        key={item.id}
        as="li"
        className="text-neutral-900 dark:text-white"
      >
        <NavLink
          exact
          strict
          className="flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
          to={{
            pathname: item.href || undefined,
          }}
          activeClassName="text-secondary"
        >
          <span
            className={!item.children ? "block w-full" : ""}
            onClick={onClickClose}
          >
            {item.name}
          </span>
          {item.children && (
            <span
              className={"block flex-grow"}
              onClick={(e) => e.preventDefault()}
            >
              <Disclosure.Button
                as="span"
                className="flex justify-end flex-grow"
              >
                <ChevronDownIcon
                  className="ml-2 h-4 w-4 text-neutral-500"
                  aria-hidden="true"
                />
              </Disclosure.Button>
            </span>
          )}
        </NavLink>
        {item.children && (
          <Disclosure.Panel>{_renderMenuChild(item)}</Disclosure.Panel>
        )}
      </Disclosure>
    );
  };
  const [isOpenLeague, setIsOpenLeague] = useState(false);

  const toggleDisclosureLeague = (e) => {
    e.preventDefault();
    setIsOpenLeague(!isOpenLeague);
  

  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDisclosure = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
    

  };

  return (
    <div className="overflow-y-auto w-full max-w-sm h-screen py-2 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-neutral-800">
      <div className="py-6 px-5">
        <Logo />
        <div className="flex flex-col mt-5 text-neutral-700 dark:text-neutral-300 text-sm">
          <span>
          Découvrez, Vibrez et Partagez : Plongez au cœur de l'univers du football
          </span>

          <div className="flex justify-between items-center mt-4">
            <SocialsList itemClass="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 text-xl dark:bg-neutral-800 dark:text-neutral-300" />
            <span className="block">
              <DarkModeContainer className="bg-neutral-100 dark:bg-neutral-800" />
            </span>
          </div>
        </div>
        <span className="absolute right-2 top-2 p-1">
          <ButtonClose onClick={onClickClose} />
        </span>
      </div>
      <ul className="flex flex-col py-6 px-2 space-y-1">
      <Disclosure as="li" className="text-neutral-900 dark:text-white">
          <NavLink
            exact
            strict
            className="flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
            to={'/'}
            activeClassName="text-secondary"
       
          >
            <span className="block w-full" >
            ACCUEIL
            </span>
        
          </NavLink>

      
        </Disclosure>

        <Disclosure as="li" className="text-neutral-900 dark:text-white">
          <NavLink
            exact
            strict
            className="flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
            to={''}
            activeClassName="text-secondary"
            onClick={toggleDisclosure}
          >
            <span className="block w-full" >
              Les équipes
            </span>
            <span className="block flex-grow">
              <Disclosure.Button as="span" className="flex justify-end flex-grow" >
                <ChevronDownIcon className="ml-2 h-4 w-4 text-neutral-500" aria-hidden="true" />
              </Disclosure.Button>
            </span>
          </NavLink>

          <ul className={`nav-mobile-sub-menu pl-6 pb-1 text-base ${isOpen ? 'block' : 'hidden'}`}>

            {clubdata?.map((item) => {
              let imgSrc;
              if (item.id === 0) {
                imgSrc = PF + item.image_path
              } else {
                imgSrc = item.image_path
              }
              return (
                <Disclosure key={item._id} as="li">
                
                  <NavLink
                    exact
                    strict
                    to={`/home-demo-6/1/${item._id}/${encodeURIComponent(item.name)}`}
                    className="flex px-4 py-2.5 text-neutral-900 dark:text-neutral-200 text-sm font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-[2px]"
                    activeClassName="text-secondary"
                  >
                    <div className="mobileNav">
                    <img src={imgSrc} alt="" />
                    <span className="block w-full" onClick={onClickClose}>
                      {item.name}
                    </span>
                    </div>
                   
                  </NavLink>
                </Disclosure>
              )
            })}






          </ul>
        </Disclosure>


        <Disclosure as="li" className="text-neutral-900 dark:text-white">
          <NavLink
            exact
            strict
            className="flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
            to={''}
            activeClassName="text-secondary"
            onClick={toggleDisclosureLeague}
          >
            <span className="block w-full" >
              league
            </span>
            <span className="block flex-grow">
              <Disclosure.Button as="span" className="flex justify-end flex-grow" >
                <ChevronDownIcon className="ml-2 h-4 w-4 text-neutral-500" aria-hidden="true" />
              </Disclosure.Button>
            </span>
          </NavLink>

          <ul className={`nav-mobile-sub-menu pl-6 pb-1 text-base ${isOpenLeague ? 'block' : 'hidden'}`}>
          {leaguedata?.map((item) => {
              let imgSrc;
              if (item.id === 0) {
                imgSrc = PF + item.image_path
              } else {
                imgSrc = item.image_path
              }
              return (
                <Disclosure key={item._id} as="li">
                  <NavLink
                    exact
                    strict
                    to={`/home-demo-6/0/${item._id}/${encodeURIComponent(item.name)}`}
                    className="flex px-4 py-2.5 text-neutral-900 dark:text-neutral-200 text-sm font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-[2px]"
                    activeClassName="text-secondary"
                  >
                    <div className="mobileNav">
                    <img src={imgSrc} alt="" />
                    <span className="block w-full" onClick={onClickClose}>
                      {item.name}
                    </span>
                    </div>
                   
                  </NavLink>
                </Disclosure>
              )
            })}

    

   

       

     
          </ul>
        </Disclosure>

        <Disclosure as="li" className="text-neutral-900 dark:text-white">
          <NavLink
            exact
            strict
            className="flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
            to={'/about'}
            activeClassName="text-secondary"
         
          >
            <span className="block w-full" >
            À PROPOS
            </span>
        
          </NavLink>

      
        </Disclosure>
      </ul>
      {/*
      <div className="flex items-center justify-between py-6 px-5 space-x-4">
        <a href="/#" target="_blank" rel="noopener noreferrer">
          <ButtonPrimary>Get Template</ButtonPrimary>
        </a>
      </div>
      */}
    </div>
  );
};

export default NavMobile;
