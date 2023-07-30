// @ts-nocheck
import React, { FC } from "react";
import NcImage from "components/NcImage/NcImage";
import { PostDataType } from "data/types";
import { Link } from "react-router-dom";
import ButtonPlayMusicRunningContainer from "containers/ButtonPlayMusicRunningContainer/ButtonPlayMusicRunningContainer";

export interface Card17PodcastProps {
  className?: string;

}

const Card17Podcast: FC<Card17PodcastProps> = ({ className = "",data,logo,handleSelect }) => {
  const { name , _id } = data;

  const IS_AUDIO = true

 

  const renderDefaultBtnListen = () => {
    return (
      <span className="w-11 h-11 flex items-center justify-center rounded-full bg-white dark:bg-neutral-800 text-primary-6000 dark:text-primary-200 shadow-lg cursor-pointer">
      {logo}
      </span>
    );
  };

  return (
    <div
      className={`nc-Card17Podcast relative flex items-center justify-between p-2.5 space-x-5 rounded-full bg-neutral-100 dark:bg-neutral-800 dark:bg-opacity-30 hover:shadow-xl transition-shadow `}
      data-nc-id="Card17Podcast"
    >
      <Link onClick={()=>{
        handleSelect(_id)
      }} className="flex  items-center space-x-4">
         {/* <div className="block flex-shrink-0 w-11 h-11 sm:w-16 sm:h-16 relative rounded-full overflow-hidden shadow-lg">
         <NcImage
            containerClassName="absolute inset-0"
            className="object-cover w-full h-full "
            src={featuredImage}
            alt={name}
          />
     
        </div>*/}
        <div className="flex flex-col flex-grow">
          <h2 className={`block font-semibold text-lg`}>
            <span className="line-clamp-1" title={name}>
              {name}
            </span>
          </h2>
      
        </div>
      </Link>

      {IS_AUDIO && (
        <ButtonPlayMusicRunningContainer
          className=""
          renderDefaultBtn={() => renderDefaultBtnListen()}
          renderLoadingBtn={() => renderDefaultBtnListen()}
          renderPlayingBtn={() => renderDefaultBtnListen()}
        ></ButtonPlayMusicRunningContainer>
      )}
    </div>
  );
};

export default Card17Podcast;
